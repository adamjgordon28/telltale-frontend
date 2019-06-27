import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import history from '../history.js';
import WithAuth from '../components/WithAuth.js';



class EditUserForm extends Component {

  state = {
    username:"",
    img_url:"",
    name:"",
    bio:"",
    location:"",
    age:""
  }


  logOut = () => {
    localStorage.removeItem("token")
    this.props.setCurrentUser(-1)
    this.props.setCurrentEntry(null)
    history.push('/login')
  }


  componentDidMount = () => {
    fetch ("http://localhost:4000/api/v1/users/".concat(`${this.props.match.params.id}`))
    .then(response => response.json())
    .then(fetchedUser => {
      this.setState({
        username: fetchedUser.username,
        img_url: fetchedUser.img_url,
        name: fetchedUser.name,
        bio: fetchedUser.bio,
        location: fetchedUser.location,
        age: fetchedUser.age
      })
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
   this.updateUser(this.state)
  }

  updateUser = (info) => {
    fetch("http://localhost:4000/api/v1/users/".concat(`${this.props.match.params.id}`), {
     method: "PATCH",
     headers: { "Content-Type": "application/json", "Accepts": "application/json" },
     body: JSON.stringify({username: info.username, img_url: info.img_url, name: info.name, location: info.location, age: info.age, bio: info.bio})
    })
    .then(response => response.json())
    .then(json => {
      if (json.errors){
        alert(json.errors)
      }
      else {
        this.props.setCurrentUser(json)
        history.push("/profiles/".concat(`${this.props.currentUser.id}`))
      }
    })

  }


  deleteUser = (e) => {
      e.preventDefault()
      fetch("http://localhost:4000/api/v1/users/".concat(`${this.props.match.params.id}`),
    {
      method: 'DELETE'
    })
    this.logOut()
  }


  render(){
    if(!this.props.currentUser){
      return <h1>Loading...</h1>
    }

    if(this.props.currentUser.id !== parseInt(this.props.match.params.id)){
      alert("You do not have access to this page!")
      return <Redirect to="/about"/>
    }

    return(
      <div className="ui raised card" style={{width:"40%", minWidth:"40em", position:"relative", left:"30%", padding:"2.5%", height:"52.5em"}}>
        <div className="ui attached message" style={{position: "relative", bottom: ".25em", textAlign: "center"}}>
          <div className="header">
            <h2>Edit Your Account Info Here!</h2>
          </div>
        </div>
          <form style={{position:"relative", top:"2em"}} onSubmit={this.handleSubmit}>
          <div className="ui form" >
              <div className="required field">
                <label>Username</label>
                <input type="text" placeholder="Username" name="username" onChange={this.handleChange} value = {this.state.username} maxLength="32" required/>
              </div>
              <div className="required field">
                <label>Image URL</label>
                <input onChange={this.handleChange} placeholder="Image URL" name="img_url" type="url" value={this.state.img_url} />
              </div>
              <div className="required field">
                <label>Name</label>
                <input onChange={this.handleChange} placeholder="Name" name="name" type="text" value={this.state.name} maxLength="50" />
              </div>
              <div className="required field">
                <label>Age</label>
                <input onChange={this.handleChange} placeholder="Age" name="age" type="number" value={this.state.age}/>
              </div>
              <div className="required field">
                <label>Location</label>
                <input onChange={this.handleChange} placeholder="Location" name="location" type="text" value={this.state.location} maxLength="50" />
              </div>
              <div className="required field">
                <label>Bio</label>
                <textarea onChange={this.handleChange} placeholder="Bio" name="bio" type="text" value={this.state.bio} maxLength="1000" style={{height:"5em"}}></textarea>
              </div>



          <button style={{position: "relative", left: "40%"}} className="ui button" type="submit">Submit</button>
          {this.props.currentUser &&
            <div className="button-div" style={{position:"absolute"}}>
              <Link to={`/profiles/${this.props.currentUser.id}`}>
              <button className="ui button blue" style={{position:'relative', top:"1.25em"}}>Return to Profile</button>
              </Link>
              <Link to={`/profiles/${this.props.currentUser.id}`}>
              <button style={{position:'relative', top:"1.25em", left:"72.5%"}} className="ui button negative" onClick={(e) => { if (window.confirm('Are you sure you wish to delete your account? This cannot be undone.')) this.deleteUser(e) } }>Delete Account</button>
              </Link>
            </div>
          }

        </div>
        </form>
      </div>)
  }



}


function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser: (user) => {
      dispatch({type: "SET_CURRENT_USER", payload: user})
    },
    setCurrentEntry: (entry) => {

      dispatch({type: 'SET_CURRENT_ENTRY', payload: entry})
    }
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default WithAuth(connect(mapStateToProps, mapDispatchToProps )(EditUserForm))
