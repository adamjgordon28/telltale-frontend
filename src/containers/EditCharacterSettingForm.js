import React, { Component } from 'react';
import {connect} from 'react-redux';
import history from '../history.js'



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
      console.log(newCharSet)
      history.push(`/storyboards/${this.props.currentEntry.id}`)
    })
  }

  deleteCharacterSetting = () => {
      fetch("http://localhost:4000/api/v1/character_settings/".concat(`${this.props.match.params.id}`),
    {
      method: 'DELETE'
    })
    history.push(`/storyboards/${this.props.currentEntry.id}`)
  }


  componentDidMount = () => {
    fetch("http://localhost:4000/api/v1/character_settings/".concat(`${this.props.match.params.id}`))
    .then(res=>res.json())
    .then(charSet=>{
      this.props.setCurrentEntry(charSet.entry)
      this.setState({
        setting_id: charSet.setting_id,
        character_id: charSet.character_id,
        chapter: charSet.chapter,
        description: charSet.description
      })
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
    console.log(this.props.currentEntry)
    return(
      <div>
      <h1>Edit This Character-Setting!</h1>
      {<form className="ui form" onSubmit={this.handleSubmit}>
        <select onChange={this.handleChange} className="ui dropdown" value={this.state.setting_id} name="setting_id" required>
        <option label="Select a Setting!"></option>
          {this.renderSettingRows()}
        </select>
        <select onChange={this.handleChange} className="ui dropdown" value={this.state.character_id} name="character_id" required >
        <option label="Select a Character!"></option>
          {this.renderCharacterRows()}
        </select>
        <label>Chapter</label>
        <input onChange={this.handleChange} type="number" name="chapter" value={this.state.chapter} min={0} placeholder="Chapter" required/>
        <div className ="field">
          <label>Description</label>
          <textarea onChange={this.handleChange} name="description" placeholder="Description" value={this.state.description} required ></textarea >
        </div>
        <button className="ui button" type="submit">Submit</button>
      </form>}
      <button style={{position:"absolute",left:"7.5%", top: "58.8%"}} onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteCharacterSetting(e) } }className="ui button negative">Delete Character Setting</button>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentEntry: (entry) => {

      dispatch({type: 'SET_CURRENT_ENTRY', payload: entry})
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
