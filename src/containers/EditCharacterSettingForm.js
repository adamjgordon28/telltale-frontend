import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import history from '../history.js';



class EditCharacterSettingForm extends Component {

  state = {
    setting_id: "",
    character_id: "",
    chapter: "",
    description: ""
  }

  renderSettingRows = () => {
    if(this.props.currentEntry){
    let settingOptionsArray = this.props.currentEntry.settings.map((setting)=>{
      return (<option key={Math.random()} value={setting.id}>{setting.name}</option>)
    })
    return settingOptionsArray
    }
  }

  renderCharacterRows = () => {
    if(this.props.currentEntry){
    let characterOptionsArray = this.props.currentEntry.characters.map((character)=>{
      return (<option key={Math.random()} value={character.id}>{character.name}</option>)
    })
    return characterOptionsArray
    }
  }



  updateCharacterSetting = (charSet) => {
    fetch("http://localhost:4000/api/v1/character_settings/".concat(`${this.props.match.params.id}`), {
      method: "PATCH",
      headers: {
            'Content-Type': 'application/json'
        },
      body: JSON.stringify({
        setting_id: charSet.setting_id,
        character_id: charSet.character_id,
        chapter: charSet.chapter,
        description: charSet.description
      })
    })
    .then(res=>res.json())
    .then(newCharSet=>{
      this.props.updateCharacterSettingInEntry(newCharSet)
      history.push(`/storyboards/${this.props.currentEntry.id}`)
    })
  }

  deleteCharacterSetting = () => {
      fetch("http://localhost:4000/api/v1/character_settings/".concat(`${this.props.match.params.id}`),
    {
      method: 'DELETE'
    })
    .then(res=>res.json())
    .then(setting => {
      this.props.removeCharacterSettingFromEntry(setting)
    })
    history.push(`/storyboards/${this.props.currentEntry.id}`)
  }


  componentDidMount = () => {
    fetch("http://localhost:4000/api/v1/character_settings/".concat(`${this.props.match.params.id}`))
    .then(res=>res.json())
    .then(charSet=>{
      if(charSet.status===404){
        alert("This is not a valid character-setting.")
        this.props.setCurrentEntry(null)
        history.push('/entries')
      }
      if (charSet.status!==404){
      this.props.setCurrentEntry(charSet.entry)
      this.setState({
        setting_id: charSet.setting_id,
        character_id: charSet.character_id,
        chapter: charSet.chapter,
        description: charSet.description
      })
      fetch("http://localhost:4000/api/v1/entries/".concat(`${charSet.entry.id}`))
      .then(res=>res.json())
      .then(entry=>{
      this.props.setCurrentEntry(entry)
      })
      }
    })

  }


    handleSubmit = (e) => {
      e.preventDefault()
      this.updateCharacterSetting(this.state)
    }

    handleChange = (e) => {
      this.setState({
      [e.target.name]: e.target.value
    })
  }



  render(){
    if (!this.props.currentEntry || !this.props.currentUser){
      return <h3>Loading...</h3>
    }
    if(this.props.currentEntry.status===404){
      alert("This is not a valid entry.")
      this.props.setCurrentEntry(null)
      history.push('/entries')
    }
     if (this.props.currentUser && this.props.currentEntry.user){
      if(this.props.currentUser.id !== this.props.currentEntry.user.id){
        alert("You do not have access to this page!")
        this.props.setCurrentEntry(null)
        history.push(`/entries`)
      }
    }
    return(
      <Fragment>
      <div className="ui raised card" style={{width: "30%", position: "relative", left: "35%", padding: "4%", height: "40em"}}>
      <h2>Edit This Character-Setting!</h2>
      {<form className="ui form" style={{height: "32em", borderRadius: "2%", padding: "10%"}} onSubmit={this.handleSubmit}>
        <select style={{marginBottom: "5%"}} onChange={this.handleChange} className="ui required dropdown" value={this.state.setting_id} name="setting_id" required>
        <option label="Select a Setting!"></option>
          {this.renderSettingRows()}
        </select>
        <select style={{marginBottom: "5%"}} onChange={this.handleChange} className="ui required dropdown" value={this.state.character_id} name="character_id" required >
        <option label="Select a Character!"></option>
          {this.renderCharacterRows()}
        </select>
        <div className="required field">
        <label>Chapter</label>
        <input onChange={this.handleChange} type="number" name="chapter" value={this.state.chapter} min={0} placeholder="Chapter" required/>
        </div>
        <div className ="required field">
          <label>Description</label>
          <textarea onChange={this.handleChange} name="description" placeholder="Description" value={this.state.description} required ></textarea >
        </div>
        <button style={{position: "relative", left: "30%", top: "2em"}} className="ui button" type="submit">Submit</button>
      </form>}

      </div>
      {this.props.currentEntry && <Link to={"/storyboards/".concat(`${this.props.currentEntry.id}`)}><button style={{position: "relative", top: "87.5%", left: "35%"}} className="ui button positive">Return to StoryBoard</button></Link>}
      <button style={{left:"37.25%"}} onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteCharacterSetting(e) } }className="ui button negative">Delete Character Setting</button>
      </Fragment>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentEntry: (entry) => {

      dispatch({type: 'SET_CURRENT_ENTRY', payload: entry})
    },
    updateCharacterSettingInEntry: (characterSetting) => {
      dispatch({type:'UPDATE_CHARACTER_SETTING_IN_ENTRY', payload: characterSetting})
    },
    removeCharacterSettingFromEntry: (characterSetting) => {
      dispatch({type:'REMOVE_CHARACTER_SETTING_FROM_ENTRY', payload: characterSetting})
    }
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentEntry: state.currentEntry
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(EditCharacterSettingForm)
