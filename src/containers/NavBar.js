import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'



class NavBar extends Component {

  render(){
    return (

  <div className="ui menu">
    <div className = "item">
      <Link to ={"/create-entry"}>
      Start a New Entry
      </Link>
    </div>
    <div className="item">
    See Your Entries
    </div>
    <div className="item">
    View the Feed
    </div>
    <Link to="/logout">
      <div className="item">
    Logout
      </div>
    </Link>
  </div>
    )
  }

}


const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(NavBar)
