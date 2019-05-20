import React from 'react';


class EntryCard extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div className="ui raised link card">
  <div className="content">
    <div className="header">Cute Dog</div>
    <div className="meta">
      <span className="category">Animals</span>
    </div>
    <div className="description">
      <p></p>
    </div>
  </div>
  <div className="extra content">
    <div className="right floated author">
      <img className="ui avatar image" src="/images/avatar/small/matt.jpg" alt =""/> Matt
    </div>
  </div>
</div>
    )
  }

}


export default EntryCard
