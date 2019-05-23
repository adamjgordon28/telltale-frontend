import React, { Fragment, Component} from 'react';
import { connect } from 'react-redux';
import { Route, Router } from 'react-router-dom'
import history from './history';
import CreateUserForm from './containers/CreateUserForm.js';
import Login from './containers/Login.js';
import UserProfile from './containers/UserProfile.js';
import CreateEntryForm from './containers/CreateEntryForm.js';
import NavBar from './containers/NavBar.js';
import Logout from './containers/Logout.js';
import EntryContainer from './containers/EntryContainer.js';
import StoryBoard from './components/StoryBoard.js';
import AddInfoToStoryContainer from './containers/AddInfoToStoryContainer.js';
import SettingPage from './containers/SettingPage.js';
import CharacterPage from './containers/CharacterPage.js';
import EditCharacterSettingForm from './containers/EditCharacterSettingForm.js';
import EditCharacterForm from './containers/EditCharacterForm.js';

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



  render() {
    return (
      <Fragment>

          <Router history={history}>
            <NavBar/>
            <Route exact path ="/signup" render = {(routeProps) => <CreateUserForm {...routeProps}/>}/>
            <Route exact path ="/login" render = {(routeProps) => <Login {...routeProps}/>}/>
            <Route exact path ="/profile" render = {(routeProps) => <UserProfile logOut={this.logOut}{...routeProps}/>}/>
            <Route exact path ="/create-entry" render = {(routeProps) => <CreateEntryForm {...routeProps}/>}/>
            <Route exact path ="/logout" render = {(routeProps) => <Logout logOut = {this.logOut} {...routeProps}/>}/>
            <Route path ="/entries" component={EntryContainer}/>
            <Route exact path ="/" render = {(routeProps) => <CreateEntryForm {...routeProps}/>}/>
            <Route path='/storyboards/:id' render={(props)=> {
              return <StoryBoard {...props}/>}}>
            </Route>
            <Route path='/add-entry-info/:id' render={(props)=> {
              return <AddInfoToStoryContainer {...props}/>}}>
            </Route>
            <Route path='/settings/:id' render={(props)=> {
              return <SettingPage {...props}/>}}>
            </Route>
            <Route path='/characters/:id' render={(props)=> {
              return <CharacterPage {...props}/>}}>
            </Route>
            <Route path='/edit-character/:id' render={(props)=> {
              return <EditCharacterForm{...props}/>}}>
            </Route>
            <Route path='/character-setting-edit/:id' render={(props)=> {
              return <EditCharacterSettingForm{...props}/>}}>
            </Route>
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


      dispatch({type: "SET_CURRENT_USER", payload: user})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
