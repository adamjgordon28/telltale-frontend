const defaultState = {
  currentUser: null
}

  const usersReducer = (state=defaultState, action) => {
    switch(action.type){
      case 'SET_CURRENT_USER':
      //action.payload { username: 'Chandler Bing', bio: 'my user bio', age: 'age'}
      return {...state, currentUser: action.payload}
        default:
        return state
    }
  }

  export default usersReducer
