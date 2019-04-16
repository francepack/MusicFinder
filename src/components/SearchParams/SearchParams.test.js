import React from 'react'
import { shallow } from 'enzyme'
import { SearchParams } from './SearchParams'
import BandInfo from '../BandInfo/BandInfo'

describe('SearchParams', () => {
  let wrapper
  let props

  beforeEach(() => {
    props = {
      collectSearchParams: jest.fn()
    }
    wrapper = shallow(
      <SearchParams {...props}/>
      )
  })
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot
  })
 
  describe('handleChange', () => {
    it.skip('should call handleChange when state input is typed into', () => {
      const mockEvent = {target: {name: 'state', value: 'hello'}}
      const input = wrapper.find('.state-code')
      // wrapper.instance().handleChange = jest.fn()
      // wrapper.instance().props.collectSearchParams = jest.fn()
      input.simulate('change', mockEvent)
      expect(wrapper.instance().props.collectSearchParams).toBeCalled()
    })
    it.skip('should call handleChange when city input is typed into', () => {
      const mockEvent = {target: {name: 'city', value: 'hello'}}
      const input = wrapper.find('.city')
      wrapper.instance().handleChange = jest.fn()
      // wrapper.instance().props.collectSearchParams = jest.fn()
      input.simulate('change', mockEvent)
      expect(wrapper.instance().props.collectSearchParams).toBeCalled()
    })
    it.skip('should call handleChange when start-date input is typed into', () => {
      const mockEvent = {target: {name: 'startDate', value: 'hello'}}
      const input = wrapper.find('.start-date')
      wrapper.instance().handleChange = jest.fn()
      // wrapper.instance().props.collectSearchParams = jest.fn()
      input.simulate('change')
      expect(wrapper.instance().props.collectSearchParams).toBeCalled()
    })
    it.skip('should call handleChange when end-dateinput is typed into', () => {
      const mockEvent = {target: {name: 'endDate', value: 'hello'}}
      const input = wrapper.find('.end-date')
      wrapper.instance().handleChange= jest.fn()
      // wrapper.instance().props.collectSearchParams = jest.fn()
      input.simulate('change')
      expect(wrapper.instance().props.collectSearchParams).toBeCalled()
    })
    it('should call collectSearchParams with correct params and value', () => {
      const mockEvent = {target: {name: 'state', value: 'hello'}}
      wrapper.instance().handleChange(mockEvent)
      expect(wrapper.instance().props.collectSearchParams).toHaveBeenCalledWith('state', 'hello')
    })
  })
})