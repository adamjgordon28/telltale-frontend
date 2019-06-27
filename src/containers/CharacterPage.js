import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import  CPCreateCharacterSettingForm from './CPCreateCharacterSettingForm.js';
import CPCharacterSettingList from './CPCharacterSettingList.js';
import history from '../history.js';
import HOCWithAuth from '../components/HOCWithAuth.js';


class CharacterPage extends Component {

  state = {
    character: null
  }

  componentDidMount = () => {
    fetch("http://localhost:4000/api/v1/characters/".concat(`${this.props.match.params.id}`))
    .then(res=>res.json())
    .then(character => {
      if(character.status===404){
        alert("This is not a valid character.")
        history.push('/about')
      }
      this.setState({
        character: character
      }, () => {fetch("http://localhost:4000/api/v1/entries/".concat(`${this.state.character.entry.id}`))
       .then(response => response.json())
       .then(json => {
         this.props.setCurrentEntry(json)
       })})
    })


  }



  render (){
    if (!this.state.character) {
      return <h1>Loading...</h1>
    }
    if (this.props.currentUser && this.state.character){
     if(this.props.currentUser.id !== this.state.character.entry.user_id){
       alert("You do not have access to this page!")
       this.props.setCurrentEntry(null)
       history.push(`/about`)
     }
    }
    return (
      <div>
      <h1>This is the page for {this.state.character.name}</h1>
        <div className="ui raised card" style={{position: "relative", left: "2.5%", minHeight: "72.5%", height:"38em", maxHeight: "66.5%", width: "20%", minWidth:"20em", display:"inline-block", float:"left"}}>
        <div style={{position:"relative", background:"silver", height:"5em", width:"100%"}}>
          <h3 style={{position:"relative", top:"30%", left:"30%"}}>Description</h3>
        </div>
        <div style={{textAlign:"center", position: "absolute", maxHeight:"80%", margin:"5%", minHeight:"80%", width:"90%", overflowY:"scroll", border:".25em beige solid", padding:".25em"}}>{this.state.character.description}</div>
        </div>
      <CPCreateCharacterSettingForm currentEntry={this.props.currentEntry} character={this.state.character}/>
      <CPCharacterSettingList character={this.state.character}/>
        <div className="button-div" style={{position:"relative", left: "56.75%", top:".75em", clear:"right"}}>
          <Link to={`/edit-character/${this.state.character.id}`}><button style={{position: "relative"}} className="ui button blue">Edit this Character</button></Link>
          <Link to={`/storyboards/${this.state.character.entry.id}`}><button style={{position: "relative", left:"5%"}} className="ui button positive">Return To Storyboard</button></Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentEntry: state.currentEntry
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentEntry: (entry) => {

      dispatch({type: 'SET_CURRENT_ENTRY', payload: entry})
    }
  }
}

export default HOCWithAuth(connect(mapStateToProps, mapDispatchToProps)(CharacterPage))
