import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';


class ProfileNav extends Component {

  render(){
    console.log(this.props)
    return (
    <Fragment>
  <div  className="ui labeled icon menu">
    <Link to={"/create-entry"}>
    <div>
    <i className="pencil alternate icon"></i>
    Start a New Entry
    </div>
    </Link>
    <div>
    <a className="item">
    <i className="paper plane icon"></i>
    See Your Entries
    </a>
    </div>
    <div>
    <a className="item">
    <i className="list icon"></i>
    View the Feed
    </a>
    </div>
    <div onClick={this.props.logOut}>
    <a className="item">
    <i className="undo icon"></i>
    Logout
    </a>
    </div>
    </div>
    </Fragment>
    )
  }

}


export default ProfileNav
