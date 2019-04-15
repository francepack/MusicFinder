import { getSimilarBands, lastfmGetSimilarBands, tastediveGetSimilarBands, getBandTags, getEvents } from './apiCalls'
import { cleanEvent } from './infoCleaners'

describe('apiCalls', () => {
  describe('getSimilarBands', () => {
    it('should call functions to get 2 sets of similarBands', async () => {
      
    })
    it('should call a function to find matches', () => {

    })
    it('should call a function to build an array of 10 bands', () => {
      
    })
  })
  describe('lastfmGetSimilarBands', () => {
    it('should get band names of similar artist from lastfm api', async () => {
      const mockBands = {similarartists: {artist: [{name: 'OK Go'}, {name: 'Example Band'}, {name: 'They might be Giants'}]}}
      const expected = ['OK Go', 'Example Band', 'They might be Giants']
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockBands)
      }))
      const lastfmBands = await lastfmGetSimilarBands(mockBands)
      expect(window.fetch).toHaveBeenCalled()
    
      expect(lastfmBands).toEqual(expected)
    })
    it('should return an error message if appropriate', async () => {
      const mockBands = {similarartists: {artist: [{name: 'OK Go'}, {name: 'Example Band'}, {name: 'They might be Giants'}]}}
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
          ok: false,
          status: 422,
          json: () => Promise.resolve('Error')
        }
      ))
      const result = await lastfmGetSimilarBands(mockBands)
      expect(result).toEqual("Cannot read property 'artist' of undefined")
    })
  })
  describe('tastediveGetSimilarBands', () => {
    it('should get names of similar artists from tastedive', async () => {
      const mockBands = {Similar: {Results: [{Name: 'OK Go'}, {Name: 'Example Band'}, {Name: 'They might be Giants'}]}}
      const expected = ['OK Go', 'Example Band', 'They might be Giants']
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockBands)
      }))
      const tastediveBands = await tastediveGetSimilarBands(mockBands)
      expect(window.fetch).toHaveBeenCalled()
    
      expect(tastediveBands).toEqual(expected)
    })
    it('should return an error message if appropriate', async () => {
      const mockBands = {Similar: {Results: [{Name: 'OK Go'}, {Name: 'Example Band'}, {Name: 'They might be Giants'}]}}
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
          ok: false,
          status: 422,
          json: () => Promise.resolve('Error')
        }
      ))
      const result = await tastediveGetSimilarBands(mockBands)
      expect(result).toEqual("Cannot read property 'Results' of undefined")
    })
  })
  describe('getBandTags', () => {
    it('should get names of tags associated with band', async () => {
      const mockTags = {toptags: {tag: [{name: 'cool'}, {name: 'alt-rock'}, {name: 'tag3'}, {name: 'tag4'}, {name: 'tag5'}, {name: 'tag6'}, {name: 'tag7'}, {name: 'tag8'}, {name: 'tag9'}, {name: 'tag10'}, {name: 'tag11'}, {name: 'tag12'}, {name: 'tag13'}, {name: 'tag14'}]}}
      const expected = ['cool', 'alt-rock', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7', 'tag8', 'tag9', 'tag10']
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockTags)
      }))
      const bandTags = await getBandTags(mockTags)
      expect(window.fetch).toHaveBeenCalled()
    
      expect(bandTags).toEqual(expected)
    })
    it('should return an error message if appropriate', async () => {
      const mockTags = {toptags: {tag: ['cool', 'alt-rock', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7', 'tag8', 'tag9', 'tag10', 'tag11', 'tag12', 'tag13', 'tag14']}}
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
          ok: false,
          status: 422,
          json: () => Promise.resolve('Error')
        }
      ))
      const result = await getBandTags(mockTags)
      expect(result).toEqual("Cannot read property 'tag' of undefined")
    })
  })
  describe('getEvents', () => {
    it('should get event info and return events if found', async () => {
      // let cleanEvents = jest.fn(() => event)
      const mockEvents = {_embedded: {events: [{name: 'OK Go', eventUrl: 'eventpage.com', dates: {start: {localDate: '2019-4-4'}}, _embedded:{attractions: [{image: {url: 'http://image.jpg'}}], venue: [{name: 'venue', city: {name: 'Denver'}, address: {line1: '111 A st'}}] }}]}}
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockEvents)
      }))
      const fetchedEvents = await getEvents(mockEvents)
      expect(window.fetch).toHaveBeenCalled()
    
      expect(fetchedEvents).toEqual([{"city": "Denver", "date": "2019-4-4", "eventUrl": "eventpage.com", "id": undefined, "image": "https://s1.ticketm.nethttp://image.jpg", "name": "OK Go", "venue": "venue", "venueAddress": "111 A st"}])
    })
    // it('should get event info and return a dummy event if none are found', async () => {
    //   const mockEvents = {Similar: {Results: [{Name: 'OK Go'}, {Name: 'Example Band'}, {Name: 'They might be Giants'}]}}
    //   const expected = ['OK Go', 'Example Band', 'They might be Giants']
    //   window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    //     ok: true,
    //     status: 200,
    //     json: () => Promise.resolve(mockBands)
    //   }))
    //   const tastediveBands = await tastediveGetSimilarBands(mockBands)
    //   expect(window.fetch).toHaveBeenCalled()
    
    //   expect(tastediveBands).toEqual(expected)
    // })
    it('should return a dummy event if fetch fails, or no events are found', async () => {
      const mockEvents = {_embedded: {events: [{name: 'OK Go', eventUrl: 'eventpage.com', dates: {start: {localDate: '2019-4-4'}}, _embedded:{attractions: [{image: {url: 'http://image.jpg'}}], venue: [{name: 'venue', city: {name: 'Denver'}, address: {line1: '111 A st'}}] }}]}}
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
          ok: false,
          status: 422,
          json: () => Promise.resolve('Error')
        }
      ))
      const result = await getEvents(mockEvents)
      expect(result).toEqual([{name: 'No Events found', 
          eventUrl: '', 
          id: '404', 
          date: '',
          venue: '',
          venueAddress: '',
          city: '',
          image: ''}])
    })
  })
})