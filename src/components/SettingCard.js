import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SettingCard extends Component {
  render (){
    return (
      <div className="ui raised card" style={{width: "80%", margin: "10%"}}>
  <div className="content">
    <div  style={{overflowX: "hidden", textOverflow: "ellipsis"}} className="header">{this.props.setting.name}</div>
    <div className="meta">
      <span className="category">Animals</span>
    </div>
    <div className="description">
      <p></p>
    </div>
  </div>
  <div className="extra content">
    <div className="right floated">
      <Link to={`/settings/${this.props.setting.id}`}><button style={{position:"relative", right: "12%"}} className="ui button">View Setting Page</button></Link>
    </div>
  </div>
</div>
    )
  }
}

export default SettingCard
