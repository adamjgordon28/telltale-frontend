import React, { Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import CreateUserForm from './containers/CreateUserForm.js'
import Login from './containers/Login.js'
import CreateCharacterForm from './containers/CreateCharacterForm.js'
import CreateSettingForm from './containers/CreateSettingForm.js'
import AddInfoToStoryContainer from './containers/AddInfoToStoryContainer.js'
import CreateEntryForm from './containers/CreateEntryForm.js'
import EntryEditor from './containers/EntryEditor.js'

class App extends React.Component {
  constructor(props) {
  super(props);
  this.state = {

  };
}


  render() {
    console.log("%c APP Props: ", "color: firebrick", this.props)
    return (
      <Fragment>
        <Switch>
          <Route exact path ="/signup" component={CreateUserForm}/>
          <Route exact path ="/login" component={Login}/>
        </Switch>
      </Fragment>
  )};

}

export default App;
