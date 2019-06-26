import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../history.js';
import WithAuth from '../components/WithAuth.js';

class EditCharacterForm extends Component {


  state = {
    name: "",
    description: "",
    character: null
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
   this.updateCharacter(this.state)
  }

  updateCharacter = (character) => {
    fetch("http://localhost:4000/api/v1/characters/".concat(`${this.props.match.params.id}`),{
      method: "PATCH",
      headers: {
            'Content-Type': 'application/json'
        },
      body: JSON.stringify({
        name: character.name,
        description: character.description
      })
    })
    .then(res=>res.json())
    .then(newCharacter => {
    this.props.updateCharacterInEntry(newCharacter)
    history.push(`/storyboards/${this.props.currentEntry.id}`)
    })

  }

  deleteCharacter = () => {
      fetch("http://localhost:4000/api/v1/characters/".concat(`${this.props.match.params.id}`),
    {
      method: 'DELETE'
    })
    .then(res=>res.json())
    .then(character => {
      this.props.removeCharacterFromEntry(character)
      this.state.character.character_settings.forEach((character_setting) => {
        this.props.removeCharacterSettingFromEntry(character_setting)
      })
    })
    history.push(`/storyboards/${this.props.currentEntry.id}`)
  }

  componentDidMount = () => {
    fetch("http://localhost:4000/api/v1/characters/".concat(`${this.props.match.params.id}`))
    .then(res=>res.json())
    .then(character => {
      if(character.status===404){
        alert("This is not a valid character.")
        this.props.setCurrentEntry(null)
        history.push('/about')
      }
      this.props.setCurrentEntry(character.entry)
      this.setState({
        name: character.name,
        description: character.description,
        character: character
      })
    })
  }


  render(){
    if (this.props.currentUser && this.state.character){
     if(this.props.currentUser.id !== this.state.character.entry.user_id){
       alert("You do not have access to this page!")
       this.props.setCurrentEntry(null)
       history.push(`/about`)
     }
   }
    if (!this.props.currentEntry){
      return <h3>Loading...</h3>
    }
    return(
      <Fragment>
        <div className="ui raised card" style={{width: "32%", minWidth:"35em", position: "relative", left: "34%", padding: "3%", height: "38em"}}>
        <div className="ui attached message" style={{position: "relative", bottom: ".25em", textAlign: "center"}}>
          <div className="header">
            <h2 style={{position:"relative", bottom:"3.5%", textAlign:"center"}}> Edit This Character!</h2>
          </div>
        </div>
        <form style={{position:"relative", top:"1.5em"}} onSubmit={this.handleSubmit}>
        <div className="ui form" >
          <div className="required field">
            <label>Name</label>
            <input type="text" placeholder="Name" name="name" onChange={this.handleChange} value = {this.state.name} maxLength="32" required/>
            </div>
            <div className="required field">
            <label>Description</label>
            <textarea type="text" placeholder="Description" name="description" onChange={this.handleChange} value ={this.state.description} required ></textarea>
            </div>
        <button style={{position: "relative", left: "40%"}} className="ui button" type="submit">Submit</button>
      </div>
      </form>
      <div style={{position:"absolute", left:"39%"}}>
      {this.props.currentEntry && <Link to={"/storyboards/".concat(`${this.props.currentEntry.id}`)}><button style={{position:"relative", right:"57.5%", top:"30.5em"}} className="ui button blue">Return to StoryBoard</button></Link>}
      <button style={{position:"relative", left:"40%", top:"27.5em"}} onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteCharacter(e) } }className="ui button negative">Delete Character</button>
      </div>
    </div>

    </Fragment>
    )
  }


}


function mapDispatchToProps(dispatch) {
  return {
    setCurrentEntry: (entry) => {

      dispatch({type: 'SET_CURRENT_ENTRY', payload: entry})
    },
    updateCharacterInEntry: (character) => {
      dispatch({type: 'UPDATE_CHARACTER_IN_ENTRY',
    payload: character})
    },
    removeCharacterFromEntry: (character) =>{
      dispatch({type: 'REMOVE_CHARACTER_FROM_ENTRY', payload: character})
    },
    updateCharacterSettingInEntry: (character) =>{
      dispatch({type: 'UPDATE_CHARACTER_SETTING_IN_ENTRY', payload: character})
    },
    removeCharacterSettingFromEntry: (characterSetting) => {
      dispatch({
        type: 'REMOVE_CHARACTER_SETTING_FROM_ENTRY',
        payload: characterSetting
      })
    }
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentEntry: state.currentEntry
  }
}




export default WithAuth(connect(mapStateToProps, mapDispatchToProps)(EditCharacterForm))
