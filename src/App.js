import React from 'react';
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createHighlightPlugin from './highlightPlugin';
import 'draft-js-emoji-plugin/lib/plugin.css';
import debounce from 'lodash/debounce';

const emojiPlugin = createEmojiPlugin();

const { EmojiSuggestions } = emojiPlugin;

const highlightPlugin = createHighlightPlugin({
  background: 'orange'
});

const entryId = 3;

class App extends React.Component {
  constructor(props) {
  super(props);
  this.state = {};
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
   fetch("http://localhost:4000/api/v1/entries/" + `${entryId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "Accepts": "application/json" },
    body: JSON.stringify({ id:`${entryId}`, content: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())) })
   })
    .then(response => response.json())
    .then(json => {
     console.log(json)
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


 componentDidMount = (number) => {
  fetch("http://localhost:4000/api/v1/entries/" + `${3}`)
   .then(response => response.json())
   .then(json => {

     if(json) {
    this.setState({
      editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(json.content)))
    })
    }
    else {
      this.setState({ editorState: EditorState.createEmpty() })
    }
   })
 }

  render() {
    if (!this.state.editorState) {
    return (
      <h3 className="loading">Loading...</h3>
    );
  }
    return (
    <div>
    <button onClick={() => {this.makeBold()}}>Bold</button>
    <button onClick={() => {this.makeUnderlined()}}>Underline</button>
    <button onClick={() => {this.makeItalic()}}>Italicize</button>
    <button onClick={() => {this.makeHighlighted()}}>Highlight</button>
    <Editor
    onChange={(editorState) => {this.onChange(editorState)}}
    editorState={this.state.editorState}
    handleKeyCommand={this.handleKeyCommand}
    plugins={[highlightPlugin, emojiPlugin]}
    />
    <EmojiSuggestions/>
    </div>
  )};

}

export default App;
