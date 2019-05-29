import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import history from '../history.js';


class Profile extends React.Component {

  state = {
    user: null
  }


  fetchAndSetUser = () => {
    fetch("http://localhost:4000/api/v1/users/".concat(`${this.props.match.params.id}`))
    .then(res=>res.json())
    .then(returnedUser => {
      this.setState({
        user:returnedUser
      })
    })
  }

  componentDidMount = () => {
    this.fetchAndSetUser()
  }

  componentDidUpdate = (prevProps) => {
  if (this.props.match.params.id !== prevProps.match.params.id) {
    this.fetchAndSetUser()
  }

}

  render(){
    if(this.props.currentUser === -1){
      history.push("/login")
    }
    if(!this.state.user || !this.props.currentUser){
      return <h1>Loading...</h1>
    }
    return (
      <div>
       {this.state.user.id === this.props.currentUser.id ? <h1>Welcome back {this.state.user.name}</h1> : <h1>This is the profile of {this.state.user.name}</h1> }
      {this.state.user ? <div>
      <img style={{borderRadius: "50%", height: "12em"}} src={this.state.user.img_url} alt=""/> </div>: null}
      <button className="ui button positive">Follow this User</button>
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
