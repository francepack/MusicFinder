import React from 'react'
import { Events, mapStateToProps} from './Events'
import { shallow } from 'enzyme'
import { buildCards } from '../../helpers/infoCleaners'

jest.mock('../../helpers/apiCalls')

describe('Events', () => {
  let wrapper
  let props
  beforeEach(() => {
    props = [{
      name: 'OK Go',
      id: 477, 
      url: 'eventpage.com', 
      images: [{url: 'https://s1.ticketm.nethttp://image.jpg' }], 
      dates: {start: {localDate: '2019-4-4'}}, 
      _embedded:{venues: 
        [{name: 'venue', 
        city: {name: 'Denver'}, 
        address: {line1: '111 A st'}}]
      }
    },
    {name: 'Ween',
    id: 111, 
    url: 'eventpage2.com', 
    images: [{url: 'https://s1.ticketm.nethttp://image.jpg' }], 
    dates: {start: {localDate: '2019-5-5'}}, 
    _embedded:{venues: 
      [{name: 'venue2', 
      city: {name: 'Denver'}, 
      address: {line1: '222 B st'}}]
    }
    }]
    wrapper = shallow(
      <Events events={props} />
    )
  })
  describe('Snapshots', () => {
    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('buildEventCards', () => {
    it('should call helper function buildCards upon render', () => {
      const buildCards = jest.fn()
      wrapper.instance().buildEventCards(props)
      expect(buildCards).toHaveBeenCalled
    })
  })
  describe('mapStateToProps', () => {
    it('should return an object with events', () => {
      const mockState = {events:[], band:'Ween', tags:[1,2,3]}
      const expected = {events:[]}
      const mockProps = mapStateToProps(mockState)
      expect(mockProps).toEqual(expected)
    })
  })
})