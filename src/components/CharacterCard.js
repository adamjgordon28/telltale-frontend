import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CharacterCard extends Component {
  render (){
    return (
      <div className="ui raised card" style={{width: "80%", margin: "5%", marginLeft:"10%"}}>
  <div className="content">
      <div  style={{overflowX: "hidden", overflowY: "auto", minHeight: "1.25em", maxHeight: "1.25em", textOverflow: "ellipsis"}} className="header">{this.props.character.name}</div>
  </div>
  <div className="extra content">
  <div className="right floated">
    <Link to={`/characters/${this.props.character.id}`}><button style={{position:"relative", right: "3.25%"}} className="ui button">View Character Page</button></Link>
  </div>
  </div>
</div>
    )
  }
}

export default CharacterCard
