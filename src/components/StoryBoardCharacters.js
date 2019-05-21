import React, {Component, Fragment} from 'react'

class StoryBoardCharacters extends Component {
  renderCharacters = () => {
    let charactersArray = this.props.entry.characters.map((character)=>{
      return <li key={Math.random()}><h4>{character.name}</h4></li>
    })
    return charactersArray
  }
render () {

  return(
    <div className="ui raised card" style={{width: "35%", position: "s", left: "15%", bottom: ".75em", minHeight:"30em", display: "inline-block"}}>
    <h3 style={{textAlign:"center"}} >Characters</h3>
    <ul>{this.renderCharacters()}</ul>
    </div>
  )
}
}

export default StoryBoardCharacters
