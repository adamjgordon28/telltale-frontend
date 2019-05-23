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
      <div className="ui raised card" style={{width: "28%", position: "absolute", left: "36%", minHeight:"30em", maxHeight:"30em", overflowY: "scroll", display: "inline-block"}}>
      <h3 style={{textAlign:"center"}} >Characters Who Have Been To This Place: </h3>
      {this.renderCharacterSettings()}
      </div>
    )
  }
}

export default SPCharacterSettingList
