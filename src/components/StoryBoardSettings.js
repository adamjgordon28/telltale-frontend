import React, {Component} from 'react'
import SettingCard from './SettingCard.js'

class StoryBoardSettings extends Component {
  renderSettings = () => {
    let settingsArray = this.props.entry.settings.map((setting)=>{
      return <SettingCard setting={setting} key={Math.random()}/>
    })
    return settingsArray
  }
render () {
  return(
    <div className="ui raised card" style={{width: "35%", position: "relative", left: "10%", top: "1.5em", minHeight:"30em" , maxHeight: "30em", overflowY: "scroll", display: "inline-block"}}>
    <h3 style={{textAlign:"center"}}>Settings</h3>
    {this.renderSettings()}
    </div>
  )
}
}

export default StoryBoardSettings
