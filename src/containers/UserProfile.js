import React from 'react';
import {connect} from 'react-redux';
import history from '../history.js';


class UserProfile extends React.Component {

  render(){

    if(this.props.currentUser === -1){
      history.push("/login")
    }

    return (
      <div>
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
