import React from 'react';
import CreateCharacterForm from './CreateCharacterForm.js'
import CreateSettingForm from './CreateSettingForm.js'
import history from "../history.js"
import { connect } from 'react-redux';

class AddInfoToStoryContainer extends React.Component {
  constructor(props) {
  super(props);
  this.state = {

  };
}

componentDidMount = () => {
 fetch("http://localhost:4000/api/v1/entries/".concat(`${this.props.match.params.id}`))
  .then(response => response.json())
  .then(json => {
    this.props.setCurrentEntry(json)
  })
}


  render() {
    if(this.props.currentUser === -1){
      history.push("/login")
    }
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
  <div className="ui attached message">
    <div className="header">
      <h1 style={{fontSize: "3em"}}>Add Info To Your Story!</h1>
    </div>
  </div>
  <div className="content"  style={{width:"40%",  position:"relative", left: "5%", top: ".5em"}}>
  <CreateSettingForm/>
  </div>
  <div className="content" style={{width:"40%", float: "right", position:"relative", left: "55%", bottom: "27.5em"}} className="content">
  <CreateCharacterForm/>
  <button style={{width: "14em", fontSize:"1.5em", background: "lightgreen", position:"relative",top: "2.5em", left: "2.5em"}} className="ui right labeled icon button">
  <i className="right arrow icon"></i>
  Return to Writing
</button>
  </div>
    </div>
  )};

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentEntry: (entry) => {

      dispatch({type: "SET_CURRENT_ENTRY", payload: entry})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddInfoToStoryContainer)
