import React, { Component } from 'react';
import { Link } from 'react-redux'


class CharacterSettingCard extends Component {
  render (){
    console.log(this.props.charSet)
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
          <button className="ui button">Edit</button>
        </div>
        </div>
      </div>
    )
  }
}


export default CharacterSettingCard
