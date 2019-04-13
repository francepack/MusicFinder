export const events = (state = [], action) => {
  switch(action.type) {
    case 'STORE_EVENTS':
      return action.events
    default:
      return state
  }
}