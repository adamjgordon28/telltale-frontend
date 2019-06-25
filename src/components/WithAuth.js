import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


function withAuth(MyComponent){

    class WithAuth extends React.Component{

      renderPage = () => {

            if (this.props.currentUser || !!localStorage.token){
          return <MyComponent {...this.props}/>
            } else {
            alert("HOC - you must be logged in to see this page!")
          return <Redirect to="/login" />
        }
      }

      render() {
        return (
          this.renderPage()
        )
      }
    }

    function mapStateToProps(state) {
      return {
        currentUser: state.currentUser,
      }
    }

    // function mapDispatchToProps(dispatch) {
    //   return {
    //     setCurrentUser: (currentUser) => {
    //       // dispatch is our new setState and it takes an object with a type and a payload
    //       dispatch({type: "SET_USER", payload: currentUser})
    //     }
    //   }
    // }

    return connect(mapStateToProps)(WithAuth)
}


export default withAuth
