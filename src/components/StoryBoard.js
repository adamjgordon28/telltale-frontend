import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from "../history.js"
import { Link } from 'react-router-dom'
import StoryBoardCharacterList from './StoryBoardCharacterList.js'
import StoryBoardSettingList from './StoryBoardSettingList.js'
import StoryBoardCharacterSettingList from '../containers/StoryBoardCharacterSettingList.js'


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

   if (!this.props.currentEntry || !this.props.currentUser){
     return <h3>Loading...</h3>
   }
   if(this.props.currentEntry.status===404){
     console.log(this.props.currentEntry)
     alert("This is not a valid entry.")
     this.props.setCurrentEntry(null)
     history.push('/about')
   }
    if (this.props.currentUser && this.props.currentEntry.user){
     if(this.props.currentUser.id !== this.props.currentEntry.user.id){
       alert("You do not have access to this page!")
       this.props.setCurrentEntry(null)
       history.push(`/about`)
     }
   }
   return (
     <div style={{flex:"auto", flexWrap:"wrap"}}>
     <h1>Storyboard for "{this.props.currentEntry.title}"</h1>
    <div style={{width:"100%", position:"relative"}}>

       <StoryBoardSettingList entry={this.props.currentEntry} />
       <StoryBoardCharacterList entry={this.props.currentEntry}/>
       <StoryBoardCharacterSettingList entry={this.props.currentEntry}/>

     </div>
      <div style={{position:"relative", left:"49%"}}>
       <Link to={`/add-entry-info/${this.props.currentEntry.id}`}><button className="positive ui button" style={{marginRight:"1.5%"}}>Add a Character or Setting!</button></Link>
       <Link key={Math.random()} to={`/entries/${this.props.currentEntry.id}`}><button className="ui button blue" style={{marginRight:"1.5%"}}>Keep Writing </button></Link>
       <Link to={`/edit-entry/${this.props.currentEntry.id}`}><button className="ui button black" style={{marginRight:"1.5%"}}>Edit Entry</button></Link>
       <button className="ui button red" style={{marginRight:"1.5%"}} onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteEntry(e) } }>Delete Entry</button>
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
