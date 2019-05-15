import React from 'react';


class CreateUserForm extends React.Component {

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
      console.log(this.state)
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
      <form className="ui form" onSubmit = {this.handleSubmit}>
        <h1>Welcome to TellTale - create an account here!</h1>
        <div  className="ui form">
          <div class="fields">
            <div class="field">
              <label>Name</label>
              <input type="text" placeholder="Name" name="name" onChange={this.handleChange}/>
            </div>
            <div class="field">
              <label>Age</label>
              <input type="number" placeholder="Age" name="age" onChange={this.handleChange}/>
            </div>
            <div class="field">
              <label>Location</label>
              <input type="text" placeholder="Location" name="location" onChange={this.handleChange}/>
            </div>
            <div class="field">
              <label>Inspirational Quote</label>
              <input type="text" placeholder="Inspirational Quote" name="bio" onChange={this.handleChange}/>
            </div>
            </div>
          </div>
          <button class="ui button" type="submit">Submit</button>
        </form>
    )
  }

}

export default CreateUserForm
