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
      return <StoryBoardCharacterSettingCard key={Math.random()} charSet={charSet}/>
    })
    if (charSetArray.length){
      return charSetArray
    }
    else {
      return <h1 style={{position: "absolute", left: "12.5%", top: "15%"}}>No notes meet these specifications!</h1>
    }
  }
  render(){
    return(
      <div className="ui raised card" style={{width: "40%", position: "absolute", left:"55%", minHeight:"41.25em" , maxHeight: "41.25em", overflowY: "scroll", display: "inline-block"}}>
      <div style={{background:"silver"}}>
      <h3 style={{textAlign:"center"}}>Notes on Characters in Settings</h3>
        <div className="ui search">
          <input className="prompt" style={{position: "relative", left:"35%", bottom:".75em"}} onChange={this.handleChange} name="chapter" value={this.state.chapter} type="number" placeholder="Search by Chapter..." min={0} />
        </div>
      </div>
      {this.props.entry.character_settings && this.renderCharacterSettings()}
      </div>
    )
  }
}


export default StoryBoardCharacterSettingList
