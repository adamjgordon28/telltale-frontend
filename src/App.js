import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Router } from 'react-router-dom'
import history from './history'
import CreateUserForm from './containers/CreateUserForm.js'
import Login from './containers/Login.js'
import Profile from './containers/Profile.js'
import CreateEntryForm from './containers/CreateEntryForm.js'
import NavBar from './containers/NavBar.js'
import Logout from './containers/Logout.js'
import EntryContainer from './containers/EntryContainer.js'
import StoryBoard from './components/StoryBoard.js'
import AddInfoToStoryContainer from './containers/AddInfoToStoryContainer.js'
import SettingPage from './containers/SettingPage.js'
import CharacterPage from './containers/CharacterPage.js'
import EditCharacterSettingForm from './containers/EditCharacterSettingForm.js'
import EditCharacterForm from './containers/EditCharacterForm.js'
import EditSettingForm from './containers/EditSettingForm.js'
import EditEntryForm from './containers/EditEntryForm.js'
import TotalEntryContainer from './containers/TotalEntryContainer.js'
import FollowingEntryContainer from './containers/FollowingEntryContainer.js'
import About from './components/About.js'
import EditUserForm from './containers/EditUserForm.js'

class App extends Component {
    logOut = () => {
        localStorage.removeItem('token')
        this.props.setCurrentUser(-1)
        this.props.setCurrentEntry(null)
        history.push('/login')
    }

    componentDidMount() {
        const token = localStorage.getItem('token')

        if (token) {
            fetch(
                `${process.env.REACT_APP_BASE_URL}`.concat(
                    '/api/v1/auto_login'
                ),
                {
                    headers: {
                        Authorization: token,
                    },
                }
            )
                .then((res) => res.json())
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
            <div style={{ minWidth: '100em' }}>
                <Router history={history}>
                    <NavBar />
                    <Route
                        exact
                        path="/"
                        render={(routeProps) => <About {...routeProps} />}
                    />
                    <Route
                        exact
                        path="/signup"
                        render={(routeProps) => (
                            <CreateUserForm {...routeProps} />
                        )}
                    />
                    <Route
                        exact
                        path="/login"
                        render={(routeProps) => <Login {...routeProps} />}
                    />
                    <Route
                        path="/profiles/:id"
                        render={(routeProps) => (
                            <Profile logOut={this.logOut} {...routeProps} />
                        )}
                    />
                    <Route
                        exact
                        path="/create-entry"
                        render={(routeProps) => (
                            <CreateEntryForm {...routeProps} />
                        )}
                    />
                    <Route
                        exact
                        path="/logout"
                        render={(routeProps) => (
                            <Logout logOut={this.logOut} {...routeProps} />
                        )}
                    />
                    <Route path="/entries" component={EntryContainer} />
                    <Route
                        path="/storyboards/:id"
                        render={(props) => {
                            return <StoryBoard {...props} />
                        }}
                    ></Route>
                    <Route
                        path="/add-entry-info/:id"
                        render={(props) => {
                            return <AddInfoToStoryContainer {...props} />
                        }}
                    ></Route>
                    <Route
                        path="/settings/:id"
                        render={(props) => {
                            return <SettingPage {...props} />
                        }}
                    ></Route>
                    <Route
                        path="/characters/:id"
                        render={(props) => {
                            return <CharacterPage {...props} />
                        }}
                    ></Route>
                    <Route
                        path="/edit-entry/:id"
                        render={(props) => {
                            return <EditEntryForm {...props} />
                        }}
                    ></Route>
                    <Route
                        path="/edit-character/:id"
                        render={(props) => {
                            return <EditCharacterForm {...props} />
                        }}
                    ></Route>
                    <Route
                        path="/edit-setting/:id"
                        render={(props) => {
                            return <EditSettingForm {...props} />
                        }}
                    ></Route>
                    <Route
                        path="/edit-character-setting/:id"
                        render={(props) => {
                            return <EditCharacterSettingForm {...props} />
                        }}
                    ></Route>
                    <Route
                        path="/total-entries"
                        render={(props) => {
                            return <TotalEntryContainer {...props} />
                        }}
                    ></Route>
                    <Route
                        path="/following-entries"
                        render={(props) => {
                            return <FollowingEntryContainer {...props} />
                        }}
                    ></Route>
                    <Route
                        path="/about"
                        render={(props) => {
                            return <About {...props} />
                        }}
                    ></Route>
                    <Route
                        path="/edit-user/:id"
                        render={(props) => {
                            return <EditUserForm {...props} />
                        }}
                    ></Route>
                </Router>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentUser: (user) => {
            dispatch({ type: 'SET_CURRENT_USER', payload: user })
        },
        setCurrentEntry: (entry) => {
            dispatch({ type: 'SET_CURRENT_ENTRY', payload: entry })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
