import React from 'react'
import { Loading } from './Loading'
import { shallow } from 'enzyme'

describe('Loading', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      let wrapper = shallow(
        <Loading />
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
})