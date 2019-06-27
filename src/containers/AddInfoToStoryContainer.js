import React from 'react';
import{ Link } from 'react-router-dom';
import CreateCharacterForm from './CreateCharacterForm.js'
import CreateSettingForm from './CreateSettingForm.js'
import history from "../history.js";
import { connect } from 'react-redux';
import HOCWithAuth from '../components/HOCWithAuth.js';

class AddInfoToStoryContainer extends React.Component {


componentDidMount = () => {
 fetch("http://localhost:4000/api/v1/entries/".concat(`${this.props.match.params.id}`))
  .then(response => response.json())
  .then(json => {
    if(json.status===404){
      alert("This is not a valid entry.")
      history.push('/about')
    }
    this.props.setCurrentEntry(json)
  })
}


  render() {
    if(!this.props.currentUser|| !this.props.currentEntry){
      return <h1>Loading...</h1>
    }
    else if(this.props.currentUser &&  this.props.currentEntry.user) {
      if(this.props.currentUser.id!== this.props.currentEntry.user.id){
      alert("You do not have access to this page!")
      this.props.setCurrentEntry(null)
      history.push(`/about`)
      return null
      }
      else {
        return (

  <div className="ui raised card"style={{ width: "80%", minWidth:"80em", position: "relative", left: "10%"}} >


  <div className="ui attached message">
    <div className="header">
      <h1 style={{fontSize: "3em"}}>Add Info To "{this.props.currentEntry.title}"!</h1>
    </div>
  </div>
  <div className="content"  style={{width:"40%",  position:"relative", left: "5%", top: ".5em"}}>
  <CreateSettingForm/>
  </div>
  <div className="content" style={{width:"40%", float: "right", position:"relative", left: "55%", bottom: "27.5em"}}>
  <CreateCharacterForm/>
  <div className="button-div" style={{display: "inline-block"}}>
  <Link to={`/entries/${this.props.currentEntry.id}`}><button style={{width: "12em", position:"absolute", left: "50%",  bottom:"-20%", padding:"2%"}} className="ui button positive">
  Return to Writing
</button></Link>
<Link to={`/storyboards/${this.props.currentEntry.id}`}><button style={{width: "12em", position:"absolute", bottom:"-20%", padding:"2%"}} className="ui button blue">
Return to StoryBoard
</button></Link>

</div>
  </div>
    </div>
        )
      }
    }
  else {
    return null
  }
  };

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentEntry: state.currentEntry
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentEntry: (entry) => {

      dispatch({type: "SET_CURRENT_ENTRY", payload: entry})
    }
  }
}

export default HOCWithAuth(connect(mapStateToProps, mapDispatchToProps)(AddInfoToStoryContainer))
