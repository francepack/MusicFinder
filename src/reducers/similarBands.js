export const similarBands = (state = [], action) => {
  switch(action.type) {
    case 'STORE_SIMILAR':
      return action.bands
    default:
      return state
  }
}