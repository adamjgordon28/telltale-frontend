import React from 'react'
import EntryCard from "../components/EntryCard.js"
import { connect } from 'react-redux'
import history from "../history.js"


class EntryContainer extends React.Component {


  renderEntryCards = () => {
    if (this.props.currentUser && this.props.currentUser.entries){
    let entryCardComponentArray = this.props.currentUser.entries.map((entry)=>{
      return <EntryCard entry={entry}/>
    })
    return entryCardComponentArray
    }
  }

  render(){
    console.log(this.props.currentUser)
    if(this.props.currentUser === -1){
      history.push("/login")
    }
    return (
      <div>
      {this.renderEntryCards()}
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
