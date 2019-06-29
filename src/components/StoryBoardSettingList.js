import React, {Component} from 'react'
import SettingCard from './SettingCard.js'

class StoryBoardSettingList extends Component {
  renderSettings = () => {
    let sortedArray = this.props.entry.settings.sort(function(a, b) {
  var nameA = a.name.toUpperCase();
  var nameB = b.name.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
  })

    let settingsArray = sortedArray.map((setting)=>{
      return <SettingCard setting={setting} key={Math.random()}/>
    })
    if (settingsArray.length){
      return settingsArray
    }
    else {
      return <h2 style={{textAlign: "center", position: "relative", top: "5em"}}>No settings yet!</h2>
    }
  }
render () {
  return(
    <div className="ui raised card" style={{position:"relative", bottom:".5em",marginLeft:"5%", width: "20%", minWidth:"19em", minHeight:"40.5em" , maxHeight: "40.5em", overflowY: "scroll", display: "inline-block"}}>
    <div style={{background:"silver", height:"5em"}}>
    <h2 style={{textAlign:"center", position:"relative", top:".75em"}}>Settings</h2>
    </div>
    {this.props.entry.settings && this.renderSettings()}
    </div>
  )
}
}

export default StoryBoardSettingList
