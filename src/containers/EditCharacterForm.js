import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../history.js';


class EditCharacterForm extends Component {


  state = {
    name: "",
    description: ""
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
    })
    history.push(`/storyboards/${this.props.currentEntry.id}`)
  }

  deleteCharacter = () => {
      fetch("http://localhost:4000/api/v1/characters/".concat(`${this.props.match.params.id}`),
    {
      method: 'DELETE'
    })
    .then(res=>res.json())
    .then(character => {
     this.props.removeCharacterFromEntry(character)
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
        description: character.description
      })
    })
  }


  render(){
    return(
      <div>Edit Character Form

        <form onSubmit={this.handleSubmit}>
        <div className="ui form" >
          <div className="field">
            <label>Name</label>
            <input type="text" placeholder="Name" name="name" onChange={this.handleChange} value = {this.state.name} maxLength="32" required/>
            </div>
            <div className="field">
            <label>Description</label>
            <textarea type="text" placeholder="Description" name="description" onChange={this.handleChange} value ={this.state.description} required ></textarea>
            </div>
        <button className="ui button" style={{position:"relative", top: "1.5em"}} type="submit">Submit</button>
      </div>
      </form>
      {this.props.currentEntry && <Link to={"/storyboards/".concat(`${this.props.currentEntry.id}`)}><button className="ui button blue">Return to StoryBoard</button></Link>}
      <button className="ui button negative" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this character?')) this.deleteCharacter(e) } }>Delete Character></button>
    </div>
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
    removeCharacterFromEntry: (character) => {
      dispatch({type: 'REMOVE_CHARACTER_FROM_ENTRY', payload: character})
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
