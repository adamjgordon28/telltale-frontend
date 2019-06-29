import React, {Component} from 'react'
import CharacterCard from './CharacterCard.js'

class StoryBoardCharacterList extends Component {
  renderCharacters = () => {
    let sortedArray = this.props.entry.characters.sort(function(a, b) {
  var nameA = a.name.toUpperCase();
  var nameB = b.name.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
})
    let charactersArray = sortedArray.map((character)=>{
      return <CharacterCard character={character} key={Math.random()}/>
    })
    if (charactersArray.length){
      return charactersArray
    }
    else {
      return <h2 style={{textAlign: "center", position: "relative", top: "5em"}}>No characters yet!</h2>
    }
  }
render () {

  return(
    <div className="ui raised card" style={{position:"relative", bottom:".5em", width: "20%", minWidth:"19em", marginLeft:"5%", minHeight:"40.5em", maxHeight: "40.5em", overflowY: "scroll", display: "inline-block"}}>
    <div style={{background:"silver", height:"5em"}}>
    <h2 style={{textAlign:"center", position:"relative", top:".75em"}}>Characters</h2>
    </div>
    {this.props.entry.characters && this.renderCharacters()}
    </div>
  )
}
}

export default StoryBoardCharacterList
