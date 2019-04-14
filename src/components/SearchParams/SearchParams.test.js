import React from 'react'
import { shallow } from 'enzyme'
import { SearchParams } from './SearchParams'

describe('SearchParams', () => {
  let wrapper
  
  beforeEach(() => {
    wrapper = shallow(
      <SearchParams />
      )
  })
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot
  })
 
  describe('handleChange', () => {
    it('should call collectSearchParams with correct params and value', () => {

    })
  })
})