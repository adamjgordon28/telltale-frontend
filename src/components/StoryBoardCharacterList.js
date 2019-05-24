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
      return <h1>No characters yet!</h1>
    }
  }
render () {

  return(
    <div className="ui raised card" style={{width: "20%", position: "absolute", left: "30%", minHeight:"38em" , maxHeight: "38em", overflowY: "scroll", display: "inline-block"}}>
    <h3 style={{textAlign:"center"}} >Characters</h3>
    {this.props.entry.characters && this.renderCharacters()}
    </div>
  )
}
}

export default StoryBoardCharacterList
