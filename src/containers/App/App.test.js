import React from 'react'
import { shallow } from 'enzyme'
import { App } from './App'


describe('App', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(
      <App />
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
      
    })
  })
  describe('setError', () => {
    it('should set state error', () => {
      
    })
  })
  describe('setLoading', () => {
    it('should change state loading', () => {
      
    })
  })
  describe('mapStateToProps', () => {
    it('should return an object with similarBands and tags', () => {
      
    })
  })
})