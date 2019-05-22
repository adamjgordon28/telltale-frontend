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
      This is the Create Character Setting Form - it belongs on the Setting Page!
      <select onChange={this.handleChange} className="ui dropdown">
      <option label="Select a Character!"></option>
        {this.renderRows()}
      </select>

      </div>
    )
  }
}

export default SPCreateCharacterSettingForm
