import React, {Component} from 'react'
import CharacterCard from './CharacterCard.js'

class StoryBoardCharacters extends Component {
  renderCharacters = () => {
    let charactersArray = this.props.entry.characters.map((character)=>{
      return <CharacterCard character={character} key={Math.random()}/>
    })
    return charactersArray
  }
render () {

  return(
    <div className="ui raised card" style={{width: "35%", position: "s", left: "15%", bottom: ".75em", minHeight:"30em", maxHeight:"30em", overflowY: "scroll", display: "inline-block"}}>
    <h3 style={{textAlign:"center"}} >Characters</h3>
    {this.renderCharacters()}
    </div>
  )
}
}

export default StoryBoardCharacters
