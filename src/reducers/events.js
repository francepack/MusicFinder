export const events = (state = [], action) => {
  switch(action.type) {
    case 'STORE_EVENTS':
      console.log('inreduce')
      return action.events
    default:
      return state
  }
}