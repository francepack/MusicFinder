import * as actions from './index'

describe('actions', () => {
    it('should return an object with type "STORE_BAND" with a band' , () => {
      const mockBand = 'Weezer'
      const expected = {
        type: 'STORE_BAND',
        band: mockBand
      }
      const result = actions.storeBand(mockBand)
      expect(result).toEqual(expected)
    })

    it('should return an object with type "STORE_SIMILAR" with bands', () => {
      const mockBands = [ {name: 'Weezer'}, {name: 'Beatles'}]
      const expected = {
        type: 'STORE_SIMILAR',
        bands: mockBands
      }
      const result = actions.storeSimilarBands(mockBands)
      expect(result).toEqual(expected)
    })

    it('should return an object with type "STORE_TAGS" with tags', () => {
      const mockTags = ['mellow', 'acoustic', 'jam']
      const expected = {
        type: 'STORE_TAGS',
        tags: mockTags
      }
      const result = actions.storeBandTags(mockTags)
      expect(result).toEqual(expected)
    })
    
    it('should return an object with type "STORE_EVENTS" with events', () => {
      const mockEvents = [{name: 'cool concert'}, {name: 'SnoopDogg'}]
      const expected = {
        type: 'STORE_EVENTS',
        events: mockEvents
      }
      const result = actions.storeEvents(mockEvents)
      expect(result).toEqual(expected)
    })
})