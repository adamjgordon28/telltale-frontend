import React from 'react';
import { connect } from 'react-redux';
import history from "../history.js"
class CreateCharacterForm extends React.Component {

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
   this.createCharacter(this.state)
  }

  createCharacter = (info) => {
       fetch("http://localhost:4000/api/v1/characters", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accepts": "application/json" },
        body: JSON.stringify({name: info.name, description: info.description, entry_id: `${this.props.currentEntry.id}`})
       })
        .then(response => response.json())
        .then(character => {
          this.props.addCharacterToEntry(character)
          history.push("/storyboards/".concat(`${this.props.currentEntry.id}`))
        })
  }

  render(){
    return(
      <div>
       <h1>Add a New Character</h1>
          <form onSubmit={this.handleSubmit}>
          <div className="ui form" >
            <div className="field">
              <label>Name</label>
              <input type="text" placeholder="Name" name="name" onChange={this.handleChange} required/>
              </div>
              <div className="field">
              <label>Description</label>
              <textarea type="text" placeholder="Description" name="description" onChange={this.handleChange} required ></textarea>
              </div>
          <button className="ui button" style={{position:"relative", left: "12.5em", top: "1.5em"}} type="submit">Submit</button>
        </div>
        </form>
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
    addCharacterToEntry: (character) => {

      dispatch({type: "ADD_CHARACTER_TO_ENTRY", payload: character})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCharacterForm)
