import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import  SPCreateCharacterSettingForm from './SPCreateCharacterSettingForm.js';
import SPCharacterSettingList from './SPCharacterSettingList.js';
import history from '../history.js';
import WithAuth from '../components/WithAuth.js';


class SettingPage extends Component {

  state = {
    setting: null
  }

  componentDidMount = () => {
    fetch("http://localhost:4000/api/v1/settings/".concat(`${this.props.match.params.id}`))
    .then(res=>res.json())
    .then(setting => {
      if(setting.status===404){
        alert("This is not a valid setting.")
        this.props.setCurrentEntry(null)
        history.push('/about')
      }
      this.setState({
        setting: setting
      }, () => {fetch("http://localhost:4000/api/v1/entries/".concat(`${this.state.setting.entry.id}`))
       .then(response => response.json())
       .then(json => {
         this.props.setCurrentEntry(json)
       })})
    })


  }



  render (){
    if (!this.state.setting) {
      return <h1>Loading...</h1>
    }
    if (this.props.currentUser && this.state.setting){
     if(this.props.currentUser.id !== this.state.setting.entry.user_id){
       alert("You do not have access to this page!")
       this.props.setCurrentEntry(null)
       history.push(`/about`)
     }
   }
    return (
      <div>
      <h1>This is the page for {this.state.setting.name}</h1>
        <div className="ui raised card" style={{position: "absolute", top:"15%", left: "2.5%", minHeight: "72.5%", maxHeight: "72.5%", width: "20%"}}>
        <div style={{position:"absolute", background:"silver", height:"5em", width:"100%"}}>
        <h3 style={{position:"absolute", top:"30%", left:"30%"}}>Description</h3>
        </div>
        <div style={{textAlign:"center", position: "absolute", top:"5em", maxHeight:"80%", margin:"5%", minHeight:"80%", width:"90%", overflowY:"scroll", border:".25em beige solid", padding:".25em"}}>{this.state.setting.description}</div>
        </div>
      <SPCreateCharacterSettingForm currentEntry={this.props.currentEntry} setting={this.state.setting}/>
        <Link to={`/edit-setting/${this.state.setting.id}`}><button style={{position: "absolute", left: "55%", top: "92.5%"}} className="ui button blue">Edit this Setting</button></Link>
        <Link to={`/storyboards/${this.state.setting.entry.id}`}><button style={{position: "absolute", left: "66.5%", top: "92.5%"}} className="ui button positive">Return To Storyboard</button></Link>
      <SPCharacterSettingList setting={this.state.setting}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentEntry: state.currentEntry
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentEntry: (entry) => {

      dispatch({type: 'SET_CURRENT_ENTRY', payload: entry})
    }
  }
}

export default WithAuth(connect(mapStateToProps, mapDispatchToProps)(SettingPage))
