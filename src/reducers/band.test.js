import * as actions from '../actions'
import { band } from './band'

describe('band reducer', () => {
  it('should return default state', () => {
    const initialState = ''
    const action = {}
    const result = band(initialState, action)

    expect(result).toEqual(initialState)
  })
  it('should return a band', () => {
    const initialState = ''
    const mockBand = 'Ween'
    const action = actions.storeBand(mockBand)
    const result = band(initialState, action)
    expect(result).toEqual(mockBand)
  })
})