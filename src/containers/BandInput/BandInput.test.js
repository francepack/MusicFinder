import React from 'react'
import { shallow } from 'enzyme'
import { BandInput, mapDispatchToProps } from './BandInput'
import * as actions from '../../actions'

jest.mock('../../helpers/apiCalls')

describe('BandInput', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(
      <BandInput />
    )
  })
  describe('defaultstate', () => {
    it('should', () => {
      
    })
  })
  describe('Snapshots', () => {
    it('should', () => {
      
    })
  })
  describe('saveBand', () => {
    it('should', () => {
      
    })
  })
  describe('searchSimilarBands', () => {
    it('should', () => {
      
    })
  })
  describe('searchForBandTags', () => {
    it('should', () => {
      
    })
  })
  describe('getIdeas', () => {
    it('should', () => {
      
    })
  })
  describe('handleSubmit', () => {
    it('should', () => {
      
    })
  })
  describe('handleChange', () => {
    it('should', () => {
      
    })
  })
  describe('mapDispatchToProps', () => {
    it('should store a band', () => {
      const mockDispatch = jest.fn()
      const mockBand = 'Ween'
      const actionToDispatch = actions.storeBand(mockBand)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.storeBand(mockBand)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
    it('should store suggested similar bands', () => {
      const mockDispatch = jest.fn()
      const mockBands = ['Weezer', 'Cake', 'ExampleBand']
      const actionToDispatch = actions.storeSimilarBands(mockBands)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.storeSimilarBands(mockBands)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
    it('should store band descriptions', () => {
      const mockDispatch = jest.fn()
      const mockTags = ['so fresh', 'so clean']
      const actionToDispatch = actions.storeBandTags(mockTags)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.storeBandTags(mockTags)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})