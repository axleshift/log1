// import { legacy_createStore as createStore } from 'redux'

// const initialState = {
//   sidebarShow: true,
//   sidebarUnfoldable: false,
//   theme: 'light',
//   user: {},
// }

// const changeState = (state = initialState, { type, ...rest }) => {
//   if (type === 'set') {
//     console.log('Updating state:', rest) // Add this line for debugging
//     return { ...state, ...rest }
//   }
//   return state
// }

// const store = createStore(changeState)
// export default store
// store.js

import { legacy_createStore as createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  sidebarUnfoldable: false,
  theme: 'light',
  user: {},
}

const changeState = (state = initialState, { type, ...rest }) => {
  if (type === 'set') {
    console.log('Updating state:', rest)
    if (rest.user) {
      // If updating user, merge with existing user state
      return { ...state, user: { ...state.user, ...rest.user } }
    }
    // For other updates, spread as before
    return { ...state, ...rest }
  }
  return state
}

const store = createStore(changeState)
export default store
