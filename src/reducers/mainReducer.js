const defaultState = {
  currentUser: null,
  currentEntry: null
}

  const mainReducer = (state=defaultState, action) => {
    switch(action.type){
      case 'SET_CURRENT_USER':
      return {...state, currentUser: action.payload}
      case 'ADD_POST_TO_USER':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          entries: [...state.currentUser.entries, action.payload]
        }
      }
      case 'REMOVE_POST_FROM_USER':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          entries: state.currentUser.entries.filter(entry => action.payload !== entry.id )
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
      case 'UPDATE_CHARACTER_IN_ENTRY':
      let updatedCharacterArray = state.currentEntry.characters.map((character)=> {
        if (character.id === action.payload.id){
          return action.payload
        }
        else {
          return character
        }
      })
      return {
        ...state,
        currentEntry: {
          ...state.currentEntry,
          characters: updatedCharacterArray
        }
      }
      //NEEDS WORK
      case 'REMOVE_CHARACTER_FROM_ENTRY':
      return {
        ...state,
        currentEntry: {
          ...state.currentEntry,
          characters: state.currentEntry.characters.filter(character=>action.payload.id !== character.id)
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
      case 'UPDATE_SETTING_IN_ENTRY':
      let updatedSettingArray = state.currentEntry.settings.map((setting)=> {
        if (setting.id === action.payload.id){
          return action.payload
        }
        else {
          return setting
        }
      })
      return {
        ...state,
        currentEntry: {
          ...state.currentEntry,
          settings: updatedSettingArray
        }
      }
      //NEEDS WORK
      case 'REMOVE_SETTING_FROM_ENTRY':
      return {
        ...state,
        currentEntry: {
          ...state.currentEntry,
          characters: [...state.currentEntry.characters, action.payload]
        }
      }
      //NEEDS WORK
      case 'ADD_CHARACTER_SETTING_TO_ENTRY':
      return {
        ...state,
        currentEntry: {
          ...state.currentEntry,
          characters: [...state.currentEntry.characters, action.payload]
        }
      }
      //NEEDS WORK
      case 'UPDATE_CHARACTER_SETTING_IN_ENTRY':
      return {
        ...state,
        currentEntry: {
          ...state.currentEntry,
          characters: [...state.currentEntry.characters, action.payload]
        }
      }
      //NEEDS WORK
      case 'DELETE_CHARACTER_SETTING_FROM_ENTRY':
      return {
        ...state,
        currentEntry: {
          ...state.currentEntry,
          characters: [...state.currentEntry.characters, action.payload]
        }
      }

      default:
      return state
    }

  }

  export default mainReducer
