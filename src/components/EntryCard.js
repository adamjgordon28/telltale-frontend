import React from 'react';


class EntryCard extends React.Component {
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
    <div className="right floated genre">
      <img className="ui avatar image" src="/images/avatar/small/matt.jpg" alt =""/>Genre: {this.props.entry.genre}
    </div>
  </div>
</div>
    )
  }

}


export default EntryCard
