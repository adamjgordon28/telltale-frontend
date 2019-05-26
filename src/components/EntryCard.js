import React from 'react';
import { Link } from 'react-router-dom';


const logoMatcher = {
  "adventure":"/icons/Adventure.png",
  "comedy":"/icons/Comedy.png",
  "drama":"/icons/Drama.png",
  "fantasy":"/icons/Fantasy.png",
  "historical-fiction":"/icons/Historical-Fiction-3.png",
  "horror":"/icons/ghost.png",
  "mystery":"/icons/detective2.png",
  "non-fiction":"/icons/Non-Fiction-2.png",
  "romance":"/icons/Romance.png",
  "science-fiction":"/icons/Science-Fiction-3.png",
  "western":"/icons/Western-2.png",
  "other":"/icons/Other.png"
}



class EntryCard extends React.Component {



  render() {

    return (
      <div style={{width: "40%", minWidth: "25em", height: "18em", position: "relative", marginLeft: "5%", marginTop: "2.5em", display: "inline-block"}} className="ui card">
  <div className="content">
    <div className="header">{this.props.entry.title.concat("    ")} <span style={{fontSize:".75em", color: "gray"}}> ({this.props.entry.genre})</span>
    <img className="ui avatar image" style={{height:"2em", width: "2em", position:"absolute", right: "2%", top: "2.5%"}} src={logoMatcher[this.props.entry.genre]} alt =""/></div>
  </div>

  <div className="extra content">

  <div style={{position:"absolute", right: ".00001%", bottom: "25.5%", maxHeight: "55%", minHeight: "55%", overflowY: "scroll", width: "100%", border:".125em beige solid"}} className="description">
    <p> Description: {this.props.entry.description}</p>
  </div>

  <Link key={Math.random()} to={`/storyboards/${this.props.entry.id}`}><button style = {{position: "absolute", left: "2%", top: "80%"}} className="ui blue button">View Storyboard</button></Link>
  </div>
</div>

    )
  }

}



export default EntryCard
