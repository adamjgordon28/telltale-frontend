import React, {Component} from 'react'
import SettingCard from './SettingCard.js'

class StoryBoardSettingList extends Component {
  renderSettings = () => {
    let settingsArray = this.props.entry.settings.map((setting)=>{
      return <SettingCard setting={setting} key={Math.random()}/>
    })
    if (settingsArray.length){
      return settingsArray
    }
    else {
      return <h1 style={{position: "absolute", left: "12.5%", top: "15%"}}>No settings yet!</h1>
    }
  }
render () {
  return(
    <div className="ui raised card" style={{width: "20%", position: "absolute", left: "5%", top: "1em", minHeight:"41em" , maxHeight: "41em", overflowY: "scroll", display: "inline-block"}}>
    <div style={{background:"silver", height:"5em"}}>
    <h2 style={{textAlign:"center", position:"relative", top:".75em"}}>Settings</h2>
    </div>
    {this.props.entry.settings && this.renderSettings()}
    </div>
  )
}
}

export default StoryBoardSettingList
