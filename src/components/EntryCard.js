import React from 'react';
import { Link } from 'react-router-dom';


class EntryCard extends React.Component {


  render() {
    return (
      <div style={{width: "40%", minWidth: "25em", height: "18em", position: "relative", marginLeft: "5%", marginTop: "2.5em", display: "inline-block"}} className="ui card">
  <div className="content">
    <div className="header">{this.props.entry.title}</div>
  </div>

  <div className="extra content">
  <div className="description">
    <p> Description: {this.props.entry.description}</p>
  </div>
  <Link key={Math.random()} to={`/storyboards/${this.props.entry.id}`}><button style = {{position: "relative", left: ".5em", top: "8em"}} className="ui blue button">View Storyboard</button></Link>
    <div className="right floated genre" style={{position: "relative", top:"8em"}}>
      <img className="ui avatar image" src="/images/avatar/small/matt.jpg" alt =""/>Genre: {this.props.entry.genre}
    </div>
  </div>
</div>

    )
  }

}



export default EntryCard
