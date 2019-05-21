import React, { Component } from 'react'


class StoryBoard extends Component {

  state = {
    entry: null
  }

  componentDidMount = () => {
   fetch("http://localhost:4000/api/v1/entries/".concat(`${this.props.match.params.id}`))
    .then(response => response.json())
    .then(json => {
      this.setState({
        entry: json
      })
    })
  }

 render() {
   if (!this.state.entry){
     return <h3>Loading...</h3>
   }
   return (
     <div>This is the tale of {this.state.entry.title}</div>
   )
 }
}


export default StoryBoard
