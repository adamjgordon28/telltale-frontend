import React, {Component, Fragment} from 'react'

class StoryBoardSettings extends Component {
  renderSettings = () => {
    let settingsArray = this.props.entry.settings.map((setting)=>{
      return <li key={Math.random()}><h4>{setting.name}</h4></li>
    })
    return settingsArray
  }
render () {
  return(
    <div className="ui raised card" style={{width: "35%", position: "relative", left: "10%", top: "1.5em", minHeight:"30em" , display: "inline-block"}}>
    <h3 style={{textAlign:"center"}}>Settings</h3>
    <ul>{this.renderSettings()}</ul>
    </div>
  )
}
}

export default StoryBoardSettings
