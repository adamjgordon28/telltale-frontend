import React from 'react';
import CreateUserForm from './containers/CreateUserForm.js'
import CreateCharacterForm from './containers/CreateCharacterForm.js'
import CreateSettingForm from './containers/CreateSettingForm.js'
import CreateEntryForm from './containers/CreateEntryForm.js'
import EntryEditor from './containers/EntryEditor.js'

class App extends React.Component {
  constructor(props) {
  super(props);
  this.state = {

  };
}


  render() {
    return (
    <div>
    <CreateSettingForm/>
    </div>
  )};

}

export default App;
