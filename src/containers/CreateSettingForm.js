import React from 'react';

const user_id = 1
class CreateSettingForm extends React.Component {

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
   this.createSetting(this.state)
  }

  createSetting = (info) => {
       fetch("http://localhost:4000/api/v1/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accepts": "application/json" },
        body: JSON.stringify({name: info.name, description: info.description, entry_id: `${user_id}`})
       })
        .then(response => response.json())
        .then(json => {
      
        })
  }

  render(){
    return(
      <div>
       <h1>Add a New Setting</h1>
          <form onSubmit={this.handleSubmit}>
          <div className="ui form" >
            <div className="field">
              <label>Name</label>
              <input type="text" placeholder="Name" name="name" onChange={this.handleChange} required />
              </div>
              <div className="field">
              <label>Description</label>
              <textarea type="text" placeholder="Description" name="description" onChange={this.handleChange} required ></textarea>
              </div>
          <button className="ui button" style={{position:"relative", left: "8.5em", top: "1.5em"}} type="submit">Submit</button>
        </div>
        </form>
      </div>
    )
  }

}

export default CreateSettingForm
