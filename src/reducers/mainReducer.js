const defaultState = {
  currentUser: null,
  currentEntry: null
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
      case 'SET_CURRENT_ENTRY':
      return {...state, currentEntry: action.payload}
      case 'ADD_CHARACTER_TO_ENTRY':
      return {
        ...state,
        currentEntry: {
          ...state.currentEntry,
          characters: [...state.currentEntry.characters, action.payload]
        }
      }
      case 'ADD_SETTING_TO_ENTRY':
      return {
        ...state,
        currentEntry: {
          ...state.currentEntry,
          settings: [...state.currentEntry.settings, action.payload]
        }
      }
      default:
      return state
    }

  }

  export default mainReducer
