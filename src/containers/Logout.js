import React, { Fragment } from 'react';


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
