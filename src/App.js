import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Router, Switch, Redirect, withRouter } from 'react-router-dom'
import history from './history';
import CreateUserForm from './containers/CreateUserForm.js'
import Login from './containers/Login.js'
import UserProfile from './containers/UserProfile.js'
import CreateCharacterForm from './containers/CreateCharacterForm.js'
import CreateSettingForm from './containers/CreateSettingForm.js'
import AddInfoToStoryContainer from './containers/AddInfoToStoryContainer.js'
import CreateEntryForm from './containers/CreateEntryForm.js'
import EntryEditor from './containers/EntryEditor.js'

class App extends React.Component {

  logOut = () => {
    localStorage.removeItem("token")
    this.props.setCurrentUser({currentUser: null})
    history.push('/login')
  }

  componentDidMount() {
    const token = localStorage.getItem("token")

    if (token) {
      console.log("Hello!")
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
    console.log(this.props)
    return (
      <Fragment>
      <button onClick={this.logOut}>LogOut</button>
          <Router history={history}/>
            <Route exact path ="/signup" component={CreateUserForm}/>
            <Route exact path ="/login" component={Login}/>
            <Route exact path ="/profile" component={UserProfile}/>
          <Router history={history}/>
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
