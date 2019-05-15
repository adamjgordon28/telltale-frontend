import React, {Component} from 'react';
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createHighlightPlugin from '../highlightPlugin';
import 'draft-js-emoji-plugin/lib/plugin.css';
import debounce from 'lodash/debounce';
import '../App.css'
import { Provider, connect } from 'react-redux';
import {createStore} from 'redux';
const entryId =6;
const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions } = emojiPlugin;
const highlightPlugin = createHighlightPlugin({
  background: 'orange'
});

const defaultState = {
  editorState: EditorState.createEmpty(),
  fetched: false
};


const editorReducer = (state = defaultState, { payload, type}) => {
    if (type === 'UPDATE_EDITOR_STATE'){
      console.log('redux action:', type, payload.getCurrentContent().getPlainText());
      return {
        ...state,
        editorState: payload,
      };
    }
    else if (type === 'UPDATE_TO_FETCHED'){
      return {
        ...state,
        fetched: true
      }
    }
    return state;
  }

  const store = createStore(editorReducer);

  class AppEditor extends React.Component{

    handleKeyCommand = (command) => {
   const newState = RichUtils.handleKeyCommand(this.state.editorState, command);

   if (newState) {
     this.onChange(newState);
     return 'handled';
   }

   return 'not-handled';
 }


    render(){
    return (
    <Editor
    editorState={this.props.editorState}
    onChange={this.props.onSaveEditorState}
    handleKeyCommand={this.handleKeyCommand}
    plugins={[highlightPlugin, emojiPlugin]}
    />)
    }
  };

const mapStateToProps = ({ editorState }) => ({ editorState });

const mapDispatchToProps = (dispatch) => ({
  onSaveEditorState: (editorState) => {
    dispatch({
      type: 'UPDATE_EDITOR_STATE',
      payload: editorState
    })
  }
})

const ConnectedEditor = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppEditor);






class EntryEditor extends Component {

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

saveContent = () => {
  if (this.state.fetched){
   fetch("http://localhost:4000/api/v1/entries/6", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "Accepts": "application/json" },
    body: JSON.stringify({ id:`${entryId}`, content: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())) })
   })
    .then(response => response.json())
    .then(json => {
     console.log(json)
    })
    }
  }



  onChange =(editorState) => {
    const contentState = editorState.getCurrentContent();
    this.saveContent(contentState)
    this.setState({
      editorState: editorState
    })
  }








 componentDidMount = (entryId) => {
  fetch("http://localhost:4000/api/v1/entries/6")
   .then(response => response.json())
   .then(json => {

     if(json) {
    this.setState({
      editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(json.content))),
      fetched: true
    })
    }
    else {
      store.dispatch({
        type: 'UPDATE_TO_FETCHED'
      })
    }
   })
 }

  render() {
  //   if (!this.props.editorState) {
  //   return (
  //     <h3 className="loading">Loading...</h3>
  //   );
  // }
    return (
    <div>
      <h1>Continue Writing Your MasterPiece Here!</h1>
      <div className="toolbar">
      <button onClick={() => {this.makeBold()}}>Bold</button>
      <button onClick={() => {this.makeUnderlined()}}>Underline</button>
      <button onClick={() => {this.makeItalic()}}>Italicize</button>
      <button onClick={() => {this.makeHighlighted()}}>Highlight</button>
      </div>
      <Provider store={store}>
        <ConnectedEditor/>
      </Provider>
    <EmojiSuggestions/>
    </div>
  )};

}

export default EntryEditor;
