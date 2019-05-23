import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SettingCard extends Component {
  render (){
    return (
      <div style={{position: "absolute", left: "13.5%"}} className="ui raised card">
  <div className="content">
    <div className="header">{this.props.setting.name}</div>
    <div className="meta">
      <span className="category">Animals</span>
    </div>
    <div className="description">
      <p></p>
    </div>
  </div>
  <div className="extra content">
    <div className="right floated">
      <Link to={`/settings/${this.props.setting.id}`}><button className="ui button">View Setting Page</button></Link>
    </div>
  </div>
</div>
    )
  }
}

export default SettingCard
