import React from 'react';
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import { Link } from 'react-router-dom';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createHighlightPlugin from '../highlightPlugin';
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import '../App.css'
import { connect } from 'react-redux'
import history from "../history.js"
import 'draft-js/dist/Draft.css';
import 'draft-js-emoji-plugin/lib/plugin.css';
import 'draft-js-side-toolbar-plugin/lib/plugin.css';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons';


const emojiPlugin = createEmojiPlugin()

const { EmojiSuggestions } = emojiPlugin;

const highlightPlugin = createHighlightPlugin({
  background: 'orange'
});

const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;








class EntryEditor extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    editorState: EditorState.createEmpty(),
    fetched: false,
    entry: null
  };
}

  makeBold(){
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'BOLD'
    ))
  }

  makeItalic(){
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'ITALIC'
    ))
  }

  makeUnderlined(){
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'UNDERLINE'
    ))
  }

  makeHighlighted(){
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'HIGHLIGHT'
    ))
  }

saveContent = (noteContent) => {
  if (this.state.fetched){
   fetch("http://localhost:4000/api/v1/entries/".concat(`${this.props.match.params.id}`), {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "Accepts": "application/json" },
    body: JSON.stringify({ id:`${this.props.match.params.id}`, content: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())) })
   })
    .then(response => response.json())
    .then(json => {

    })
    }
  }

  createContent = (noteContent) => {
     fetch("http://localhost:4000/api/v1/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accepts": "application/json" },
      body: JSON.stringify({content: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())) })
     })
      .then(response => response.json())
      .then(json => {

      })
    }


  onChange =(editorState) => {
    const contentState = editorState.getCurrentContent();
    this.saveContent(contentState)
    this.setState({
      editorState: editorState
    })
  }

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);

    if (newState) {
      this.onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  }




handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  onKeyPressed = (event) => {
  		if (event.key === 'Tab') {
  			const newEditorState = RichUtils.onTab(
  				event,
  				this.state.editorState,
  				40 /* maxDepth */
  			);
  			if (newEditorState !== this.state.editorState) {
  				this.onChange(newEditorState);
  			}
  			event.preventDefault();
  		}
  	}


 componentDidMount = () => {
  fetch("http://localhost:4000/api/v1/entries/".concat(`${this.props.match.params.id}`))
   .then(response => response.json())
   .then(json => {


     if(json) {
    this.setState({

      editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(json.content))),
      fetched: true,
      entry: json
    })
    }
    else {
      this.setState({
        fetched: true
      })
    }
   })
 }

  render() {

    if(this.props.currentUser === -1){
      history.push("/login")
    }
    if (!this.state.editorState || !this.state.entry) {
    return (
      <h3 className="loading">Loading...</h3>
    );
  }
    return (

    <div>
      <h1>Welcome back, "{this.state.entry.title}" has been waiting for you!</h1>
      <div style={{position:"relative", top:"2em"}}>
      <div className="toolbar">
      <Toolbar>
              {
                // may be use React.Fragment instead of div to improve perfomance after React 16
                (externalProps) => (
                  <div>
                    <BoldButton {...externalProps} />
                    <ItalicButton {...externalProps} />
                    <UnderlineButton {...externalProps} />
                    <CodeButton {...externalProps} />
                    <Separator {...externalProps} />
                    <UnorderedListButton {...externalProps} />
                    <OrderedListButton {...externalProps} />
                    <BlockquoteButton {...externalProps} />
                    <CodeBlockButton {...externalProps} />
                  </div>
                )
              }
            </Toolbar>

      </div>
    <div onKeyDown={this.onKeyPressed}>
    <Editor
    onChange={(editorState) => {this.onChange(editorState)}}
    editorState={this.state.editorState}
    handleKeyCommand={this.handleKeyCommand}
    plugins={[highlightPlugin, emojiPlugin, sideToolbarPlugin, toolbarPlugin]}
    onTab={this.onTab}
    placeholder="Write your story here..."

    />
    </div>

    <Link key={Math.random()} to={`/storyboards/${this.state.entry.id}`}><button style = {{position: "relative", left: "10.25em", top: "3.5em"}} className="ui blue button">View Storyboard</button></Link>
    </div>
    <EmojiSuggestions/>

    </div>
  )};

}



const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(EntryEditor)
