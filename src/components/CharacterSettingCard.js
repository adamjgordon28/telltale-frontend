import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class CharacterSettingCard extends Component {
  render (){
    return(
            <div className="ui raised card">
        <div className="content">
          <div className="header">{this.props.charSet.character.name} at {this.props.charSet.setting.name}</div>
          <div className="meta">
            <span className="category">Chapter {this.props.charSet.chapter}</span>
          </div>
          <div className="description">
          <h3>Description:</h3>
            <p>{this.props.charSet.description}</p>
          </div>
        </div>
        <div className="extra content">
        <div className="right floated">
          <Link to={`/character-setting-edit/${this.props.charSet.id}`}><button className="ui button">Edit</button></Link>
        </div>
        </div>
      </div>
    )
  }
}


export default CharacterSettingCard
