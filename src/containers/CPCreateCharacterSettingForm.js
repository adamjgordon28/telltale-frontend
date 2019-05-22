import React, { Component } from 'react'

class CPCreateCharacterSettingForm extends Component {

    state = {
      setting_id: "0",
      chapter: "",
      description: ""
    }

  renderRows = () => {
    if(this.props.currentEntry){
    let settingOptionsArray = this.props.currentEntry.settings.map((setting)=>{
      return (<option key={Math.random()} value={setting.id}>{setting.name}</option>)
    })
    return settingOptionsArray
    }
  }


  handleChange=(e)=> {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    console.log("Hello!")
  }

  render(){
    console.log(this.state)
    if (!this.props.currentEntry){
      return <h1>Loading...</h1>
    }
    return (
      <div>
        {this.props.currentEntry.settings.length &&
        <div>
        Where does the {this.props.character.name} appear at in your story? Detail it here!
            <form className="ui form" onSubmit={this.handleSubmit}>
              <select onChange={this.handleChange} className="ui dropdown" value={this.state.setting_id} name="setting_id" required>
              <option value="0" label="Select a Setting!"></option>
                {this.renderRows()}
              </select>
              <button className="ui button" type="submit">Submit</button>
            </form>
        </div>}
      </div>
    )
  }
}

export default CPCreateCharacterSettingForm
