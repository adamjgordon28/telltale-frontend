import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
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
      let sortedSettings = this.props.currentEntry.settings.sort(function(a, b) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      })
    let settingOptionsArray = sortedSettings.map((setting)=>{
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
    fetch(`${process.env.REACT_APP_BASE_URL}`.concat("/api/v1/character_settings"), {
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
      <div className="ui raised card" style={{width: "25%", minWidth:"25em", height: "38em", position: "relative", marginLeft:"7.25%", bottom: "155%", display:"inline-block"}}>
      <div style={{background:"silver", height:"5em", padding:"3%", overflowX:"hidden"}}>
      <h3 style={{textAlign:"center"}}>Where does {this.props.character.name} appear in your story? Detail it here!</h3>
      </div>
        {!!this.props.currentEntry.settings.length ?
        <Fragment>
            <form style={{position:"relative", padding:"8%"}} className="ui form" onSubmit={this.handleSubmit}>
              <select style={{position:"relative", marginBottom:"5%"}} onChange={this.handleChange} className="ui required dropdown" value={this.state.setting_id} name="setting_id" required>
              <option label="Select a Setting!"></option>
                {this.renderRows()}
              </select>
              <div className = "required field">
                <label style={{fontWeight:"bold", fontSize:"1em"}}>Chapter</label>
                <input style={{position:"relative", marginBottom:"5%"}} onChange={this.handleChange} type="number" name="chapter" value={this.state.chapter} min={0} placeholder="Chapter" required/>
              </div>
              <div className ="required field">
                <label style={{fontWeight:"bold", fontSize:"1em"}}>Description</label>
                <textarea onChange={this.handleChange} name="description" placeholder="Description" value={this.state.description} required ></textarea >
              </div>
              <button style={{position:"relative", left:"35%", top:"2.5em"}} className="ui button" type="submit">Submit</button>
            </form>
        </Fragment> : <h3 style={{textAlign:"center", margin:"5%"}}>No settings have been detailed yet for this entry. If you're interesting in creating one, you can do so <Link key={Math.random()} to={`/add-entry-info/${this.props.currentEntry.id}`}>here</Link>!</h3>}
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
