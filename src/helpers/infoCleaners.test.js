import React from 'react'
import * as helpers from './infoCleaners'

describe('infoCleaners', () => {
  describe('makeBandUrl', () => {
    it('should take in a string and replace certain characters', () => {
      const mockString1 = '!"#$%&()*+/'
      const mockString2 = "'Hey You'"
      const expected1 = '%21%22%23%24%25%26%28%29%2A%2B%2F'
      const expected2 = "%27Hey+You%27"
      const result1 = helpers.makeStringUrl(mockString1)
      const result2 = helpers.makeStringUrl(mockString2)
      expect(result1).toEqual(expected1)
      expect(result2).toEqual(expected2)
    })
  })

  describe('matchSimilarBands', () => {
    it('should take in two arrays and build an array of matching items', () => {
      const mockArray1 = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7', 'item8', 'item9', 'item10']
      const mockArray2 = ['item5', 'item6', 'item7', 'item8', 'item9', 'item10', 'item11', 'item12', 'item13', 'item14']
      const expected = ['item5', 'item6', 'item7', 'item8', 'item9', 'item10']
      const result = helpers.matchSimilarBands(mockArray1, mockArray2)
      expect(result).toEqual(expected)
    })
    it('should check to see if either array is empty and if so, return the first ten items of other array', () => {
      const arr1 = []
      const arr2 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
      const expected = [1,2,3,4,5,6,7,8,9,10]
      const result = helpers.matchSimilarBands(arr1, arr2)
      expect(result).toEqual(expected)
    })
    it('should check to see if either array is empty and if so, return the first ten items of other array', () => {
      const arr1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
      const arr2 = []
      const expected = [1,2,3,4,5,6,7,8,9,10]
      const result = helpers.matchSimilarBands(arr1, arr2)
      expect(result).toEqual(expected)
    })
  })

  describe('buildBandArray', () => {
    it('should take in 3 arrays- if the first array has 10 items, it should return that array', () => {
      const arr1 = [1,2,3,4,5,6,7,8,9,10]
      const arr2 = []
      const arr3 = []
      const result = helpers.buildBandArray(arr1, arr2, arr3)
      expect(result).toEqual(arr1)
    })
    it('should take in 3 arrays- if the first array has more than 10 items, it should cut the array to 10 items', () => {
      const arr1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
      const arr2 = []
      const arr3 = []
      const expected = [1,2,3,4,5,6,7,8,9,10]
      const result = helpers.buildBandArray(arr1, arr2, arr3)
      expect(result).toEqual(expected)
    })
    it('should take in 3 arrays- if the first array has less than 10 items, it should be filled out by items in the second array', () => {
      const arr1 = [1,2,3,4,5,6,7]
      const arr2 = ['a','b','c','d','e']
      const arr3 = []
      const expected = [1,2,3,4,5,6,7,'a','b','c']
      const result = helpers.buildBandArray(arr1, arr2, arr3)
      expect(result).toEqual(expected)
    })
    it('should take in 3 arrays- if the first array has less than 10 items, and the second has no items, it should be filled out by items in the third array', () => {
      const arr1 = [1,2,3,4,5,6,7]
      const arr2 = []
      const arr3 = ['a','b','c','d','e']
      const expected = [1,2,3,4,5,6,7,'a','b','c']
      const result = helpers.buildBandArray(arr1, arr2, arr3)
      expect(result).toEqual(expected)
    })
    it('should take in 3 arrays- if the first array has less than 10 items, but the second and third have no items, it should return the first array', () => {
      const arr1 = [1,2,3,4,5,6,7]
      const arr2 = []
      const arr3 = []
      const result = helpers.buildBandArray(arr1, arr2, arr3)
      expect(result).toEqual(arr1)
    })
    it('should take in 3 arrays- if the first array has no items, it should create a list of 10 from the second array', () => {
      const arr1 = []
      const arr2 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
      const arr3 = ['a','b','c']
      const expected = [1,2,3,4,5,6,7,8,9,10]
      const result = helpers.buildBandArray(arr1, arr2, arr3)
      expect(result).toEqual(expected)
    })
    it('should take in 3 arrays- if the first array has no items, and the second has none, it should create a list of 10 from the third array', () => {
      const arr1 = []
      const arr2 = []
      const arr3 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
      const expected = [1,2,3,4,5,6,7,8,9,10]
      const result = helpers.buildBandArray(arr1, arr2, arr3)
      expect(result).toEqual(expected)
    })
    it('should take in 3 arrays- if all three have no items, it should return an empty string', () => {
      const arr1 = []
      const arr2 = []
      const arr3 = []
      const expected = []
      const result = helpers.buildBandArray(arr1, arr2, arr3)
      expect(result).toEqual(expected)
    })
  })

  describe('cleanEvents', () => {
    it('should return an object with certain pieces of event data', () => {
      const mockEvent = {
        name: 'OK Go',
        whatever: 'Do not need this info',
        randomkey: 'not needed',
        id: 477, 
        url: 'eventpage.com', 
        images: [{url: 'https://s1.ticketm.nethttp://image.jpg' }], 
        dates: {start: {localDate: '2019-4-4'}}, 
        _embedded:{venues: 
          [{name: 'venue', 
          city: {name: 'Denver'}, 
          address: {line1: '111 A st'}}]
        }
      }
      const expected = {
        city: 'Denver',
        date: '4/4/2019',
        eventUrl: 'eventpage.com',
        id: 477,
        image: 'https://s1.ticketm.nethttp://image.jpg',
        name: 'OK Go',
        venue: 'venue',           
        venueAddress: '111 A st',
      }
      const result = helpers.cleanEvents(mockEvent)
      expect(result).toEqual(expected)
    })
    it('should return an object with placeholders if no venue data or image data is included', () => {
      const mockEvent = {
        name: 'OK Go',
        whatever: 'Do not need this info',
        randomkey: 'not needed',
        id: 477, 
        url: 'eventpage.com', 
        noimagekey: 'no image in here', 
        dates: {start: {localDate: '2019-4-4'}}, 
        _embedded:{notvenuekey: 'no venue in here'}
      }
      const expected = {
        city: 'No city listed',
        date: '4/4/2019',
        eventUrl: 'eventpage.com',
        id: 477,
        image: 'https://image.freepik.com/free-vector/blue-background-people-concert_23-2147604883.jpg',
        name: 'OK Go',
        venue: 'No venue listed',           
        venueAddress: 'No address given',
      }
      const result = helpers.cleanEvents(mockEvent)
      expect(result).toEqual(expected)
    })
  })

  describe('buildCards', () => {
    it('should return the appropriate card if only 1 event is passed in', () => {
      const mockEvents = [{
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
      }  
    ]
    const mockBackground = { backgroundImage: `url(${mockEvents[0].image})`}

      const expected = (<main className='single'>
      <section className='single-event-card' key={mockEvents[0].id}>
        <a href={mockEvents[0].eventUrl} target='_blank' rel='noopener noreferrer'>
          <div className='background' style={mockBackground}>
            <div className='overlay'>
              <article className='card-details'>
                <header className='top-details'>
                  <h3>{mockEvents[0].name}</h3>
                  <p>{mockEvents[0].date}</p>
                </header>
                <footer className='bottom-details'>
                  <p>City: {mockEvents[0].city}</p>
                  <p>Venue: {mockEvents[0].venue}</p>
                </footer>
              </article>
            </div>
          </div>
        </a>
      </section>
    </main>
    )
    const result = helpers.buildCards(mockEvents)
    expect(result).toEqual(expected)
    })
    it('should return the appropriate cards if multiple events are passed in', () => {
      const mockEvents = [{
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
      const mockBackground1 = { backgroundImage: `url(${mockEvents[0].image})`}
      const mockBackground2 = { backgroundImage: `url(${mockEvents[1].image})`}
      
      const expected = (
      <main className='events-container'>
        <section className='event-card' key={mockEvents[0].id}>
          <a href={mockEvents[0].eventUrl} target='_blank' rel="noopener noreferrer">
            <div className='background' style={mockBackground1}>
              <div className='overlay'>
                <article className='card-details'>
                  <header className='top-details'>
                    <h3>{mockEvents[0].name}</h3>
                    <p>{mockEvents[0].date}</p>
                  </header>
                  <footer className='bottom-details'>
                    <p>City: {mockEvents[0].city}</p>
                    <p>Venue: {mockEvents[0].venue}</p>
                  </footer>
                </article>
              </div>
            </div>
          </a>
        </section>
        
     
        <section className='event-card' key={mockEvents[1].id}>
          <a href={mockEvents[1].eventUrl} target='_blank' rel="noopener noreferrer">
            <div className='background' style={mockBackground2}>
              <div className='overlay'>
                <article className='card-details'>
                  <header className='top-details'>
                    <h3>{mockEvents[1].name}</h3>
                    <p>{mockEvents[1].date}</p>
                  </header>
                  <footer className='bottom-details'>
                    <p>City: {mockEvents[1].city}</p>
                    <p>Venue: {mockEvents[1].venue}</p>
                  </footer>
                </article>
              </div>
            </div>
          </a>
        </section>
      </main>)

    const result = helpers.buildCards(mockEvents)
    expect(result).toEqual(expected)
    })
  })

  describe('createUrlString', () => {
    it('should format user input to be readable by the api', () => {
      const mockKeyword = 'Beatles'
      const mockState = 'CO'
      const mockCity = 'Denver'
      const mockStart = '11/29/2020'
      const mockEnd = '11/29/2021'
      const result = helpers.createUrlString(mockKeyword, mockState, mockCity, mockStart, mockEnd)
      const expected = '&classificationName=music&keyword=Beatles&stateCode=CO&city=Denver&startDateTime=2020-11-29T01:00:00Z&endDateTime=2021-11-29T01:00:00Z'
      expect(result).toEqual(expected)
    })
    it('should not call makeDateUrl if a date is absent', () => {
      const mockKeyword = 'Beatles'
      const mockState = 'CO'
      const mockCity = 'Denver'
      const mockStart = ''
      const mockEnd = ''
      helpers.makeDateUrl = jest.fn()
      helpers.createUrlString(mockKeyword, mockState, mockCity, mockStart, mockEnd)
      expect(helpers.makeDateUrl).not.toHaveBeenCalled()
    })
  })
})