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
      {this.props.currentUser ? <div><h1>Welcome back, {this.props.currentUser.name}!</h1>
      <img src={this.props.currentUser.img_url} alt=""/> </div>: null}
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
