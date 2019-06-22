import React, { Component, Fragment} from 'react';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';



class NavBar extends Component {
  render(){
    let logged_in = this.props.currentUser && this.props.currentUser !== -1
    return (



  <div className="ui menu" >
    { logged_in && <Fragment>
      <Link to={"/create-entry"}>
        <div className = "item">
          <h3>Start a New Entry</h3>
        </div>
      </Link>
      <Link to="/entries">
        <div className="item">
          <h3>Your Entries</h3>
        </div>
      </Link>
      <Link to="/following-entries">
        <div className="item">
          <h3>Following Entries</h3>
        </div>
      </Link>
      <Link to="/total-entries">
        <div className="item">
          <h3>Other Entries</h3>
        </div>
      </Link>
      <Link to={`/profiles/${this.props.currentUser.id}`}>
        <div className="item">
          <h3>View Your Profile</h3>
        </div>
      </Link>
    </Fragment> }
    {this.props.currentUser === -1 || this.props.currentUser === null ?
      <Fragment><Link to="/signup"><div className="item"><h3>Sign Up</h3></div></Link><Link to="/login"><div className="item"><h3>Login</h3></div></Link></Fragment> :
      <Link to="/logout">
      <div className="item">
    <h3>Logout</h3>
      </div>
    </Link> }
    <Link to="/about"><div className="item"><h3>About</h3></div></Link>
    <Fragment><img alt="" src={'/icons/TellTaleLogo.png'} style={{height: "45px", position: "absolute", right: "3em"}}/></Fragment>
  </div>
    )
  }

}


const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(NavBar)
