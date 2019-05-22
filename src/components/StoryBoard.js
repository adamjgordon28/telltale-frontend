import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from "../history.js"
import { Link } from 'react-router-dom'
import StoryBoardCharacters from './StoryBoardCharacters.js'
import StoryBoardSettings from './StoryBoardSettings.js'


class StoryBoard extends Component {

  state = {
    entry: null
  }

  componentDidMount = () => {
   fetch("http://localhost:4000/api/v1/entries/".concat(`${this.props.match.params.id}`))
    .then(response => response.json())
    .then(json => {
      this.props.setCurrentEntry(json)
    })
  }

  deleteEntry = () => {
    fetch("http://localhost:4000/api/v1/entries/".concat(`${this.props.currentEntry.id}`),
  {
    method: 'DELETE'
  })
  this.props.removePostFromUser(this.props.currentEntry.id)
  history.push("/entries")
  }

 render() {
   if (!this.props.currentEntry){
     return <h3>Loading...</h3>
   }
   return (
     <div>
     <h1>Storyboard for "{this.props.currentEntry.title}"</h1>
    <div>
     <StoryBoardSettings entry={this.props.currentEntry} />
     <StoryBoardCharacters entry={this.props.currentEntry}/>
     </div>
     <div className="button-div" style={{position: "relative", left: "30%", top: "2em"}}>
     <Link to={`/add-entry-info/${this.props.currentEntry.id}`}><button className="positive ui button">Add a Character or Setting!</button></Link>
     <Link key={Math.random()} to={`/entries/${this.props.currentEntry.id}`}><button className="ui button blue">Keep Writing </button></Link>
     <button className="ui button red" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteEntry(e) } }>Delete Entry</button>
     </div>
     </div>
   )
 }
}


function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentEntry: state.currentEntry
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentEntry: (entry) => {

      dispatch({type: 'SET_CURRENT_ENTRY', payload: entry})
    },
    removePostFromUser: (entryId) => {
      dispatch({type: 'REMOVE_POST_FROM_USER', payload: entryId})
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(StoryBoard)
