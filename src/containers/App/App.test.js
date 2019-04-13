import React, { shallow } from 'react'
import ReactDOM from 'react-dom'
import App from './App'

let wrapper

describe('App', () => {
  BeforeEach(() => {
    wrapper = shallow(
      <App />
    )
  })
  describe('app', () => {
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })
    it('should match snapshot when error is present', () => {
      App.setState({ error: 'Fetch call failed' })
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