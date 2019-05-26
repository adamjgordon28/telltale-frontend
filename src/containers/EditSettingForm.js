import React, { Component, Fragment} from 'react';
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
      <Fragment>
        <div className="ui raised card" style={{width: "32%", position: "absolute", left: "34%", padding: "4%", height: "30em"}}>

        <h2 style={{position:"absolute", top: "5%", left: "27.5%"}}> Edit This Setting!</h2>

        <form onSubmit={this.handleSubmit}>
        <div className="ui form" >
          <div className="field">
            <label>Name</label>
            <input type="text" placeholder="Name" name="name" onChange={this.handleChange} value = {this.state.name} maxLength="32" required/>
            </div>
            <div className="field">
            <label>Description</label>
            <textarea type="text" placeholder="Description" name="description" onChange={this.handleChange} value ={this.state.description} required ></textarea>
            </div>
        <button style={{position: "absolute", left: "37.5%", top: "110%"}} className="ui button" type="submit">Submit</button>
      </div>
      </form>
    </div>
    {this.props.currentEntry && <Link to={"/storyboards/".concat(`${this.props.currentEntry.id}`)}><button style={{position: "absolute", top: "70%", left: "34%", width:"13em"}} className="ui button positive">Return to StoryBoard</button></Link>}
    <button style={{position:"absolute",left:"50%", top: "70%", left: "53.5%", width:"13em"}} onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteCharacter(e) } }className="ui button negative">Delete Character</button>
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
