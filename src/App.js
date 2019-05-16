import React, { Fragment, Component} from 'react';
import { connect } from 'react-redux';
import { Route, Router } from 'react-router-dom'
import history from './history';
import CreateUserForm from './containers/CreateUserForm.js'
import Login from './containers/Login.js'
import UserProfile from './containers/UserProfile.js'

class App extends Component {

  logOut = () => {
    localStorage.removeItem("token")
    this.props.setCurrentUser({currentUser: null})
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
      .then((response) => {
        this.props.setCurrentUser(response)
      })
    }
  }

  setCurrentUser = (response) => {
   this.setState({
     currentUser: response.user
   }, () => {
     localStorage.setItem("token", response.token)
     this.props.history.push(`/profile`)
   })
 }


  render() {
    return (
      <Fragment>
      <button onClick={this.logOut}>LogOut</button>
          <Router history={history}>
            <Route exact path ="/signup" component={CreateUserForm}/>
            <Route exact path ="/login" component={Login}/>
            <Route exact path ="/profile" component={UserProfile}/>
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
