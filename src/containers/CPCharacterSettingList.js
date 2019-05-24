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
      return <h4>This character hasn't been detailed at any settings yet!</h4>
    }
  }
  render(){
    return (
      <div className="ui raised card ui grid" style={{width: "60%", position: "absolute", right: "5%", top: "18%", padding: "2%",minHeight:"20%em", maxHeight:"50%", overflowY: "scroll"}}>
      <h3 style={{textAlign:"center"}} >Places This Character Has Been: </h3>
      {this.renderCharacterSettings()}
      </div>
    )
  }
}

export default CPCharacterSettingList
