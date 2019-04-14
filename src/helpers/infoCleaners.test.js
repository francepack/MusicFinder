import * as helpers from './infoCleaners'

describe('infoCleaners', () => {
  describe('makeBandUrl', () => {
    it('should take in a string and replace certain characters', () => {
      const mockString1 = '!"#$%&()*+/'
      const mockString2 = "'Hey You'"
      const expected1 = '%21%22%23%24%25%26%28%29%2A%2B%2F'
      const expected2 = "%27Hey+You%27"
      const result1 = helpers.makeUrlString(mockString1)
      const result2 = helpers.makeUrlString(mockString2)
      expect(result1).toEqual(expected1)
      expect(result2).toEqual(expected2)
    })
  })
  describe('makeDateUrl', () => {
    it('should', () => {
      
    })
  })
  describe('matchSimilarBands', () => {
    it('should', () => {
      
    })
  })
  describe('buildBandArray', () => {
    it('should take in 2 arrays, find matches, then fill the matching array to 10 items', () => {
      const mockArray1 = [item1, item2, item3, item4, item5, item6, item7, item8, item9, item10]
      const mockArray2 = [item5, item6, item7, item8, item9, item10, item11, item12, item13, item14, ]
    })
  })
  describe('cleanEvents', () => {
    it('should', () => {
      
    })
  })
  describe('buildCards', () => {
    it('should', () => {
      
    })
  })
})