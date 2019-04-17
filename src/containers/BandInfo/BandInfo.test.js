import React from 'react'
import { BandInfo, mapDispatchToProps, mapStateToProps } from './BandInfo'
import { storeEvents } from '../../actions'
import { shallow } from 'enzyme'
import { getEvents } from '../../helpers/apiCalls'
import { createUrlString } from '../../helpers/infoCleaners'

jest.mock('../../helpers/apiCalls.js')
jest.mock('../../helpers/infoCleaners.js')


describe('BandInfo', () => {
  let wrapper
  let props
  beforeEach(() => {
    props = {
      band: 'ween',
      similarBands: ['beatles', 'RHCP', 'Yes'],
      tags: ['weird', 'happy sometimes', 'sad sometimes'],
      storeEvents: jest.fn(),
      setLoading: jest.fn()
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
  describe('collectSearchParams', () => {
    it('should update state state', () => {
      const initialState = {
        state: '',
        city: '',
        startDate: '',
        endDate: ''
      }
      wrapper.setState(initialState)
      const expected = {
        state: 'abc',
        city: '',
        startDate: '',
        endDate: ''
      }
      const mockEvent = {target: {name: 'state', value: 'abc'}}
      wrapper.instance().collectSearchParams(mockEvent.target.name, mockEvent.target.value)
      expect(wrapper.state()).toEqual(expected)
    })
    it('should update state city', () => {
      const initialState = {
        state: '',
        city: '',
        startDate: '',
        endDate: ''
      }
      wrapper.setState(initialState)
      const expected = {
        state: '',
        city: 'abc',
        startDate: '',
        endDate: ''
      }
      const mockEvent = {target: {name: 'city', value: 'abc'}}
      wrapper.instance().collectSearchParams(mockEvent.target.name, mockEvent.target.value)
      expect(wrapper.state()).toEqual(expected)
    })
    it('should update state startDate', () => {
      const initialState = {
        state: '',
        city: '',
        startDate: '',
        endDate: ''
      }
      wrapper.setState(initialState)
      const expected = {
        state: '',
        city: '',
        startDate: 'abc',
        endDate: ''
      }
      const mockEvent = {target: {name: 'startDate', value: 'abc'}}
      wrapper.instance().collectSearchParams(mockEvent.target.name, mockEvent.target.value)
      expect(wrapper.state()).toEqual(expected)
    })
    it('should update state endDate', () => {
      const initialState = {
        state: '',
        city: '',
        startDate: '',
        endDate: ''
      }
      wrapper.setState(initialState)
      const expected = {
        state: '',
        city: '',
        startDate: '',
        endDate: 'abc'
      }
      const mockEvent = {target: {name: 'endDate', value: 'abc'}}
      wrapper.instance().collectSearchParams(mockEvent.target.name, mockEvent.target.value)
      expect(wrapper.state()).toEqual(expected) 
    })
  })
  describe('handleClick', () => {
    it('should call searchKeyword with correct input', () => {
      const mockSearch = 'Hey'
      wrapper.instance().searchKeyword = jest.fn()
      wrapper.instance().handleClick(mockSearch)
      expect(wrapper.instance().searchKeyword).toHaveBeenCalledWith(mockSearch)
    })
  })
  describe('searchKeyword', () => {
    beforeEach(() => {
      const mockState = {
        state: 'CO',
        city: 'Denver',
        startDate: '11/29/2020',
        endDate: '12/1/2021'
      }
      wrapper.setState(mockState)
    })
    it('should call prop setLoading', () => {
      const mockKeyword = 'Hello'
      wrapper.instance().searchKeyword(mockKeyword)
      expect(wrapper.instance().props.setLoading).toBeCalled()
    })
    it('should create a Url', () => {
      const mockKeyword = 'Hello'
      wrapper.instance().createUrl = jest.fn()
      wrapper.instance().searchKeyword(mockKeyword)
      expect(wrapper.instance().createUrl).toHaveBeenCalledWith(mockKeyword)
    })
    it('should call findEvents with result of createUrl', () => {
      const mockKeyword = 'Hello'
      wrapper.instance().createUrl = jest.fn(() => mockKeyword)
      wrapper.instance().findEvents = jest.fn()
      wrapper.instance().searchKeyword(mockKeyword)
      expect(wrapper.instance().findEvents).toHaveBeenCalledWith(mockKeyword)
    })
    it('should call saveEvents with results of findEvents', async () => {
      const mockKeyword = 'Hello'
      const mockEvents = [{name: 'event1'}, {name: 'event2'}]
      wrapper.instance().createUrl = jest.fn(() => mockKeyword)
      wrapper.instance().findEvents = jest.fn(() => mockEvents)
      wrapper.instance().saveEvents = jest.fn()
      await wrapper.instance().searchKeyword(mockKeyword)
      expect(wrapper.instance().saveEvents).toHaveBeenCalledWith(mockEvents)
    })
    it('should call showEvents', async () => {
      const mockKeyword = 'Hello'
      const mockEvents = [{name: 'event1'}, {name: 'event2'}]
      wrapper.instance().createUrl = jest.fn(() => mockKeyword)
      wrapper.instance().findEvents = jest.fn(() => mockEvents)
      wrapper.instance().saveEvents = jest.fn()
      wrapper.instance().showEvents = jest.fn()
      await wrapper.instance().searchKeyword(mockKeyword)
      expect(wrapper.instance().showEvents).toBeCalled()
    })
    it('should unset Load at end of function', async () => {
      
    })
    it('should return an error if fetch fails', () => {
      
    })
  })
  describe('createUrl', () => {
    it('should get info from state and give it to helper createUrlString', () => {
      const mockKey = 'searchterm'
      const mockState = {
        state: 'CO',
        city: 'Denver',
        startDate: '11/29/2020',
        endDate: '12/1/2021'
      }
      wrapper.setState(mockState)
      wrapper.instance().createUrl(mockKey)
      expect(createUrlString).toHaveBeenCalledWith(mockKey, mockState.state, mockState.city, mockState.startDate, mockState.endDate)
    })
  })
  describe('findEvents', () => {
    it('should call apiCall getEvents', () => {
      const mockUrl = '&keywords=dispatch'
      wrapper.instance().findEvents(mockUrl)
      expect(getEvents).toHaveBeenCalledWith(mockUrl)
    })
    it('should return error message if fetch fails', () => {
      
    })
  })
  describe('saveEvents', () => {
    it('should call prop storeEvents', () => {
      const mockEvents = [{name: 'event1'}, {name: 'event2'}]
      wrapper.instance().saveEvents(mockEvents)
      expect(wrapper.instance().props.storeEvents).toHaveBeenCalledWith(mockEvents)
    })
  })
  describe('renderKeywords', () => {
    it('should render a list item if keywords come back as faulty data', () => {
      const mockKeywords = {error: 'errormessage'}
      const result = wrapper.instance().renderKeywords(mockKeywords)
      expect(result).toEqual(<li>No results found</li>)
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