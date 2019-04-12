export const events = (state = [], action) => {
  switch(action.type) {
    case 'STORE_Events':
      return action.events
    default:
      return state
  }
}