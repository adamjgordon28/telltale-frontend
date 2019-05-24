import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from "../history";

class SPCreateCharacterSettingForm extends Component {

  state = {
    character_id: "",
    chapter: "",
    description: ""
  }

  renderRows = () => {
    if(this.props.currentEntry){
    let characterOptionsArray = this.props.currentEntry.characters.map((character)=>{
      return (<option key={Math.random()} value={character.id}>{character.name}</option>)
    })
    return characterOptionsArray
    }
  }

  handleChange=(e)=> {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.createCharacterSetting(this.state)
  }


  createCharacterSetting = (info) => {
    fetch("http://localhost:4000/api/v1/character_settings", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accepts": "application/json" },
      body: JSON.stringify({character_id:info.character_id, setting_id:`${this.props.setting.id}`, description: info.description, chapter:info.chapter})
     })
     .then(res=>res.json())
     .then(characterSetting=>{
       this.props.addCharacterSettingToEntry(characterSetting)
     })
     history.push("/storyboards/".concat(`${this.props.currentEntry.id}`))
  }

  render(){
    if (!this.props.currentEntry){
      return <h1>Loading...</h1>
    }

    return (
      <div className="ui raised card" style={{width: "25%", padding: "2%", position: "absolute",left: "5%", top: "20%"}}>
      {!!this.props.currentEntry.characters.length &&
      <div>
      Which characters appear at {this.props.setting.name} in your story? Detail it here!
      <form className="ui form" onSubmit={this.handleSubmit}>
        <select onChange={this.handleChange} className="ui dropdown" value={this.state.character_id} name="character_id" required >
        <option label="Select a Character!"></option>
          {this.renderRows()}
        </select>
        <label>Chapter</label>
        <input onChange={this.handleChange} type="number" name="chapter" value={this.state.chapter} min={0} placeholder="Chapter" required/>
        <div className ="field">
          <label>Description</label>
          <textarea onChange={this.handleChange} name="description" placeholder="Description" value={this.state.description} required ></textarea >
        </div>
        <button className="ui button" type="submit">Submit</button>
      </form>

      </div>}
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
    addCharacterSettingToEntry: (characterSetting) => {
      dispatch({type: "ADD_CHARACTER_SETTING_TO_ENTRY", payload: characterSetting})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SPCreateCharacterSettingForm)
