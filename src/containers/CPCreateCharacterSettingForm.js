import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from "../history";

class CPCreateCharacterSettingForm extends Component {

    state = {
      setting_id: "",
      chapter: "",
      description: ""
    }

  renderRows = () => {
    if(this.props.currentEntry){
    let settingOptionsArray = this.props.currentEntry.settings.map((setting)=>{
      return (<option key={Math.random()} value={setting.id}>{setting.name}</option>)
    })
    return settingOptionsArray
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
      body: JSON.stringify({character_id:`${this.props.character.id}`, setting_id: info.setting_id, description: info.description, chapter:info.chapter})
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
      <div className="ui raised card" style={{width: "25%", padding: "2%", position: "absolute",left: "25%", top: "15%", height: "57.5%"}}>
        {!!this.props.currentEntry.settings.length &&
        <div>
        <h3 style={{maxHeight:"2.75em", overflowY:"scroll", textAlign:"center", position:"relative", bottom:"1.25em"}}>Where does {this.props.character.name} appear in your story? Detail it here!</h3>
            <form className="ui form" onSubmit={this.handleSubmit}>
              <select style={{position:"relative", marginBottom:"1.5%"}} onChange={this.handleChange} className="ui dropdown" value={this.state.setting_id} name="setting_id" required>
              <option label="Select a Setting!"></option>
                {this.renderRows()}
              </select>
              <label>Chapter</label>
              <input style={{position:"relative", marginBottom:"1.5%"}} onChange={this.handleChange} type="number" name="chapter" value={this.state.chapter} min={0} placeholder="Chapter" required/>
              <div className ="field">
                <label>Description</label>
                <textarea onChange={this.handleChange} name="description" placeholder="Description" value={this.state.description} required ></textarea >
              </div>
              <button style={{left:"35%", top:"0.75em"}} className="ui button" type="submit">Submit</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(CPCreateCharacterSettingForm)
