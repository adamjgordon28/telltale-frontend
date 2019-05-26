import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import  SPCreateCharacterSettingForm from './SPCreateCharacterSettingForm.js'
import SPCharacterSettingList from './SPCharacterSettingList.js'


class SettingPage extends Component {

  state = {
    setting: null
  }

  componentDidMount = () => {
    fetch("http://localhost:4000/api/v1/settings/".concat(`${this.props.match.params.id}`))
    .then(res=>res.json())
    .then(setting => {
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

    return (
      <div>
      <h1>This is the page for {this.state.setting.name}</h1>
        <div className="ui raised card" style={{position: "absolute", top:"15%", left: "2.5%", minHeight: "57.5%", maxHeight: "57.5%", width: "20%"}}>
        <h3 style={{textAlign:"center", position:"relative", top:"0.5em"}}>Description:</h3>
        <div style={{textAlign:"center", position: "relative", maxHeight:"32.5%", margin:"5%", minHeight:"32.5%", overflowY:"scroll"}}>{this.state.setting.description}</div>
        </div>
      <SPCreateCharacterSettingForm currentEntry={this.props.currentEntry} setting={this.state.setting}/>
        <Link to={`/edit-setting/${this.state.setting.id}`}><button style={{position: "absolute", left: "67.5%", top: "80%"}} className="ui button blue">Edit this Setting</button></Link>
        <Link to={`/storyboards/${this.state.setting.entry.id}`}><button style={{position: "absolute", left: "80%", top: "80%"}} className="ui button positive">Return To Storyboard</button></Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage)
