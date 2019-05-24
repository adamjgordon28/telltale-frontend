import React from 'react';
import { Link } from 'react-router-dom';


const logoMatcher = {
  "adventure":"/icons/Adventure.png",
  "comedy":"/icons/Other.png",
  "drama":"/icons/Drama.png",
  "fantasy":"/icons/Fantasy.png",
  "historical-fiction":"/Historical-Fiction.png",
  "horror":"/icons/Horror.png",
  "mystery":"/icons/Mystery.png",
  "non-fiction":"/icons/Non-Fiction.png",
  "romance":"/icons/Romance.png",
  "science-fiction":"/icons/Science-Fiction.png",
  "western":"/icons/Western.png",
  "other":"/icons/Other.png"
}



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
      <img className="ui avatar image" src={logoMatcher[this.props.entry.genre]} alt =""/>Genre: {this.props.entry.genre}
      debugger
    </div>
  </div>
</div>

    )
  }

}



export default EntryCard
