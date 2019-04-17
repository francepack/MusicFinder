import React from 'react'
import { shallow } from 'enzyme'
import { App, mapStateToProps } from './App'


describe('App', () => {
  let wrapper
  const mockTags = ['cool', 'rock', 'alternative']
  beforeEach(() => {
    wrapper = shallow(
      <App {...mockTags} />
    )
  })
  describe('app', () => {
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })
    it('should match snapshot when error is present', () => {
      wrapper.setState({ error: 'Fetch call failed' })
      expect(wrapper).toMatchSnapshot()
    })
    it('should have default state', () => {
      const expected = {
        error: '',
        loading: false
      }
      expect(wrapper.state()).toEqual(expected)
    })
  })

  describe('setError', () => {
    it('should set state error', () => {
      const initialState = {
        error: '',
        loading: false
      }
      const expected = {
        error: 'Error! Error!',
        loading: false
      }
      wrapper.setState(initialState)
      expect(wrapper.state()).toEqual(initialState)
      const mockError = 'Error! Error!'
      wrapper.instance().setError(mockError)
      expect(wrapper.state()).toEqual(expected)
    })
  })

  describe('setLoading', () => {
    it('should change state loading', () => {
      const initialState = {
        error: '',
        loading: false
      }
      const expected = {
        error: '',
        loading: true
      }
      wrapper.setState(initialState)
      expect(wrapper.state()).toEqual(initialState)
      wrapper.instance().setLoading()
      expect(wrapper.state()).toEqual(expected)
    })
  })
  
  describe('mapStateToProps', () => {
    it('should return an object with similarBands and tags', () => {
      const state = {
        band: '',
        similarBands: [],
        events: [],
        tags: []
      }
      const expected = {
        band: ''
      }
      const result = mapStateToProps(state)
      expect(result).toEqual(expected)
    })
  })
})