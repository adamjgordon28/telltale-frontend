import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../history.js';


class EditSettingForm extends Component {


  state = {
    name: "",
    description: "",
    setting: null
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
   this.updateSetting(this.state)
  }

  updateSetting = (setting) => {
    fetch("http://localhost:4000/api/v1/settings/".concat(`${this.props.match.params.id}`),{
      method: "PATCH",
      headers: {
            'Content-Type': 'application/json'
        },
      body: JSON.stringify({
        name: setting.name,
        description: setting.description
      })
    })
    .then(res=>res.json())
    .then(newSetting => {
    this.props.updateSettingInEntry(newSetting)
      history.push(`/storyboards/${this.props.currentEntry.id}`)
    })

  }

  deleteSetting = () => {
      fetch("http://localhost:4000/api/v1/settings/".concat(`${this.props.match.params.id}`),
    {
      method: 'DELETE'
    })
    .then(res=>res.json())
    .then(setting => {
      this.props.removeSettingFromEntry(setting)
      this.state.setting.character_settings.forEach((character_setting)=> {
        this.props.removeCharacterSettingFromEntry(character_setting)
      })
    })
    history.push(`/storyboards/${this.props.currentEntry.id}`)
  }

  componentDidMount = () => {
    fetch("http://localhost:4000/api/v1/settings/".concat(`${this.props.match.params.id}`))
    .then(res=>res.json())
    .then(setting => {
      if(setting.status===404){
        alert("This is not a valid setting.")
        this.props.setCurrentEntry(null)
        history.push('/entries')
      }
      this.props.setCurrentEntry(setting.entry)
      this.setState({
        name: setting.name,
        description: setting.description,
        setting: setting
      })
    })
  }


  render(){
    if (!this.props.currentEntry){
      return <h3>Loading...</h3>
    }
     if (this.props.currentUser && this.state.setting){
      if(this.props.currentUser.id !== this.state.setting.entry.user_id){
        alert("You do not have access to this page!")
        this.props.setCurrentEntry(null)
        history.push(`/entries`)
      }
    }
    return(
      <Fragment>
        <div className="ui raised card" style={{width: "32%", position: "relative", left: "34%", padding: "3%", height: "30em"}}>

        <h2 style={{position:"relative", bottom:"3.5%", textAlign:"center", left:"2%"}}> Edit This Setting!</h2>

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
        <button style={{position: "relative", left: "37.5%"}} className="ui button" type="submit">Submit</button>
      </div>
      </form>
    </div>
    {this.props.currentEntry && <Link to={"/storyboards/".concat(`${this.props.currentEntry.id}`)}><button style={{position: "relative", left:"34%", top:"1.5em"}} className="ui button positive">Return to StoryBoard</button></Link>}
    <button style={{position:"relative", left:"43%", top:"1.5em"}} onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteSetting(e) } }className="ui button negative">Delete Setting</button>
    </Fragment>
    )
  }


}


function mapDispatchToProps(dispatch) {
  return {
    setCurrentEntry: (entry) => {

      dispatch({type: 'SET_CURRENT_ENTRY', payload: entry})
    },
    updateSettingInEntry: (setting) => {
      dispatch({type: 'UPDATE_SETTING_IN_ENTRY',
    payload: setting})
    },
    updateCharacterSettingInEntry: (characterSetting) => {
      dispatch({type: 'UPDATE_CHARACTER_SETTING_IN_ENTRY',
    payload: characterSetting})
    },
    removeSettingFromEntry: (setting) =>{
      dispatch({type: 'REMOVE_SETTING_FROM_ENTRY', payload: setting})
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




export default connect(mapStateToProps, mapDispatchToProps)(EditSettingForm)
