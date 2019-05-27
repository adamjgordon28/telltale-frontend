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
      <h1>This is the page for {this.state.character.name}</h1>
        <div className="ui raised card" style={{position: "absolute", top:"15%", left: "2.5%", minHeight: "66.5%", maxHeight: "66.5%", width: "20%"}}>
        <div style={{background:"silver", height:"5em"}}>
          <h3 style={{textAlign:"center", position:"relative", top:"1em"}}>Description</h3>
        </div>
        <div style={{textAlign:"center", position: "relative", top:".8em", maxHeight:"30em", margin:"5%", minHeight:"30em", overflowY:"scroll", border:".25em beige solid", padding:".25em"}}>{this.state.character.description}</div>
        </div>
      <CPCreateCharacterSettingForm currentEntry={this.props.currentEntry} character={this.state.character}/>
        <Link to={`/edit-character/${this.state.character.id}`}><button style={{position: "absolute", left: "55%", top: "85%"}} className="ui button blue">Edit this Character</button></Link>
        <Link to={`/storyboards/${this.state.character.entry.id}`}><button style={{position: "absolute", left: "67.5%", top: "85%"}} className="ui button positive">Return To Storyboard</button></Link>
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
