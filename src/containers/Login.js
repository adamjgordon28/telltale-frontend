import React from 'react';


class Login extends React.Component {

  state = {
    name: "",
    age: "",
    location: "",
    bio: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    },()=> {
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
        body: JSON.stringify({name: info.name, bio: info.bio, location: info.location, age: info.age})
       })
        .then(response => response.json())
        .then(json => {
          console.log(json)
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
          <button className="ui button" style={{position:"relative", left: "16.5em", top: "1.5em"}} type="submit">Submit</button>
        </div>
        </form>
      </div>
    )
  }

}

export default Login
