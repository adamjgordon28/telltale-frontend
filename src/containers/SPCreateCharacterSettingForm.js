import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
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
      body: JSON.stringify({setting_id:`${this.props.setting.id}`, character_id: info.character_id, description: info.description, chapter:info.chapter})
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
      <div className="ui raised card" style={{width: "25%", minWidth:"25em", height: "38em", position: "relative", marginLeft:"7.25%", bottom: "155%", display:"inline-block"}}>
      <div style={{background:"silver", height:"5em", padding:"3%", overflowX:"hidden"}}>
      <h3 style={{textAlign:"center"}}>Which Characters appear in {this.props.setting.name} in your story? Detail it here!</h3>
      </div>
        {!!this.props.currentEntry.characters.length ?
        <Fragment>
            <form style={{position:"relative", padding:"8%"}} className="ui form" onSubmit={this.handleSubmit}>
              <select style={{position:"relative", marginBottom:"5%"}} onChange={this.handleChange} className="ui required dropdown" value={this.state.character_id} name="character_id" required>
              <option label="Select a Character!"></option>
                {this.renderRows()}
              </select>
              <div className= "required field">
              <label style={{fontWeight:"bold", fontSize:"1em"}}>Chapter</label>
              <input style={{position:"relative", marginBottom:"5%"}} onChange={this.handleChange} type="number" name="chapter" value={this.state.chapter} min={0} placeholder="Chapter" required/>
              </div>
              <div className ="required field">
                <label style={{fontWeight:"bold", fontSize:"1em"}}>Description</label>
                <textarea onChange={this.handleChange} name="description" placeholder="Description" value={this.state.description} required ></textarea >
              </div>
              <button style={{position:"relative", left:"35%", top:"2.5em"}} className="ui button" type="submit">Submit</button>
            </form>
        </Fragment>: <h3 style={{textAlign:"center", margin:"5%"}}>No characters have been detailed yet for this entry. If you're interesting in creating one, you can do so <Link key={Math.random()} to={`/add-entry-info/${this.props.currentEntry.id}`}>here</Link>!</h3>}
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
