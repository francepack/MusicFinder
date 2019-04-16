import React from 'react'
import { shallow } from 'enzyme'
import { BandInput, mapDispatchToProps } from './BandInput'
import * as actions from '../../actions'

jest.mock('../../helpers/apiCalls')


describe('BandInput', () => {
  let wrapper
  let props

  beforeEach(() => {
    props = {
      setLoading: jest.fn(),
      storeBand: jest.fn()
    }
    wrapper = shallow(
      <BandInput {...props} />
    )
  })
  describe('defaultstate', () => {
    it('should have default state', () => {
      const expected = {bandInput: ''}
      expect(wrapper.state()).toEqual(expected)
    })
  })
  describe('Snapshots', () => {
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('saveBand', () => {
    it('should call prop storeBand', () => {
      const mockBand = 'ween'
      wrapper.instance().saveBand(mockBand)
      expect(wrapper.instance().props.storeBand).toHaveBeenCalledWith(mockBand)
    })
  })
  describe('searchSimilarBands', () => {
    it('should call getSimilarBands with a bandname', () => {
      
    })
    it('should return an error message if failed', () => {
      
    })
  })
  describe('searchForBandTags', () => {
    it('should call getBandTags with a bandname', () => {
      
    })
    it('should return an error message if failed', () => {
      
    })
  })
  describe('getSearchIdeas', () => {
    it('should call searchSimilarBands', () => {
      
    })
    it('should call searchForBandTags', () => {
      
    })
    it('should call props storeSimilarBands', () => {
      
    })
    it('should call props storeBandTags', () => {
      
    })
    it('should call props setLoading', () => {
      
    })
    it('should return an error message if failed', () => {
      
    })
  })
  describe('handleSubmit', () => {
    it('should prevent default', () => {
      let mockEvent = { preventDefault: jest.fn() }
      wrapper.instance().handleSubmit(mockEvent)
      expect(mockEvent.preventDefault).toBeCalled()
    })
    it('should call findResults', () => {
      wrapper.instance().findResults = jest.fn()
      let mockEvent = { preventDefault: jest.fn() }
      wrapper.instance().handleSubmit(mockEvent)
      expect(wrapper.instance().findResults).toBeCalled()
    })
  })
  describe('handleChange', () => {
    it('should set bandInput state as user types', () => {
      const mockEvent = {target: {name: 'bandInput', value: 'hello'}}
      expect(wrapper.state()).toEqual({bandInput: ''})
      wrapper.instance().handleChange(mockEvent)
      expect(wrapper.state()).toEqual({bandInput: 'hello'})
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