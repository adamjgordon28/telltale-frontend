import React, { Component, Fragment } from 'react';
import EntryCard from "../components/EntryCard.js";
import EntryEditor from "./EntryEditor.js";
// import UserEntryFilter from "./UserEntryFilter.js"
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import HOCWithAuth from '../components/HOCWithAuth.js';



class EntryContainer extends Component {

  state = {
    typeSearch: "",
    genreSearch: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  filterEntries = (array) => {
    let singleFilteredArray = array.filter((entry)=> {
      return entry.title.toLowerCase().includes(this.state.typeSearch.toLowerCase())
    })
    let fullFilteredArray = singleFilteredArray.filter((entry1)=> {
      return entry1.genre.includes(this.state.genreSearch)
    })
    return fullFilteredArray
  }



  renderEntryCards = () => {
    if (this.props.currentUser && this.props.currentUser.entries){
    let entryCardComponentArray = this.filterEntries(this.props.currentUser.entries).map((entry)=>{
      return <EntryCard key={Math.random()} entry={entry}/>
    })
    if (entryCardComponentArray.length){
    return entryCardComponentArray
    }
    else {
      return (<h1 style={{position: "absolute", textAlign: "center", left: "25%", top:"5em"}}>No entries meet these specifications. <Link to='/create-entry'>Create a new entry here</Link>!</h1>)
    }
  }
}

  render(){
    return (
     <Fragment>
      <Switch>
        <Route path='/entries/:id' render={(props)=> {
          return <EntryEditor {...props}/>}}>
        </Route>
        <Route path='/entries' render={()=><Fragment><div style={{ background:"lightgray", position:"relative", width:"100%", height:"3em", bottom:"1em"}}>
         <input style={{position:"absolute", right:"10%", top: "10%", width:"22.5%", height: "80%"}} placeholder="Search Your Entries..." value={this.state.search} onChange={this.handleChange} name="typeSearch"/>
         <select style={{position:"absolute", right: "35%",top: "10%", background:"white", color:"gray", height: "80%", width:"15%"}} onChange={this.handleChange} name = "genreSearch" >
                 <option label="Genre"></option>
                 <option value="adventure">Adventure</option>
                 <option value="comedy">Comedy</option>
                 <option value="drama">Drama</option>
                 <option value="fantasy">Fantasy</option>
                 <option value="historical-fiction">Historical Fiction</option>
                 <option value="horror">Horror</option>
                 <option value="mystery">Mystery</option>
                 <option value="non-fiction">Non-Fiction</option>
                 <option value="romance">Romance</option>
                 <option value="science-fiction">Science Fiction</option>
                 <option value="western">Western</option>
                 <option value="other">Other</option>
             </select>
             {this.renderEntryCards()}
           </div> </Fragment>} >
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

export default HOCWithAuth(connect(mapStateToProps)(EntryContainer))
