import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class PageCharacterSettingCard extends Component {
  render (){
    if (!this.props.charSet.character || !this.props.charSet.setting){
      return <h1>Loading...</h1>
    }
    return(

      <div className="ui card" style={{position: "relative",left:"4%", display: "inline-block", width: "40%", height: "13.5em", marginLeft: "4%", top:"1em"}}>
    <div className="header"><h4 style={{ wordWrap:"break-word", overflowX: "hidden", overflowY: "hidden", minHeight: "3.5em", maxHeight:"3.5em", textAlign:"center", background:"silver", color:"white", padding:"5%"}}>{this.props.charSet.character.name} at {this.props.charSet.setting.name}</h4></div>
    <div style={{position: "absolute", top: "30%", left:"2.5%", color:"gray", fontWeight: "bold"}}><span className="category">Chapter {this.props.charSet.chapter}</span></div>
    <div style={{position: "absolute", top: "40%", right: ".25%", maxHeight: "37.5%", minHeight: "37.5%", overflowY: "scroll", width: "100%", border:".125em beige solid", padding:"2.5%"}} className="description">
    <h5>Description:</h5>
      <p>{this.props.charSet.description}</p>
    </div>
  <div className="extra content">
  <div className="right floated">
    <Link to={`/edit-character-setting/${this.props.charSet.id}`}><button style = {{position: "absolute", right: "2%", top: "78%"}} className="ui button">Edit</button></Link>
  </div>
  </div>
</div>

    )
  }
}


export default PageCharacterSettingCard
