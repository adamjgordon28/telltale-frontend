import React, { Component } from 'react';



class About extends Component {


render(){
  return (
    <div className="ui raised card" style={{width:"56%", minWidth:"50em", position:"relative", left:"22%", padding:"3em", top:"1em", height:"35em"}}>
      <div className="ui attached message" style={{position: "relative", bottom: "2em", paddingBottom:"2.5em",textAlign: "center"}}>
        <div className="header">

          <img style={{height:"5em", background: "white", border:".25em solid gray", borderRadius:"2.5em", position: "relative", top: "1em"}} alt="" src='./icons/TellTaleLogo.png'/>





          <h2>Welcome to the Beginning of Your Next Adventure!</h2>
        </div>
      </div>
      <div className="extra content" style={{position:"relative", top:"-0.5em"}}>
      <h3 style={{color:"black", textAlign: "center"}}> Hello writers! We here at TellTale appreciate the fun and importance of writing, but also know that it can sometimes be difficult to know where to start. Have a good idea for a story? Once you're logged in you can click the "Start a New Entry" button and jot down some quick notes. Each entry comes with its own storyboard, where you can feel free to add characters and settings, and even add notes on which characters appear in which settings. The way you choose to organize the story is up to you! Each entry also includes its own text editor, and your entry will always be there waiting for you without having to save. You can publish your entry at any time if you want the TellTale community to view it, and always have the option to change this. You can follow other authors and read their entries as well. What are you waiting for? Get writing! </h3>
      </div>
    </div>
  )
}


}

export default About
