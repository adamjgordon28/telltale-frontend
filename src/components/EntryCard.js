import React from 'react';

import { connect  } from 'react-redux'
import history from '../history';

class EntryCard extends React.Component {
  handleClick = () => {
    this.props.setCurrentEntry(this.props.entry.id)
    history.push("/editor")
  }
  render() {
    return (
      <div style={{width: "95%", height: "18em", position: "relative", left: "2.5%"}} className="ui raised link card">
  <div className="content">
    <div className="header">{this.props.entry.title}</div>
    <div className="meta">
      <span className="category">Animals</span>
    </div>
    <div className="description">
      <p>{this.props.entry.description}</p>
    </div>
  </div>
  <div className="extra content">
  <button onClick = {this.handleClick} className="positive ui button">Keep Writing </button>
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
