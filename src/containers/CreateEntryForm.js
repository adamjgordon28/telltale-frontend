import React from 'react';
import { connect } from 'react-redux';
import history from "../history.js";
import HOCWithAuth from '../components/HOCWithAuth.js';


const emptyContent = "{\"blocks\":[{\"key\":\"dpilv\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}"
class CreateEntryForm extends React.Component {



  state = {
    title: "",
    genre: "",
    description: ""

  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
   this.createEntry(this.state)
  }

  createEntry = (info) => {
       fetch(`${process.env.REACT_APP_BASE_URL}`.concat("/api/v1/entries"), {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accepts": "application/json" },
        body: JSON.stringify({title: info.title, description: info.description, genre: info.genre, content: emptyContent, user_id: `${this.props.currentUser.id}`, published:false})
       })
        .then(response => response.json())
        .then(json => {
          this.props.addPostToUser(json)
          history.push(`/entries/${json.id}`)
        })
  }

  render(){
    return(
      <div className="ui raised card" style={{width: "36%", minWidth:"40em", position: "relative", left: "32%", padding:"5em", height: "50em"}}>
      <div className="ui attached message" style={{position: "relative", bottom: "3em", textAlign: "center"}}>
        <div className="header">
        <img style={{height:"5em", background: "white", border:".125em solid gray", borderRadius:"1.25em", position: "relative", top: ".75em"}} alt="" src='./icons/Other-2.png'/>
          <h2>Start Working on Your New Masterpiece Today!</h2>
        </div>
      </div>

          <form onSubmit={this.handleSubmit}>
          <div className="ui form">
            <div className="required field">
              <label>Title</label>
              <input type="text" placeholder="Title" name="title" onChange={this.handleChange} required />
              </div>
              <div className="required field">
                  <label>Genre</label>
                  <select onChange={this.handleChange} name = "genre" required >
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
              </div>
              <div className="required field">
              <label>Description</label>
              <textarea type="text" placeholder="Description" name="description" onChange={this.handleChange} required ></textarea>
              </div>
          <button className="ui button" style={{position:"relative", left: "42.5%", top: "1.5em"}} type="submit">Submit</button>
        </div>
        </form>
      </div>
    )
  }

}

function mapDispatchToProps(dispatch) {
  return {
    addPostToUser: (entry) => {
      dispatch({type: "ADD_POST_TO_USER", payload: entry})
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default HOCWithAuth(connect(mapStateToProps, mapDispatchToProps)(CreateEntryForm))
