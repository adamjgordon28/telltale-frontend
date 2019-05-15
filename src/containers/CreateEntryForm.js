import React from 'react';

const user_id =1;
const emptyContent = "{\"blocks\":[{\"key\":\"dpilv\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}"
class CreateEntryForm extends React.Component {



  state = {
    title: "",
    description: "",
    genre: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    },()=> {
      console.log(this.state)
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
   this.createEntry(this.state)
  }

  createEntry = (info) => {
       fetch("http://localhost:4000/api/v1/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accepts": "application/json" },
        body: JSON.stringify({title: info.title, description: info.description, genre: info.genre, content: emptyContent, user_id: `${user_id}`})
       })
        .then(response => response.json())
        .then(json => {
          console.log(json)
        })
  }

  render(){
    return(
      <form className="ui" onSubmit = {this.handleSubmit}>
        <h1>Create a New Entry!</h1>
        <div  className="ui form">
          <div class="fields">
            <div class="field">
              <label>Title</label>
              <input type="text" placeholder="Title" name="title" onChange={this.handleChange}/>
            </div>
            <div class="field">
              <label>Brief Description</label>
              <input type="text" placeholder="Brief Description" name="description" onChange={this.handleChange}/>
            </div>
            <div class="field">
              <label>Genre</label>
              <input type="text" placeholder="Genre" name="genre" onChange={this.handleChange}/>
            </div>
            </div>
          </div>
          <button class="ui button" type="submit">Submit</button>
        </form>
    )
  }

}

export default CreateEntryForm
