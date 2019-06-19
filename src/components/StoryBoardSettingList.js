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
      return <h3 style={{textAlign: "center", position: "relative", top: "5em"}}>No settings yet!</h3>
    }
  }
render () {
  return(
    <div className="ui raised card" style={{position:"relative", bottom:".5em",marginLeft:"5%", width: "20%", minHeight:"40.5em" , maxHeight: "40.5em", overflowY: "scroll", display: "inline-block"}}>
    <div style={{background:"silver", height:"5em"}}>
    <h2 style={{textAlign:"center", position:"relative", top:".75em"}}>Settings</h2>
    </div>
    {this.props.entry.settings && this.renderSettings()}
    </div>
  )
}
}

export default StoryBoardSettingList
