import React, { Component } from 'react'

class CPCreateCharacterSettingForm extends Component {

  renderRows = () => {
    if(this.props.currentEntry){
    let settingOptionsArray = this.props.currentEntry.settings.map((setting)=>{
      return (<option key={Math.random()} value={setting.id}>{setting.name}</option>)
    })
    return settingOptionsArray
    }

  }
  handleChange=(e)=> {
    console.log(e.target.value)
  }

  render(){
    console.log(this.props.currentEntry)
    return (
      <div>
      This is the Create Character Setting Form - it belongs on the Character Page!
      <select onChange={this.handleChange} className="ui dropdown">
      <option label="Select a Setting!"></option>
        {this.renderRows()}
      </select>
      </div>
    )
  }
}

export default CPCreateCharacterSettingForm
