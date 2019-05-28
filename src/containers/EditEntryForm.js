import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../history.js'

class EditEntryForm extends Component {
  state = {
    title: "",
    genre: "",
    description: "",
    content: "",

  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
   this.updateEntry(this.state)
  }

  componentDidMount = () => {
    fetch("http://localhost:4000/api/v1/entries/".concat(`${this.props.match.params.id}`))
    .then(res=>res.json())
    .then(entry => {
      this.props.setCurrentEntry(entry)
      this.setState({
        title: entry.title,
        genre: entry.genre,
        description: entry.description,
        content: entry.content

      })
    })
  }


  updateEntry = (entry) => {
    fetch("http://localhost:4000/api/v1/entries/".concat(`${this.props.currentEntry.id}`),{
      method: "PATCH",
      headers: {
            'Content-Type': 'application/json'
        },
      body: JSON.stringify({
        title: entry.title,
        genre: entry.genre,
        description: entry.description,
        content: entry.content
      })
    })
    .then(res=>res.json())
    .then(newEntry => {
    this.props.updateEntryInfo(newEntry)
    })
    history.push(`/entries`)
  }


  render(){
    return (
      <div className="ui raised card" style={{width: "60%", position: "relative", left: "20%", padding:"5em"}}>
      <div className="ui attached message" style={{position: "relative", bottom: "3em", textAlign: "center"}}>
        <div className="header">
          <h2>Edit Your Story Details Here!</h2>
        </div>
      </div>

          <form onSubmit={this.handleSubmit}>
          <div className="ui form">
            <div className="required field">
              <label>Title</label>
              <input type="text" placeholder="Title" name="title" onChange={this.handleChange} value={this.state.title} required />
              </div>
              <div className="required field">
                  <label>Genre</label>
                  <select onChange={this.handleChange} name = "genre" value={this.state.genre} required >
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
              <textarea type="text" placeholder="Description" name="description" value={this.state.description} onChange={this.handleChange} required ></textarea>
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
    setCurrentEntry: (entry) => {
      dispatch({type: 'SET_CURRENT_ENTRY', payload: entry})
    },
    updateEntryInfo: (entry) => {
      dispatch({type: 'UPDATE_ENTRY_INFO', payload: entry})
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentEntry: state.currentEntry
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEntryForm)
