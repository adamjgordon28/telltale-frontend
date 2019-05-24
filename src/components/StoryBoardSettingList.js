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
    <div className="ui raised card" style={{width: "20%", position: "absolute", left: "5%", top: "1em", minHeight:"38em" , maxHeight: "38em", overflowY: "scroll", display: "inline-block"}}>
    <h3 style={{textAlign:"center"}}>Settings</h3>
    {this.props.entry.settings && this.renderSettings()}
    </div>
  )
}
}

export default StoryBoardSettingList
