import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../history.js';


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
      this.props.setCurrentEntry(character.entry)
      this.setState({
        name: character.name,
        description: character.description,
        character: character
      })
    })
  }


  render(){
    return(
      <Fragment>
        <div className="ui raised card" style={{width: "32%", position: "relative", left: "34%", padding: "3%", height: "30em"}}>

        <h2 style={{position:"relative", bottom:"3.5%", textAlign:"center"}}> Edit This Character!</h2>

        <form onSubmit={this.handleSubmit}>
        <div className="ui form" >
          <div className="required field">
            <label>Name</label>
            <input type="text" placeholder="Name" name="name" onChange={this.handleChange} value = {this.state.name} maxLength="32" required/>
            </div>
            <div className="required field">
            <label>Description</label>
            <textarea type="text" placeholder="Description" name="description" onChange={this.handleChange} value ={this.state.description} required ></textarea>
            </div>
        <button style={{position: "relative", left:"37.5%"}} className="ui button" type="submit">Submit</button>
      </div>
      </form>
    </div>
    {this.props.currentEntry && <Link to={"/storyboards/".concat(`${this.props.currentEntry.id}`)}><button style={{position: "relative", left:"34%", top:"1.5em"}} className="ui button positive">Return to StoryBoard</button></Link>}
    <button style={{position:"relative", left:"41.75%", top:"1.5em"}} onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteCharacter(e) } }className="ui button negative">Delete Character</button>
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




export default connect(mapStateToProps, mapDispatchToProps)(EditCharacterForm)
