import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../history.js';


class EditSettingForm extends Component {


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
    })
    history.push(`/storyboards/${this.props.currentEntry.id}`)
  }

  deleteSetting = () => {
      fetch("http://localhost:4000/api/v1/settings/".concat(`${this.props.match.params.id}`),
    {
      method: 'DELETE'
    })
    .then(res=>res.json())
    .then(setting => {
      this.props.removeSettingFromEntry(setting)
    })
    history.push(`/storyboards/${this.props.currentEntry.id}`)
  }

  componentDidMount = () => {
    fetch("http://localhost:4000/api/v1/settings/".concat(`${this.props.match.params.id}`))
    .then(res=>res.json())
    .then(setting => {
      this.props.setCurrentEntry(setting.entry)
      this.setState({
        name: setting.name,
        description: setting.description
      })
    })
  }


  render(){
    return(
      <div>Edit Setting Form

        <form onSubmit={this.handleSubmit}>
        <div className="ui form" >
          <div className="field">
            <label>Name</label>
            <input type="text" placeholder="Name" name="name" onChange={this.handleChange} value = {this.state.name} required/>
            </div>
            <div className="field">
            <label>Description</label>
            <textarea type="text" placeholder="Description" name="description" onChange={this.handleChange} value ={this.state.description} required ></textarea>
            </div>
        <button className="ui button" style={{position:"relative", top: "1.5em"}} type="submit">Submit</button>
      </div>
      </form>
      {this.props.currentEntry && <Link to={"/storyboards/".concat(`${this.props.currentEntry.id}`)}><button className="ui button blue">Return to StoryBoard</button></Link>}
      <button className="ui button negative" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this setting?')) this.deleteSetting(e) } }>Delete Setting</button>
    </div>
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
    removeSettingFromEntry: (setting) =>{
      dispatch({type: 'REMOVE_SETTING_FROM_ENTRY', payload: setting})
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
