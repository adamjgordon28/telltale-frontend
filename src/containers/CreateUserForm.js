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
    img_url: "",
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
       fetch(`${process.env.REACT_APP_BASE_URL}`.concat("/api/v1/users"), {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accepts": "application/json" },
        body: JSON.stringify({username: info.username, password: info.password, name: info.name, bio: info.bio, location: info.location, age: info.age, img_url: info.img_url})
       })
        .then(response => response.json())
        .then(json => {
          if (json.error){
            alert(json.error)
          }
          else if(!json.error) {
          this.props.setCurrentUser(json)
          localStorage.setItem("token", json.token)
          history.push(`/profiles/${json.user.id}`)
          }
        })
  }

  render(){
    return(
      <div className="ui raised card" style={{width: "40%", minWidth:"45em", position: "relative", left: "30%", padding:"5em"}}>
      <div className="ui attached message" style={{position: "relative", bottom: "3em", textAlign: "center"}}>
        <div className="header">
        <img style={{height:"5em", background: "white", border:".25em solid gray", borderRadius:"2.5em", position: "relative", top: ".75em"}} alt="" src='./icons/TellTaleLogo.png'/>
          <h2>Welcome to TellTale - Create an Account and get Writing Today!</h2>
        </div>
      </div>

          <form onSubmit={this.handleSubmit}>
          <div className="ui form">
            <div className="required field">
              <label>Username</label>
              <input type="text" placeholder="Username" name="username" onChange={this.handleChange} maxLength="32"/>
              </div>
            <div className="required field">
              <label>Password</label>
              <input type="password" placeholder="Password" name="password" onChange={this.handleChange} />
              </div>
          <div className="fields">
            <div className="eight wide required field">
              <label>Name</label>
              <input type="text" placeholder="Name" name="name" onChange={this.handleChange}  maxLength="50"/>
              </div>
              <div className="eight wide required field">
                <label>Age</label>
                <input type="number" placeholder="Age" name="age" onChange={this.handleChange} />
                </div>
          </div>
          <div className="fields">
              <div className="eight wide required field">
                <label>Location</label>
                <input type="text" placeholder="Location" name="location" onChange={this.handleChange} maxLength="50" />
                </div>
              <div className="eight wide required field">
                <label>Image URL</label>
                <input onChange={this.handleChange} placeholder="Image URL" name="img_url" type="url" />
              </div>
          </div>
              <div className="required field">
              <label>Bio</label>
              <textarea type="text" placeholder="Bio" name="bio" onChange={this.handleChange} maxLength="1000"></textarea>
              </div>
          <button className="ui button" style={{position:"relative", left: "45%", top: "1.5em"}} type="submit">Submit</button>
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
      dispatch({type: "SET_CURRENT_USER", payload: user.user})
    }
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateUserForm)
