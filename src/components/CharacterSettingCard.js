import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class CharacterSettingCard extends Component {
  render (){
    if (!this.props.charSet.character || !this.props.charSet.setting){
      return <h1>Loading...</h1>
    }
    return(

            <div className="ui card" style={{position: "relative",left:"6%", display: "inline-block", width: "40%", height: "16em", margin: "2%"}}>
          <div className="header"><h4 style={{fontSize:"1em", wordWrap:"break-word", overflowX: "hidden", overflowY: "hidden", minHeight: "3.75em", maxHeight:"3.75em"}}>{this.props.charSet.character.name} at {this.props.charSet.setting.name}</h4></div>
          <div style={{position: "absolute", top: "27.5%", color:"gray", fontWeight: "bold"}}><span className="category">Chapter {this.props.charSet.chapter}</span></div>
          <div style={{position: "absolute", top: "40%", right: ".25%", maxHeight: "37.5%", minHeight: "37.5%", overflowY: "scroll", width: "100%", border:".125em beige solid"}} className="description">
          <h5>Description:</h5>
            <p>{this.props.charSet.description}</p>
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
