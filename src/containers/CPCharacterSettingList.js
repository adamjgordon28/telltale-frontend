import React, {Component} from 'react';
import PageCharacterSettingCard from '../components/PageCharacterSettingCard.js';


class CPCharacterSettingList extends Component {
  renderCharacterSettings = () => {
    let charSetArray = this.props.character.character_settings.map((charSet) => {
      return <PageCharacterSettingCard key={Math.random()} charSet={charSet}/>
    })
    if (charSetArray.length){
    return charSetArray
    }
    else {
      return <h4 style={{textAlign:"center"}}>This character hasn't been detailed at any settings yet!</h4>
    }
  }
  render(){
    return (
      <div className="ui raised card ui grid" style={{width: "40%", position: "absolute", left: "52.5%", top: "17%", padding: "2%",minHeight:"57.5%", maxHeight:"57.5%", overflowY: "scroll"}}>
      <h3 style={{textAlign:"center", position:"relative", bottom:"1.25em"}} >Places This Character Has Been: </h3>
      {this.renderCharacterSettings()}
      </div>
    )
  }
}

export default CPCharacterSettingList
