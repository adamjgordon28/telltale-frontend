import React, {Component} from 'react';
import PageCharacterSettingCard from '../components/PageCharacterSettingCard.js';




class CPCharacterSettingList extends Component {

    state = {
      chapter:""
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]:e.target.value
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
    let charSetArray = this.sortAndFilterCharacterSettings(this.props.character.character_settings).map((charSet) => {
      console.log("hello!")
      return <PageCharacterSettingCard key={Math.random()} charSet={charSet}/>
    })
    if (charSetArray.length){
    return charSetArray
    }
    else {
      return <h4 style={{textAlign:"center"}}>This character hasn't been detailed at any settings yet!</h4>
    }
  }
  render(){
    return (
      <div className="ui raised card" style={{width: "40%", position: "absolute", top:"15%", left:"55%", minHeight:"57.5%" , maxHeight: "57.5%", overflowY: "scroll", display: "inline-block"}}>
      <div style={{background:"silver"}}>
      <h3 style={{textAlign:"center"}}>Places This Character Has Been: </h3>
        <div className="ui search">
          <input className="prompt" style={{position: "relative", left:"35%", bottom:".75em"}} onChange={this.handleChange} name="chapter" value={this.state.chapter} type="number" placeholder="Search by Chapter..." min={0} />
        </div>
      </div>
      {this.renderCharacterSettings()}
      </div>
    )
  }
}

export default CPCharacterSettingList
