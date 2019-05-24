import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CharacterCard extends Component {
  render (){
    return (
      <div className="ui raised card" style={{width: "80%", margin: "10%"}}>
  <div className="content">
    <div className="header">{this.props.character.name}</div>
    <div className="meta">
      <span className="category">Animals</span>
    </div>
    <div className="description">
      <p></p>
    </div>
  </div>
  <div className="extra content">
  <div className="right floated">
    <Link to={`/characters/${this.props.character.id}`}><button className="ui button">View Character Page</button></Link>
  </div>
  </div>
</div>
    )
  }
}

export default CharacterCard
