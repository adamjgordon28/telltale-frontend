import React from 'react'
import EntryCard from "../components/EntryCard.js"
import EntryEditor from "./EntryEditor.js"
import { Route, Switch  } from 'react-router-dom'
import { connect } from 'react-redux'
import history from "../history.js"


class EntryContainer extends React.Component {


  renderEntryCards = () => {
    if (this.props.currentUser && this.props.currentUser.entries){
    let entryCardComponentArray = this.props.currentUser.entries.map((entry)=>{
      return <EntryCard key={Math.random()} entry={entry}/>
    })
    return entryCardComponentArray
    }
  }

  render(){
    if(this.props.currentUser === -1){
      history.push("/login")
    }
    return (

      <Switch>
        <Route path='/entries/:id' render={(props)=> {
          return <EntryEditor {...props}/>}}>
        </Route>
        <Route path='/entries' render={()=> this.renderEntryCards()} >
        </Route>

      </Switch>
    )
  }




}





const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(EntryContainer)
