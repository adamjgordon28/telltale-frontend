import React, {Component} from 'react';
import CharacterSettingCard from '../components/CharacterSettingCard.js';

class SPCharacterSettingList extends Component {
  renderCharacterSettings = () => {
    let charSetArray = this.props.setting.character_settings.map((charSet) => {
      return <CharacterSettingCard key={Math.random()} charSet={charSet}/>
    })
    if (charSetArray.length){
    return charSetArray
    }
    else {
      return <h4>No characters have been detailed at this setting yet!</h4>
    }
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
