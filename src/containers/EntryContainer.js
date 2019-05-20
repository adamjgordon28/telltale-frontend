import React from 'react'
import { connect } from 'react-redux'
import history from "../history.js"


class EntryContainer extends React.Component {


  render(){
    if(this.props.currentUser === -1){
      history.push("/login")
    }
    return (
      <div>
      What's up?
      </div>
    )
  }




}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps) (EntryContainer)
