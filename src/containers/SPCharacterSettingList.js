import React, {Component} from 'react'

class SPCharacterSettingList extends Component {
  renderCharacterSettings = () => {
    let charSetArray = this.props.setting.character_settings.map((charSet) => {
      return <li key={Math.random()}>Chapter {charSet.chapter}-{charSet.character.name}: {charSet.description}</li>
    })
    return charSetArray
  }
  render(){
    return (
      <div>This is a list of this setting's character-settings!
      <ul>{this.renderCharacterSettings()}</ul>
      </div>
    )
  }
}

export default SPCharacterSettingList
