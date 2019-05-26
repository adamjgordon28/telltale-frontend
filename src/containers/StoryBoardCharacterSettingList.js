import React, { Component } from 'react';
import StoryBoardCharacterSettingCard from '../components/StoryBoardCharacterSettingCard.js'


class StoryBoardCharacterSettingList extends Component {

  renderCharacterSettings = () => {


    let charSetArray = this.props.entry.character_settings.map((charSet)=> {
      return <StoryBoardCharacterSettingCard key={Math.random()} charSet={charSet}/>
    })
    if (charSetArray.length){
      return charSetArray
    }
    else {
      return <h1>No notes yet!</h1>
    }
  }
  render(){
    return(
      <div className="ui raised card" style={{width: "40%", position: "absolute", left:"55%", minHeight:"38em" , maxHeight: "38em", overflowY: "scroll", display: "inline-block"}}>
      <h3 style={{textAlign:"center"}}>Notes on Characters in Settings</h3>
      {this.props.entry.character_settings && this.renderCharacterSettings()}
      </div>
    )
  }
}


export default StoryBoardCharacterSettingList
