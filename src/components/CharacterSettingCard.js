import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class CharacterSettingCard extends Component {
  render (){
    if (!this.props.charSet.character || !this.props.charSet.setting){
      return <h1>Loading...</h1>
    }
    return(

            <div className="ui card three wide column" style={{position: "relative",left:"6%", display: "inline-block", width: "40%", height: "16em", margin: "2%" }}>
        <div className="content">
          <div className="header">{this.props.charSet.character.name} at {this.props.charSet.setting.name}</div>
          <div className="meta">
            <span className="category">Chapter {this.props.charSet.chapter}</span>
          </div>
          <div style={{position: "absolute", top: "40%"}} className="description">
          <h3>Description:</h3>
            <p>{this.props.charSet.description}</p>
          </div>
        </div>
        <div className="extra content">
        <div className="right floated">
          <Link to={`/edit-character-setting/${this.props.charSet.id}`}><button style = {{position: "absolute", right: "2%", top: "80%"}} className="ui button">Edit</button></Link>
        </div>
        </div>
      </div>
    )
  }
}


export default CharacterSettingCard
