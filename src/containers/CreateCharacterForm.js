import React from 'react';

const user_id = 1
class CreateCharacterForm extends React.Component {

  state = {
    name: "",
    description: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
   this.createCharacter(this.state)
  }

  createCharacter = (info) => {
       fetch("http://localhost:4000/api/v1/characters", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accepts": "application/json" },
        body: JSON.stringify({name: info.name, description: info.description, entry_id: `${user_id}`})
       })
        .then(response => response.json())
        .then(json => {
          console.log(json)
        })
  }

  render(){
    return(
      <div>
      <h1>Let's Create Another Character for Your Story!</h1>
          <form className="ui" onSubmit = {this.handleSubmit}>


              <input type="text" placeholder="Name" name="name" onChange={this.handleChange}/>

              <input type="text" placeholder="Description" name="description" onChange={this.handleChange}/>
          <button class="ui button" type="submit">Submit</button>
        </form>
        </div>
    )
  }

}

export default CreateCharacterForm
