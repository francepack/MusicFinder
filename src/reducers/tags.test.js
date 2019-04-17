import * as actions from '../actions'
import { tags } from './tags'

describe('tags reducer', () => {
  it('should return default state', () => {
    const initialState = []
    const action = {}
    const result = tags(initialState, action)
    expect(result).toEqual(initialState)
  })
  it('should return tags', () => {
    const initialState = []
    const mockTags = ['Rock', 'alternative', 'guitar']
    const action  = actions.storeBandTags(mockTags)
    const result = tags(initialState, action)
    expect(result).toEqual(mockTags)
  })
})