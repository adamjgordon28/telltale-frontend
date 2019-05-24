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
      return <h1>No settings yet!</h1>
    }
  }
render () {
  return(
    <div className="ui raised card" style={{width: "28%", position: "absolute", left: "4%", top: "1em", minHeight:"30em" , maxHeight: "30em", overflowY: "scroll", display: "inline-block"}}>
    <h3 style={{textAlign:"center"}}>Settings</h3>
    {this.props.entry.settings && this.renderSettings()}
    </div>
  )
}
}

export default StoryBoardSettingList
