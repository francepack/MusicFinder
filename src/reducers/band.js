export const band = (state = '', action) => {
  switch(action.type) {
    case 'STORE_BAND':
      return action.band
    default:
      return state
  }
}