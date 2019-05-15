import React from 'react';
import { EditorState, RichUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import CreateUserForm from './containers/CreateUserForm.js'
import CreateCharacterForm from './containers/CreateCharacterForm.js'
import CreateSettingForm from './containers/CreateSettingForm.js'
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createHighlightPlugin from './highlightPlugin';
import 'draft-js-emoji-plugin/lib/plugin.css'

const emojiPlugin = createEmojiPlugin();

const { EmojiSuggestions } = emojiPlugin;

const highlightPlugin = createHighlightPlugin({
  background: 'orange'
});

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    }
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
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


  onChange =(editorState) => {
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


 createNote = (noteContent) => {
  fetch("http://localhost:4000/api/v1/entries", {
   method: "POST",
   headers: { "Content-Type": "application/json", "Accepts": "application/json" },
   body: JSON.stringify({ content: JSON.stringify(noteContent) })
  })
   .then(response => response.json())
   .then(json => {
    console.log(json)
   })
}

handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }




  render() {
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
