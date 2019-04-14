import * as actions from '../actions'
import { similarBands } from './similarBands'

describe('similarBands reducer', () => {
  it('should return default state', () => {
    const initialState = []
    const action = {}
    const result = similarBands(initialState, action)

    expect(result).toEqual(initialState)
  })
  it('should return bands', () => {
    const initialState = []
    const mockBands = ['Beatles', 'Weezer', 'Blink-182']
    const action = actions.storeSimilarBands(mockBands)
    const result = similarBands(initialState, action)
    expect(result).toEqual(mockBands)
  })
})