import React, {Component, Fragment} from 'react'

class StoryBoardCharacters extends Component {
  renderCharacters = () => {
    let charactersArray = this.props.entry.characters.map((character)=>{
      return <li key={Math.random()}>{character.name}</li>
    })
    return charactersArray
  }
render () {

  return(
    <Fragment>
    <div>These are the Characters!</div>
    <ul>{this.renderCharacters()}</ul>
    </Fragment>
  )
}
}

export default StoryBoardCharacters
