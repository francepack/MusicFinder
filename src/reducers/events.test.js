import * as actions from '../actions'
import { events } from './events'

describe('event reducer', () => {
  it('should return default state', () => {
    const initialState = []
    const action = {}
    const result = events(initialState, action)

    expect(result).toEqual(initialState)
  })
  it('should return events', () => {
    const initialState = []
    const mockEvents = [{name: 'The big gig'}, {name: 'TRL'}, {name: 'cochella'}]
    const action = actions.storeEvents(mockEvents)
    const result = events(initialState, action)
    expect(result).toEqual(mockEvents)
  })
})