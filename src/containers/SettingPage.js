import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
      })
    })
  }

  render (){
    if (!this.state.setting) {
      return <h1>Loading...</h1>
    }
    return (
      <div>
      This is the page for {this.state.setting.name}
      <Link to={`/storyboards/${this.state.setting.entry_id}`}><button>Return To Storyboard</button></Link>
      </div>
    )
  }
}

export default SettingPage
