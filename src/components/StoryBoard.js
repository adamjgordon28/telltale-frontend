import React, { Component } from 'react'
import { connect } from 'react-redux'
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

 render() {
   if (!this.props.currentEntry){
     return <h3>Loading...</h3>
   }
   return (
     <div>
     This is the tale of {this.props.currentEntry.title}
     <StoryBoardCharacters entry={this.props.currentEntry}/>

     <StoryBoardSettings entry={this.props.currentEntry} />
      <Link to={`/add-entry-info/${this.props.currentEntry.id}`}><button className="positive ui button">Add a Character or Setting!</button></Link>
      <Link key={Math.random()} to={`/entries/${this.props.currentEntry.id}`}><button className="ui button blue">Keep Writing </button></Link>
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

      dispatch({type: "SET_CURRENT_ENTRY", payload: entry})
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(StoryBoard)
