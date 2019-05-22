import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';



class CharacterPage extends Component {

  state = {
    character: null
  }

  componentDidMount = () => {
    fetch("http://localhost:4000/api/v1/characters/".concat(`${this.props.match.params.id}`))
    .then(res=>res.json())
    .then(character => {
      this.setState({
        character: character
      })
    })
  }

  render (){
    if (!this.state.character) {
      return <h1>Loading...</h1>
    }
    console.log(this.state.character.entry_id)
    return (
      <div>
      This is the Page for {this.state.character.name}
      <Link to={`/storyboards/${this.state.character.entry_id}`}><button>Return To Storyboard</button></Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentEntry: state.currentEntry
  }
}

export default connect(mapStateToProps)(CharacterPage)
