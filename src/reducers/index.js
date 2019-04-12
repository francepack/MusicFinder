import { combineReducers } from 'redux'
import { band } from './band'
import { events } from './events'
import { tags } from './tags'
import { similarBands } from './similarBands'

export const rootReducer = combineReducers({
  band,
  tags,
  similarBands,
  // events
})