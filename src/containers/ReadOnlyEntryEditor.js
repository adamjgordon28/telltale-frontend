import React from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
// import { Link } from 'react-router-dom';
import Editor from 'draft-js-plugins-editor';
import createHighlightPlugin from '../highlightPlugin';
import createCounterPlugin from 'draft-js-counter-plugin';
import '../App.css'
import { connect } from 'react-redux'
import history from "../history.js"

const highlightPlugin = createHighlightPlugin({
  background: 'lightblue'
});


const counterPlugin = createCounterPlugin();

const { CharCounter, WordCounter, LineCounter} = counterPlugin;









class ReadOnlyEntryEditor extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    editorState: EditorState.createEmpty(),
    fetched: false,
    entry: null
  };
}


onChange =(editorState) => {
  this.setState({
    editorState: editorState
  })
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
    <h1>Please Enjoy "{this.state.entry.title}" by {this.state.entry.user.username}</h1>
    <Editor
    onChange={(editorState) => {this.onChange(editorState)}}
    editorState={this.state.editorState}
    plugins={[highlightPlugin, counterPlugin]}
    readOnly={true}
    />
    <div style={{position: "absolute", right: "10%", fontWeight: "bold"}}>
      <div><CharCounter /> characters</div>
          <div><WordCounter /> words</div>
          <div><LineCounter /> lines</div>

    </div>
    </div>
  )};

}



const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(ReadOnlyEntryEditor)
