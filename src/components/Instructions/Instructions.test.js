import React from 'react'
import { Instructions } from './Instructions'
import { shallow } from 'enzyme'

describe('Instructions', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      let wrapper = shallow(
        <Instructions />
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
})