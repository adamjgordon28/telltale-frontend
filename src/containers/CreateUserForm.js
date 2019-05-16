import React from 'react';
import { connect } from 'react-redux';
import history from '../history';


class CreateUserForm extends React.Component {

  state = {
    username: "",
    password: "",
    name: "",
    age: "",
    location: "",
    bio: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
   this.createUser(this.state)
  }

  createUser = (info) => {
       fetch("http://localhost:4000/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accepts": "application/json" },
        body: JSON.stringify({username: info.username, password: info.password, name: info.name, bio: info.bio, location: info.location, age: info.age})
       })
        .then(response => response.json())
        .then(json => {
          if (json.errors){
            alert(json.errors)
          }
          this.props.setCurrentUser(json)
          localStorage.setItem("token", json.token)
          history.push('/profile')
        })
  }

  render(){
    return(
      <div className="ui raised card" style={{width: "60%", position: "relative", left: "25%", padding:"5em"}}>
      <div class="ui attached message" style={{position: "relative", bottom: "3em", textAlign: "center"}}>
        <div class="header">
          <h2>Welcome to TellTale - Create an Account and get Writing Today!</h2>
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
            <div className="field">
              <label>Name</label>
              <input type="text" placeholder="Name" name="name" onChange={this.handleChange} required />
              </div>
              <div className="field">
                <label>Age</label>
                <input type="number" placeholder="Age" name="age" onChange={this.handleChange} required />
                </div>
              <div className="field">
                <label>Location</label>
                <input type="text" placeholder="Location" name="location" onChange={this.handleChange} required />
                </div>
              <div className="field">
              <label>Bio</label>
              <textarea type="text" placeholder="Bio" name="bio" onChange={this.handleChange} required ></textarea>
              </div>
          <button className="ui button" style={{position:"relative", left: "22.5em", top: "1.5em"}} type="submit">Submit</button>
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

export default connect(mapStateToProps,mapDispatchToProps)(CreateUserForm)
