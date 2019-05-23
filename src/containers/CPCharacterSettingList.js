import React, {Component} from 'react';
import CharacterSettingCard from '../components/CharacterSettingCard.js';


class CPCharacterSettingList extends Component {
  renderCharacterSettings = () => {
    let charSetArray = this.props.character.character_settings.map((charSet) => {
      return <CharacterSettingCard key={Math.random()} charSet={charSet}/>
    })
    if (charSetArray.length){
    return charSetArray
    }
    else {
      return <h4>This character has't been detailed at any settings yet!</h4>
    }
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
