import React, { Component, Fragment } from 'react'
import EntryCard from "../components/EntryCard.js"
import EntryEditor from "./EntryEditor.js"
// import UserEntryFilter from "./UserEntryFilter.js"
import { Route, Switch, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import history from "../history.js"


class EntryContainer extends Component {


  renderEntryCards = () => {
    if (this.props.currentUser && this.props.currentUser.entries){
    let entryCardComponentArray = this.props.currentUser.entries.map((entry)=>{
      return <EntryCard key={Math.random()} entry={entry}/>
    })
    if (entryCardComponentArray.length){
    return entryCardComponentArray
    }
    else {
      return (<h1>You haven't written any entries yet! <Link to='/create-entry'>Create a new entry here</Link>!</h1>)
    }
  }
}

  render(){
    if(this.props.currentUser === -1){
      history.push("/login")
    }
    return (
     <Fragment>
      
      <Switch>
        <Route path='/entries/:id' render={(props)=> {
          return <EntryEditor {...props}/>}}>
        </Route>
        <Route path='/entries' render={()=> this.renderEntryCards()} >
        </Route>

      </Switch>
      </Fragment>
    )
  }




}





const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(EntryContainer)
