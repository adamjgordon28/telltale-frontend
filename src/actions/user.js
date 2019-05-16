export const loginUser = (username, password) => {
  return (dispatch) => {
    dispatch({type: 'AUTHENTICATING_USER'})
    fetch("http://localhost:4000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password
        }
      })
    })
    .then(response => {
      if (response.ok){
        return response.json()
      }
      else {
        throw response
      }
    })
    .then(json => {
      console.log('%c INSIDE YE OLDE .THEN', 'color: navy')
      localStorage.setItem('jwt', json.jwt)//the magic place to keep our token
      dispatch({ type: "SET_CURRENT_USER", payload: json.user})
    })
    .catch(r => r.json().then(e=>dispatch({type: "FAILED_LOGIN", payload: e.message})))
  }
}

export const fetchCurrentUser = () => {
  // takes the token in localStorage and finds out who it belongs to
  return (dispatch) => {
    dispatch(authenticatingUser()) //tells the app we are fetching
    fetch("http://localhost:4000/api/v1/profile", {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(response => response.json())
      .then((json) => dispatch(setCurrentUser(json.user)))
  }
}

export const setCurrentUser = (userData) => ({
  type: 'SET_CURRENT_USER',
  payload: userData
})

export const failedLogin = (errorMsg) => ({
  type: 'FAILED_LOGIN',
  payload: errorMsg
})

// tell our app we're currently fetching
export const authenticatingUser = () => ({ type: 'AUTHENTICATING_USER' })
// export const authenticatingUser = () => {
//   return { type: 'AUTHENTICATING_USER' }
// }
