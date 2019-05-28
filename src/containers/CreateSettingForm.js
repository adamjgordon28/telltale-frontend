import React from 'react';
import { connect } from 'react-redux';
import history from "../history.js"
class CreateSettingForm extends React.Component {

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
   this.createSetting(this.state)
  }

  createSetting = (info) => {
       fetch("http://localhost:4000/api/v1/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accepts": "application/json" },
        body: JSON.stringify({name: info.name, description: info.description, entry_id: `${this.props.currentEntry.id}`})
       })
        .then(response => response.json())
        .then(setting => {
          this.props.addSettingToEntry(setting)
          history.push("/storyboards/".concat(`${this.props.currentEntry.id}`))
        })
  }

  render(){
    return(
      <div>
       <h1 style={{position:"relative", right:"15%"}}>Add a New Setting</h1>
       <img alt="" src={'/icons/pyramids.png'} style={{position: "absolute", bottom:"82.5%", left: "70%", height:"5em"}}/>
          <form onSubmit={this.handleSubmit}>
          <div className="ui form" >
            <div className="required field">
              <label>Name</label>
              <input type="text" placeholder="Name" name="name" onChange={this.handleChange} maxLength="32" required />
              </div>
              <div className="required field">
              <label>Description</label>
              <textarea type="text" placeholder="Description" name="description" onChange={this.handleChange} required ></textarea>
              </div>
          <button className="ui button" style={{position:"relative", left: "11j.5em", top: "1.5em"}} type="submit">Submit</button>
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
    addSettingToEntry: (setting) => {

      dispatch({type: "ADD_SETTING_TO_ENTRY", payload: setting})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSettingForm)
