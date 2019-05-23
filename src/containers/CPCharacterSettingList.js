import React, {Component} from 'react'


class CPCharacterSettingList extends Component {
  renderCharacterSettings = () => {
    let charSetArray = this.props.character.character_settings.map((charSet) => {
      return <li key={Math.random()}> Chapter {charSet.chapter}-{charSet.setting.name}: {charSet.description}</li>
    })
    return charSetArray
  }
  render(){
    console.log(this.props.character.character_settings)
    return (
      <div>This is a list of this character's character-settings!
      <ul>{this.renderCharacterSettings()}</ul>
      </div>
    )
  }
}

export default CPCharacterSettingList
