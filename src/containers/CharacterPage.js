import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import  CPCreateCharacterSettingForm from './CPCreateCharacterSettingForm.js'
import CPCharacterSettingList from './CPCharacterSettingList.js'


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
      }, () => {fetch("http://localhost:4000/api/v1/entries/".concat(`${this.state.character.entry.id}`))
       .then(response => response.json())
       .then(json => {
         this.props.setCurrentEntry(json)
       })})
    })


  }



  render (){
    if (!this.state.character) {
      return <h1>Loading...</h1>
    }

    return (
      <div>
      This is the Page for {this.state.character.name}
      <CPCreateCharacterSettingForm currentEntry={this.props.currentEntry} character={this.state.character}/>
      <Link to={`/edit-character/${this.state.character.id}`}><button className="ui button blue">Edit this Character</button></Link>
      <Link to={`/storyboards/${this.state.character.entry_id}`}><button className="ui button positive">Return To Storyboard</button></Link>
      <CPCharacterSettingList character={this.state.character}/>
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

function mapDispatchToProps(dispatch) {
  return {
    setCurrentEntry: (entry) => {

      dispatch({type: 'SET_CURRENT_ENTRY', payload: entry})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterPage)
