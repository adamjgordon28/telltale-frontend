import React from 'react';
import {Editor, EditorState, RichUtils} from "draft-js";
import './App.css';

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
   method: "post",
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
    <button onClick={() => {this.makeBold();}}>Bold</button>
    <Editor
    onChange={(editorState) => {this.onChange(editorState)}}
    editorState={this.state.editorState}
    handleKeyCommand={this.handleKeyCommand}
    />
    </div>
  )};

}

export default App;
