import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import history from '../history.js';
import HOCWithAuth from '../components/HOCWithAuth.js';
import { Link } from 'react-router-dom';


class Profile extends Component {


  unFollowAuthor = () => {
    let deletedFollow = this.props.profileUser.follows.find((follow)=> {
      return follow.following_id === this.props.currentUser.id
    })
    fetch("http://localhost:4000/api/v1/follows/".concat( `${deletedFollow.id}`), {
    method: 'DELETE'
  })
  .then(res=>res.json())
  .then(follow => {
    this.props.removeFollowFromProfileUser(deletedFollow)
    this.props.removeFollowingFromCurrentUser(deletedFollow)
  })
}





followingThisUser = () => {
  let followArray = this.props.profileUser.follows.filter((follow)=> {
  return  follow.following_id === this.props.currentUser.id

  })
  return followArray.length > 0
}

followAuthor = () => {
       fetch("http://localhost:4000/api/v1/follows", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accepts": "application/json" },
        body: JSON.stringify({user_id: this.props.profileUser.id, following_id: this.props.currentUser.id })
       })
        .then(response => response.json())
        .then(follow => {
          this.props.addFollowToProfileUser(follow)
          this.props.addFollowingToCurrentUser(follow)
        })

}

renderProperFollowInfo = () => {
  if (this.props.profileUser.id !== this.props.currentUser.id && this.followingThisUser()){
    return (<div>
              <h3>You are Following this Author</h3>
              <button onClick={this.unFollowAuthor} className="ui button positive">Unfollow this Author</button>
            </div>)
  }
  else if (this.props.profileUser.id !== this.props.currentUser.id && !this.followingThisUser()){
    return (<div>
              <h3>You are Not Following this Author</h3>
              <button onClick={this.followAuthor} className="ui button positive">Follow this Author</button>
            </div>)
  }
}



  fetchAndSetUser = () => {
    fetch("http://localhost:4000/api/v1/users/".concat(`${this.props.match.params.id}`))
    .then(res=>res.json())
    .then(returnedUser => {
      if(returnedUser.status===404){
        alert("This is not a valid user.")
        history.push('/about')
      }
      this.props.setProfileUser(returnedUser)
    })
  }

  componentDidMount = () => {

    this.fetchAndSetUser()
  }

  componentDidUpdate = (prevProps) => {
  if (this.props.match.params.id !== prevProps.match.params.id) {
    this.fetchAndSetUser()
  }

}

  render(){
    if(!this.props.profileUser || !this.props.currentUser){
      return <h1>Loading...</h1>
    }
    return (
    <Fragment>
      <div>
       {this.props.profileUser.id === this.props.currentUser.id ? <h1>Welcome back, {this.props.profileUser.username}!</h1> : <h1> {this.props.profileUser.username}'s Profile</h1> }
      {this.props.profileUser ?<Fragment> <div style={{textAlign:"center"}}>
      <img style={{border:".25em silver solid", borderRadius: "50%", height: "8.25em", margin:"0 auto"}} src={this.props.profileUser.img_url} alt=""/>
      <div className="ui raised card" style={{position:"relative", width: "30%", minWidth:"24em", height: "25em", left:"35%"}}>
      <div className="extra content" style={{color:"black"}}>
      <h3 style={{textAlign:"center"}}> {this.props.profileUser.name}</h3>
      </div>
      <div className="extra content" style={{color:"black"}}>
      <h3 style={{textAlign:"center"}}> {this.props.profileUser.age} Years Old</h3>
      </div>
      <div className="extra content" style={{color:"black"}}>
      <h3 style={{textAlign:"center"}}> {this.props.profileUser.location} </h3>
      </div>
      <div className="extra content" style={{color:"black"}}>
      <h3 style={{textAlign:"center"}}> Number of Entries: {this.props.profileUser.entries.length} </h3>
      </div>
      <div className="extra content" style={{color:"black", maxHeight:"7.5em", minHeight:"7.5em", height:"7.5em", width:"100%", maxWidth: "100%", overflowWrap:"break-word", overflowY:"scroll"}}>
      <h3 style={{textAlign:"center", color:"black"}}>Bio: </h3>{} {this.props.profileUser.bio}
      </div>


      <div className="extra content" style={{color:"black"}}>
      <h3>Followers: {this.props.profileUser.follows.length}</h3>
      <div>
      <div className="extra content" style={{color:"black"}}>
      <h3>Following: {this.props.profileUser.followings.length}</h3>
      </div>
      </div>
      </div>
      </div>

          <div>
          {this.renderProperFollowInfo()}
          </div></div></Fragment>: null}

      </div>
      {this.props.profileUser.id === this.props.currentUser.id ? <Link to={`/edit-user/${this.props.currentUser.id}`}><button style={{position:"relative", left:"45%", top:"1.25em"}} className="positive ui button">Edit Account Info</button></Link> : null}
    </Fragment>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setProfileUser: (user) => {
      dispatch({type:'SET_PROFILE_USER', payload: user})
    },
    addFollowToProfileUser: (follow) => {
      dispatch({type:'ADD_FOLLOW_TO_PROFILE_USER', payload: follow})
    },
    removeFollowFromProfileUser: (follow) => {

      dispatch({type:'REMOVE_FOLLOW_FROM_PROFILE_USER', payload:follow})

      dispatch({type:'REMOVE_FOLLOW_FROM_PROFILE_USER', payload: follow})
    },
    addFollowingToCurrentUser: (following) => {
      dispatch({type:'ADD_FOLLOWING_TO_CURRENT_USER',
      payload: following})
    },
    removeFollowingFromCurrentUser: (following) => {
      dispatch({type: 'REMOVE_FOLLOWING_FROM_CURRENT_USER', payload:following})
    }
  }
}



const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    profileUser: state.profileUser,
    currentEntry: state.currentEntry
  }
}


export default HOCWithAuth(connect(mapStateToProps, mapDispatchToProps)(Profile))
