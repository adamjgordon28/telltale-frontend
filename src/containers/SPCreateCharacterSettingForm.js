import React, { Component } from 'react'

class SPCreateCharacterSettingForm extends Component {

  renderRows = () => {
    if(this.props.currentEntry){
    let characterOptionsArray = this.props.currentEntry.characters.map((character)=>{
      return (<option key={Math.random()} value={character.id}>{character.name}</option>)
    })
    return characterOptionsArray
    }

  }

  handleChange=(e)=> {
    console.log(e.target.value)
  }

  render(){
    return (
      <div>
      Which characters appear at {this.props.setting.name} in your story? Detail it here!
      <select onChange={this.handleChange} className="ui dropdown" required >
      <option label="Select a Character!"></option>
        {this.renderRows()}
      </select>

      </div>
    )
  }
}

export default SPCreateCharacterSettingForm
