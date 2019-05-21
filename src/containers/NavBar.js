import React, { Component} from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'



class NavBar extends Component {

  render(){
    return (

  <div className="ui menu">
  <Link to ={"/create-entry"}>
    <div className = "item">
      Start a New Entry
    </div>
    </Link>
    <Link to="/entries">
    <div className="item">
    See Your Entries
    </div>
    </Link>
    <Link to ={"/profile"}>
    <div className="item">
    View Your Profile
    </div>
      </Link>
    {this.props.currentUser === -1 || this.props.currentUser === null ?
      <Link to="/signup"><div className="item">Signup</div></Link> :
      <Link to="/logout">
      <div className="item">
    Logout
      </div>
    </Link> }
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
