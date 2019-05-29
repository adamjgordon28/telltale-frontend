import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import history from '../history.js';


class Profile extends React.Component {


  unFollowAuthor = () => {
    let deletedFollow = this.props.profileUser.follows.find((follow)=> {
      return follow.following_id === this.props.currentUser.id
    })
    fetch("http://localhost:4000/api/v1/follows/"+ `${deletedFollow.id}`, {
    method: 'DELETE'
  })
  .then(res=>res.json())
  .then(follow => {
    this.props.removeFollowFromProfileUser(deletedFollow)
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
        })

}

renderProperFollowInfo = () => {
  if (this.props.profileUser.id !== this.props.currentUser.id && this.followingThisUser()){
    return (<div>
              <h3>Following this Author</h3>
              <button onClick={this.unFollowAuthor} className="ui button positive">Unfollow this Author</button>
            </div>)
  }
  else if (this.props.profileUser.id !== this.props.currentUser.id && !this.followingThisUser()){
    return (<div>
              <h3>Not Following this Author</h3>
              <button onClick={this.followAuthor} className="ui button positive">Follow this Author</button>
            </div>)
  }
}



  fetchAndSetUser = () => {
    fetch("http://localhost:4000/api/v1/users/".concat(`${this.props.match.params.id}`))
    .then(res=>res.json())
    .then(returnedUser => {
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
    if(this.props.currentUser === -1){
      history.push("/login")
    }
    if(!this.props.profileUser || !this.props.currentUser){
      return <h1>Loading...</h1>
    }
    return (
      <div>
       {this.props.profileUser.id === this.props.currentUser.id ? <h1>Welcome back {this.props.profileUser.name}</h1> : <h1>This is the profile of {this.props.profileUser.name}</h1> }
      {this.props.profileUser ? <div>
      <img style={{borderRadius: "50%", height: "12em"}} src={this.props.profileUser.img_url} alt=""/>
      <h3>User Name: {this.props.profileUser.username}</h3>
      <h3>Follows: {this.props.profileUser.follows.length}</h3></div>: null}

      <div>
      {this.renderProperFollowInfo()}
      </div>



      </div>
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
    }
  }
}


const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    profileUser: state.profileUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
