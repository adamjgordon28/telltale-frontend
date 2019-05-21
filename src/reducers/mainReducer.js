const defaultState = {
  currentUser: null
}

  const mainReducer = (state=defaultState, action) => {
    switch(action.type){
      case 'SET_CURRENT_USER':
      //action.payload { username: 'Chandler Bing', bio: 'my user bio', age: 'age'}
      return {...state, currentUser: action.payload}
      case 'ADD_POST_TO_USER':
      //action.payload { username: 'Chandler Bing', bio: 'my user bio', age: 'age'}
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          entries: [...state.currentUser.entries, action.payload]
        }
      }
        default:
        return state
    }

  }

  export default mainReducer
