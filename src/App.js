import React, { Fragment, Component} from 'react';
import { connect } from 'react-redux';
import { Route, Router } from 'react-router-dom'
import history from './history';
import CreateUserForm from './containers/CreateUserForm.js'
import Login from './containers/Login.js'
import UserProfile from './containers/UserProfile.js'
import EntryEditor from './containers/EntryEditor.js'
import CreateEntryForm from './containers/CreateEntryForm.js'
import NavBar from './containers/NavBar.js'
import Logout from './containers/Logout.js'
import EntryContainer from './containers/EntryContainer.js'

class App extends Component {

  logOut = () => {
    localStorage.removeItem("token")
    this.props.setCurrentUser(-1)
    history.push('/login')
  }

  componentDidMount() {
    const token = localStorage.getItem("token")

    if (token) {
      fetch("http://localhost:4000/api/v1/auto_login", {
        headers: {
          "Authorization": token
        }

      })
      .then(res => res.json())
      .then((user) => {
        if (user.errors) {
          this.props.setCurrentUser(-1)
        } else {
          this.props.setCurrentUser(user)
        }
      })
    }
  }
 //
 //  setCurrentUser = (response) => {
 //
 //   this.setState({
 //     currentUser: response.user
 //   }, () => {
 //     localStorage.setItem("token", response.token)
 //     this.props.history.push(`/profile`)
 //   })
 // }


  render() {
    return (
      <Fragment>

          <Router history={history}>
            <NavBar/>
            <Route exact path ="/signup" render = {(routeProps) => <CreateUserForm {...routeProps}/>}/>
            <Route exact path ="/login" render = {(routeProps) => <Login {...routeProps}/>}/>
            <Route exact path ="/profile" render = {(routeProps) => <UserProfile logOut={this.logOut}{...routeProps}/>}/>
            <Route exact path ="/editor" render = {(routeProps) => <EntryEditor {...routeProps}/>}/>
            <Route exact path ="/create-entry" render = {(routeProps) => <CreateEntryForm {...routeProps}/>}/>
            <Route exact path ="/logout" render = {(routeProps) => <Logout logOut = {this.logOut} {...routeProps}/>}/>
            <Route exact path ="/entries" render = {(routeProps) => <EntryContainer {...routeProps}/>}/>
            <Route exact path ="/" render = {(routeProps) => <CreateEntryForm {...routeProps}/>}/>
          </Router>
      </Fragment>
  )};

}


function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
