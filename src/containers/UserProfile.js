import React from 'react';
import {connect} from 'react-redux';
import history from '../history.js';
import ProfileNav from './ProfileNav.js'


class UserProfile extends React.Component {

  render(){
    if(!this.props.currentUser){
      history.push("/login")
    }
    return (
      <div>
      <ProfileNav logOut={this.props.logOut}/>
      {this.props.currentUser ? <h1>This is the profile of {this.props.currentUser.name}</h1>: null}
      <img src="https://pbs.twimg.com/media/DiT-EjmUYAMLkCS.jpg" alt=""/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(UserProfile)
