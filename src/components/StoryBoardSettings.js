import React, {Component, Fragment} from 'react'

class StoryBoardSettings extends Component {
  renderSettings = () => {
    let settingsArray = this.props.entry.settings.map((setting)=>{
      return <li key={Math.random()}>{setting.name}</li>
    })
    return settingsArray
  }
render () {
  return(
    <Fragment>
    <div>These are the Settings!</div>
    <ul>{this.renderSettings()}</ul>
    </Fragment>
  )
}
}

export default StoryBoardSettings
