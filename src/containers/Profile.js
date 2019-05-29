import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import history from '../history.js';


class Profile extends React.Component {

  state = {
    user: null
  }

  componentDidMount = () => {
    fetch("http://localhost:4000/api/v1/users/".concat(`${this.props.match.params.id}`))
    .then(res=>res.json())
    .then(returnedUser => {
      this.setState({
        user:returnedUser
      })
    })
  }

  render(){
    console.log(this.state.user)
    if(this.props.currentUser === -1){
      history.push("/login")
    }

    return (
      <div>
      {this.state.user ? <div><h1>This is the profile of {this.state.user.name}!</h1>
      <img style={{borderRadius: "50%", height: "12em"}} src={this.state.user.img_url} alt=""/> </div>: null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Profile)
