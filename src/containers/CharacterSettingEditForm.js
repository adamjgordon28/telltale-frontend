import React, { Component } from 'react';
import {connect} from 'react-redux';



class CharacterSettingEditForm extends Component {

  componentDidMount = () => {
    fetch("http://localhost:4000/api/v1/character_settings/".concat(`${this.props.match.params.id}`))
    .then(res=>res.json())
    .then(json=>{
      console.log(json)
    })

  }


    handleSubmit = (e) => {
      console.log("Hello!")
    }

    onChange = (e) => {
      console.log("What's up?")
    }



  render(){
    return(
      <div>
      <h1>Edit This Character-Setting!</h1>
      {/*<form className="ui form" onSubmit={this.handleSubmit}>
        <select onChange={this.handleChange} className="ui dropdown" value={this.state.setting_id} name="setting_id" required>
        <option label="Select a Setting!"></option>
          {this.renderRows()}
        </select>
        <label>Chapter</label>
        <input onChange={this.handleChange} type="number" name="chapter" value={this.state.chapter} min={0} placeholder="Chapter" required/>
        <div className ="field">
          <label>Description</label>
          <textarea onChange={this.handleChange} name="description" placeholder="Description" value={this.state.description} required ></textarea >
        </div>
        <button className="ui button" type="submit">Submit</button>
      </form>*/}
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentEntry: state.currentEntry
  }
}


export default connect(mapStateToProps)(CharacterSettingEditForm)
