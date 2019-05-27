import React, {Component} from 'react'
import CharacterCard from './CharacterCard.js'

class StoryBoardCharacterList extends Component {
  renderCharacters = () => {
    let charactersArray = this.props.entry.characters.map((character)=>{
      return <CharacterCard character={character} key={Math.random()}/>
    })
    if (charactersArray.length){
      return charactersArray
    }
    else {
      return <h1 style={{position: "absolute", left: "12.5%", top: "15%"}}>No characters yet!</h1>
    }
  }
render () {

  return(
    <div className="ui raised card" style={{width: "20%", position: "absolute", left: "30%", minHeight:"41.25em" , maxHeight: "41.25em", overflowY: "scroll", display: "inline-block"}}>
    <div style={{background:"silver", height:"5em"}}>
    <h2 style={{textAlign:"center", position:"relative", top:".75em"}}>Characters</h2>
    </div>
    {this.props.entry.characters && this.renderCharacters()}
    </div>
  )
}
}

export default StoryBoardCharacterList
