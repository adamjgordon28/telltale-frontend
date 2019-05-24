import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SPCreateCharacterSettingForm from './SPCreateCharacterSettingForm.js';
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
      This is the page for {this.state.setting.name}
      <SPCreateCharacterSettingForm currentEntry={this.props.currentEntry} setting={this.state.setting}/>
      <Link to={`/edit-setting/${this.state.setting.id}`}><button className="ui button blue">Edit this Setting</button></Link>
      <Link to={`/storyboards/${this.state.setting.entry.id}`}><button className="ui button positive">Return To Storyboard</button></Link>
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
