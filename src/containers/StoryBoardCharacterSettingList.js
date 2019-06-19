import React, { Component } from 'react';
import StoryBoardCharacterSettingCard from '../components/StoryBoardCharacterSettingCard.js'


class StoryBoardCharacterSettingList extends Component {

  state = {
    chapter: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


 sortAndFilterCharacterSettings = (array) => {
   let sortedArray = array.sort((a,b) => {
     return a.chapter - b.chapter
   })
   let filteredArray = sortedArray.filter((charSet)=> {
    return charSet.chapter.toString() === this.state.chapter.toString()
   })
   if(!!this.state.chapter) {
     return filteredArray
   }
   else {
     return sortedArray
   }
 }
  renderCharacterSettings = () => {


    let charSetArray = this.sortAndFilterCharacterSettings(this.props.entry.character_settings).map((charSet)=> {
      return <StoryBoardCharacterSettingCard key={Math.random()} entry={this.props.entry} charSet={charSet}/>
    })
    if (charSetArray.length){
      return charSetArray
    }
    else {
    }
  }
  render(){
    return(
      <div className="ui raised card" style={{position:"relative", marginLeft:"5%", bottom:"1.5em", width: "40%", minHeight:"40.5em" , maxHeight: "40.5em", overflowY: "scroll", display: "inline-block"}}>
      <div style={{background:"silver", height:"5em"}}>
      <h3 style={{textAlign:"center", position:"absolute", top:"4.5%", left:"5%"}}>Notes on Characters in Settings</h3>
        <div className="ui search">
          <input className="prompt" style={{position: "relative", left:"52.5%", top:"1.25em", width:"38.5%"}} onChange={this.handleChange} name="chapter" value={this.state.chapter} type="number" placeholder="Search by Chapter..." min={0} />
        </div>
      </div>
      {this.props.entry.character_settings && this.renderCharacterSettings()}
      </div>
    )
  }
}


export default StoryBoardCharacterSettingList
