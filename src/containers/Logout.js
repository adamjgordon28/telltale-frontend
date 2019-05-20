import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import history from '../history';


class Logout extends React.Component {


  render(){
    return(
      <Fragment>
      {this.props.logOut()}
      </Fragment>
    )
  }

}



export default Logout
