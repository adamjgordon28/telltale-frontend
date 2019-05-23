import React, { Component } from 'react';
import CharacterSettingCard from '../components/CharacterSettingCard.js'


class StoryBoardCharacterSettingList extends Component {

  renderCharacterSettings = () => {
    let charSetArray = this.props.entry.character_settings.map((charSet)=> {
      return <CharacterSettingCard key={Math.random()} charSet={charSet}/>
    })
    return charSetArray
  }
  render(){
    console.log(this.props.entry.character_settings)
    return(
      <div className="ui raised card" style={{width: "28%", position: "absolute", left:"68%", minHeight:"30em", maxHeight:"30em", overflowY: "scroll", display: "inline-block"}}>
      <h3 style={{textAlign:"center"}}>Character Settings</h3>
      {this.renderCharacterSettings()}
      </div>
    )
  }
}


export default StoryBoardCharacterSettingList
