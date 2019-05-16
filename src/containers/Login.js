import React from 'react';
import { connect } from 'react-redux'
import history from '../history';


class Login extends React.Component {

  state = {
    username: "",
    password: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
   this.createAuth(this.state)
  }

  createAuth = (info) => {
       fetch("http://localhost:4000/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accepts": "application/json" },
        body: JSON.stringify({username: info.username, password: info.password})
       })
        .then(response => response.json())
        .then(json => {
          if (json.errors){
            alert(json.errors)
          } else {
            this.props.setCurrentUser(json.user)
            localStorage.setItem("token", json.token)
            history.push('/profile')
          }
        })
  }

  render(){
    return(
      <div className="ui raised card" style={{width: "55%", position: "relative", left: "25%", padding:"5em", top: "5em"}}>
      <div className="ui attached message" style={{position: "relative", bottom: "3em", textAlign: "center"}}>
        <div className="header">
          <h2>Welcome Back to TellTale! Login to Keep on Writing!</h2>
        </div>
      </div>

          <form onSubmit={this.handleSubmit}>
          <div className="ui form">
            <div className="field">
              <label>Username</label>
              <input type="text" placeholder="Username" name="username" onChange={this.handleChange} required />
              </div>
            <div className="field">
              <label>Password</label>
              <input type="password" placeholder="Password" name="password" onChange={this.handleChange} required />
              </div>
          <button className="ui button" style={{position:"relative", left: "15.5em", top: "1.5em"}} type="submit">Login</button>
        </div>
        </form>
      </div>
    )
  }

}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser: (user) => {
      // dispatch is our new setState and it takes an object with a type and a payload
      dispatch({type: "SET_CURRENT_USER", payload: user})
    }
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);