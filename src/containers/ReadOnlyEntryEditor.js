import React from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
import { Link } from 'react-router-dom';
import Editor from 'draft-js-plugins-editor';
import createHighlightPlugin from '../highlightPlugin';
import createCounterPlugin from 'draft-js-counter-plugin';
import '../App.css'
import { connect } from 'react-redux'
import WithAuth from '../components/WithAuth.js';
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
   .then(entry => {
     if(entry.status === 404){
       alert("This is not a valid entry.")
       return history.push('/about')
     }
     if(entry) {
    this.setState({

      editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(entry.content))),
      fetched: true,
      entry: entry
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
    if (!this.state.editorState || !this.state.entry) {
    return (
      <h3 className="loading">Loading...</h3>
    );
  }
    return (
    <div>
    <h1>Please Enjoy "{this.state.entry.title}" by {this.state.entry.user.username}</h1>
    <div style={{position:"relative", top:"2.5em"}}><Editor
    onChange={(editorState) => {this.onChange(editorState)}}
    editorState={this.state.editorState}
    plugins={[highlightPlugin, counterPlugin]}
    readOnly={true}
    />
      <Link key={Math.random()} to={`/profiles/${this.state.entry.user.id}`}><button className="ui button positive" style={{position:"relative", left:"7.5%"}}>View Author Profile</button></Link>
    </div>
    <div style={{position: "relative", left: "82.5%", bottom:"2.5em", fontWeight: "bold", width:"10%", display: "inline"}}>
      <div style={{display: "inline", position: "relative", right:"12.5%", top:"3em"}}><CharCounter /> characters</div>
          <div style={{display: "inline", position: "relative", right:"10%", top:"3em"}}><WordCounter /> words</div>
          <div style={{display: "inline", position: "relative", right:"7.5%", top:"3em"}}><LineCounter /> lines</div>

      </div>
    </div>
  )};

}



const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default WithAuth(connect(mapStateToProps)(ReadOnlyEntryEditor))
