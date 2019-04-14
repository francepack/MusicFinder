import React from 'react'

export const makeUrlString= (band) => {
  const letters = band.split('')
  const url = letters.map(letter => {
    switch (letter) {
      case ' ':
        return '+'
      case '!':
        return '%21'
      case '"':
        return '%22'
      case '#':
        return '%23'
      case '$':
        return '%24'
      case '%':
        return '%25'
      case '&':
        return '%26'
      case "'":
        return '%27'
      case '(':
        return '%28'
      case ')':
        return '%29'
      case '*':
        return '%2A'
      case '+':
        return '%2B'
      case '/':
        return '%2F'
      default:
        return letter
    }
  })
  return url.join('')
}

export const makeDateUrl = (date) => {
  let dateUrl = `startDateTime=`
  
}

export const matchSimilarBands = (lastfmArr, tastediveArr) => {
  return lastfmArr.reduce((acc, val) => {
    let matchedBand = tastediveArr.find(band => {
      return band === val
    })
    if (matchedBand) acc.push(matchedBand)
    return acc
  }, [])
}

export const buildBandArray = (matchedBands, tastebands) => {
  const arrayLength = matchedBands.length
  if (arrayLength === 10) {
    return matchedBands
  } else if (arrayLength === 0) {
    return tastebands.slice(0, 10)
  } else if (arrayLength > 10) {
    return matchedBands.slice(0, 10)
  } else if (arrayLength < 10) {
    let count = 0
    for (let i = arrayLength; i < 10; i++) {
      count++
    }
    let filteredBands = tastebands.reduce((acc, band) => {
      if (acc.length < count && !matchedBands.includes(band)) {
        acc.push(band)
      }
      return acc
    }, [])
    return matchedBands.concat(filteredBands)
  } else {
    return 'error'
  }
}

export const cleanEvents = (event) => {
  let venueName
  let venueCity
  let venueAddress
  let eventImg
  if (event._embedded.venue) {
    venueName = event._embedded.venue[0].name
    venueCity = event._embedded.venue[0].city.name
    venueAddress = event._embedded.venue[0].address.line1
  }
  if (event._embedded.attractions && event._embedded.attractions[0].image) {
    eventImg = 'https://s1.ticketm.net' + event._embedded.attractions[0].image.url
  } else {
    eventImg = 'https://image.freepik.com/free-vector/blue-background-people-concert_23-2147604883.jpg'
  }

  return { 
    name: event.name, 
    eventUrl: event.eventUrl, 
    id: event.id, 
    date: event.dates.start.localDate,
    venue: venueName,
    venueAddress: venueAddress,
    city: venueCity,
    image: eventImg
  }
  
}

export const buildCards = (events) => {
  console.log(events)
  if (events.length) {
    return events.map(event => {
      const background = { backgroundImage: `url(${event.image})`}
      return(
        <div className='event-card' key={event.id}>
          <a href={event.eventUrl} target='_blank'>
            <div className='background' style={background}>
              <div className='overlay'>
                <h3>{event.name}</h3>
                <p>{event.date}</p>
                <p>{event.city}</p>
                <p>{event.venue}</p>
              </div>
            </div>
          </a>
        </div>
      )
    })
  }
}