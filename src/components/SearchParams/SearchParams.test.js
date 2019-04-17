import React from 'react'
import { shallow } from 'enzyme'
import { SearchParams } from './SearchParams'
import BandInfo from '../../containers/BandInfo/BandInfo'

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
    it('should call collectSearchParams with correct params and value', () => {
      const mockEvent = {target: {name: 'state', value: 'hello'}}
      wrapper.instance().handleChange(mockEvent)
      expect(wrapper.instance().props.collectSearchParams).toHaveBeenCalledWith('state', 'hello')
    })
  })
})