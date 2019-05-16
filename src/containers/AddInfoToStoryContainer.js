import React from 'react';
import CreateCharacterForm from './CreateCharacterForm.js'
import CreateSettingForm from './CreateSettingForm.js'

class AddInfoToStoryContainer extends React.Component {
  constructor(props) {
  super(props);
  this.state = {

  };
}


  render() {
    return (

  <div className="ui raised card"style={{ width: "80%", position: "relative", left: "10%"}} >
  <div className="ui inverted segment">
  <div  className="ui inverted secondary menu">
    <a className="item">
      <h3>Edit Story Info</h3>
    </a>
    <a className="item">
      <h3>See Storyboard</h3>
    </a>
    <a className="item">
      <h3>Browse Your Feed</h3>
    </a>
  </div>
</div>
  <div class="ui attached message">
    <div class="header">
      <h1 style={{fontSize: "3em"}}>Add Info To Your Story!</h1>
    </div>
  </div>
  <div className="content"  style={{width:"40%",  position:"relative", left: "5%", top: ".5em"}}>
  <CreateSettingForm/>
  </div>
  <div className="content" style={{width:"40%", float: "right", position:"relative", left: "55%", bottom: "27.5em"}} class="content">
  <CreateCharacterForm/>
  <button style={{width: "14em", fontSize:"1.5em", background: "lightgreen", position:"relative",top: "2.5em", left: "2.5em"}} class="ui right labeled icon button">
  <i class="right arrow icon"></i>
  Return to Writing
</button>
  </div>
    </div>
  )};

}

export default AddInfoToStoryContainer;
