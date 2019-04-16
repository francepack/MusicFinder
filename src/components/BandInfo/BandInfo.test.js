import React from 'react'
import { BandInfo, mapDispatchToProps, mapStateToProps } from './BandInfo'
import { storeEvents } from '../../actions'
import { shallow } from 'enzyme'

describe('BandInfo', () => {
  let wrapper
  let props
  beforeEach(() => {
    props = {
      band: 'ween',
      similarBands: ['beatles', 'RHCP', 'Yes'],
      tags: ['weird', 'happy sometimes', 'sad sometimes'],
      storeEvents: jest.fn()
    }
    wrapper = shallow(
      <BandInfo {...props} />
    )
  })
  describe('standards', () => {
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })
    it('should have default state', () => {
      const expected = {
        state: '',
        city: '',
        startDate: '',
        endDate: ''
      }
      expect(wrapper.state()).toEqual(expected)
    })
  })
  describe('', () => {
    it('should', () => {
      
    })
  })
  describe('', () => {
    it('should', () => {
      
    })
  })
  describe('', () => {
    it('should', () => {
      
    })
  })
  describe('mapDispatchToProps', () => {
    it('should store events', () => {
      const mockEvents = [{name: 'Big Gig'}, {name: 'cochella'}]
      const mockDispatch = jest.fn()
      const actionToDispatch = storeEvents(mockEvents)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.storeEvents(mockEvents)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
  describe('mapStateToProps', () => {
    it('should return an object with a band, similar bands, and tags', () => {
      const mockState = {
        band: '',
        similarBands: [],
        tags: [],
        events: []
      }
      const expected = {
        band: '',
        similarBands: [],
        tags: []
      }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(expected)
    })
  })
})