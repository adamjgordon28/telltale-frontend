import React from 'react';
import { Link } from 'react-router-dom';

import { connect  } from 'react-redux';


class EntryCard extends React.Component {
  render() {
    return (
      <div style={{width: "95%", height: "18em", position: "relative", left: "2.5%"}} className="ui raised link card">
  <div className="content">
    <div className="header">{this.props.entry.title}</div>
    <div className="description">
      <p> Description: {this.props.entry.description}</p>
    </div>
  </div>
  <div className="extra content">
  <Link key={Math.random()} to={`/entries/${this.props.entry.id}`}><button className="positive ui button">Keep Writing </button></Link>
  <Link key={Math.random()} to={`/storyboards/${this.props.entry.id}`}><button style = {{position: "relative", left: ".5em"}} className="ui blue button">View Storyboard</button></Link>
    <div className="right floated genre">
      <img className="ui avatar image" src="/images/avatar/small/matt.jpg" alt =""/>Genre: {this.props.entry.genre}
    </div>
  </div>
</div>

    )
  }

}


function mapDispatchToProps(dispatch) {
  return {
    setCurrentEntry: (id) => {
      // dispatch is our new setState and it takes an object with a type and a payload


      dispatch({type: "SET_CURRENT_ENTRY", payload: id})
    }
  }
}


export default connect (null, mapDispatchToProps)(EntryCard)
