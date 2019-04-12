export const tags = (state = [], action) => {
  switch(action.type) {
    case 'STORE_TAGS':
      return action.tags
    default:
      return state
  }
}