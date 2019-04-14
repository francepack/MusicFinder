import { rootReducer } from './index'
import { createStore } from 'redux'
import { band } from './band'
import { similarBands} from './similarBands'
import { events } from './events'
import { tags } from './tags'


describe('rootReducer', () => {
  it('should return a store with all reducers', () => {
    let store = createStore(rootReducer)
    expect(store.getState().band).toEqual(band(undefined, ''))
    expect(store.getState().similarBands).toEqual(similarBands(undefined, ''))
    expect(store.getState().events).toEqual(events(undefined, ''))
    expect(store.getState().tags).toEqual(tags(undefined, ''))
  })
})