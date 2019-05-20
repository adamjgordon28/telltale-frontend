import React from 'react';
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import CodeUtils from 'draft-js-code';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createHighlightPlugin from '../highlightPlugin';
import 'draft-js-emoji-plugin/lib/plugin.css';
import '../App.css'
import { connect } from 'react-redux'
import history from "../history.js"

const emojiPlugin = createEmojiPlugin();

const { EmojiSuggestions } = emojiPlugin;

const highlightPlugin = createHighlightPlugin({
  background: 'orange'
});

const entryId = 1;

class EntryEditor extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    editorState: EditorState.createEmpty(),
    fetched: false
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
   fetch("http://localhost:4000/api/v1/entries/".concat(`${entryId}`), {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "Accepts": "application/json" },
    body: JSON.stringify({ id:`${entryId}`, content: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())) })
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

  onTab = (e) => {
    const { editorState } = this.state;
    if (!CodeUtils.hasSelectionInBlock(editorState)) return 'not-handled';

    this.onChange(CodeUtils.onTab(e, editorState));
    return 'handled';
  }



 componentDidMount = () => {
  fetch("http://localhost:4000/api/v1/entries/".concat(`${entryId}`))
   .then(response => response.json())
   .then(json => {

     if(json) {
    this.setState({

      editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(json.content))),
      fetched: true
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
    if (!this.state.editorState) {
    return (
      <h3 className="loading">Loading...</h3>
    );
  }
    return (


    <div>
      <h1>Continue Writing Your MasterPiece Here!</h1>
      <div className="toolbar">
      <button onClick={() => {this.makeBold()}}>Bold</button>
      <button onClick={() => {this.makeUnderlined()}}>Underline</button>
      <button onClick={() => {this.makeItalic()}}>Italicize</button>
      <button onClick={() => {this.makeHighlighted()}}>Highlight</button>
      <button onClick={() => {this.createContent()}}>Submit</button>
      </div>
    <Editor
    onChange={(editorState) => {this.onChange(editorState)}}
    editorState={this.state.editorState}
    handleKeyCommand={this.handleKeyCommand}
    plugins={[highlightPlugin, emojiPlugin]}
    onTab={this.onTab}
    />
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
