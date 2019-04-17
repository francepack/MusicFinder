import React from 'react'

export const createUrlString = (keyword, state, city, startDate, endDate) => {
  const keywordUrl = makeStringUrl(keyword)
  let urlString = `&classificationName=music&keyword=${keywordUrl}`
  if (state) {
    const cleanState = makeStringUrl(state)
    const stateUrl = `&stateCode=${cleanState}`
    urlString = urlString + stateUrl
  }
  if (city) {
    const cleanCity = makeStringUrl(city)
    const cityUrl = `&city=${cleanCity}`
    urlString = urlString + cityUrl
  }
  if (startDate && startDate.split('/').length === 3) {
    const cleanStartDate = makeDateUrl(startDate)
    const startDateUrl = `&startDateTime=${cleanStartDate}T01:00:00Z`
    urlString = urlString + startDateUrl
  }
  if (endDate && endDate.split('/').length === 3) {
    const cleanEndDate = makeDateUrl(endDate)
    const endDateUrl = `&endDateTime=${cleanEndDate}T01:00:00Z`
    urlString = urlString + endDateUrl
  }
  return urlString
}

export const makeStringUrl = (band) => {
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
  const splitDate = date.split('/')
    const year = splitDate[2]
    const day = splitDate[1]
    const month = splitDate[0]
    return `${year}-${month}-${day}`
}

export const matchSimilarBands = (lastfmArr, tastediveArr) => {
  if ( lastfmArr.length && tastediveArr.length) {
    return lastfmArr.reduce((acc, val) => {
      let matchedBand = tastediveArr.find(band => {
        return band === val
      })
      if (matchedBand) acc.push(matchedBand)
      return acc
    }, [])
  } else if (!lastfmArr.length && tastediveArr.length) {
    return tastediveArr.slice(0, 10)
  } else if (!tastediveArr.length && lastfmArr.length) {
    return lastfmArr.slice(0, 10)
  }
}

export const buildBandArray = (matchedBands, tastebands, lastfmbands) => {
  const arrayLength = matchedBands.length
  if (arrayLength === 10) {
    return matchedBands
  } 
  
  else if (arrayLength === 0) {
    if (tastebands.length) {
      return tastebands.slice(0, 10)
    } else if (!tastebands.length && lastfmbands.length) {
      return lastfmbands.slice(0, 10)
    } else if (!tastebands.length && !lastfmbands.length) {
      return []
    }
  } 
  
  else if (arrayLength > 10) {
    return matchedBands.slice(0, 10)
  } 
  
  else if (arrayLength < 10) {
    let count = 0
    for (let i = arrayLength; i < 10; i++) {
      count++
    }
    if (tastebands.length) {
      let filteredBands = tastebands.reduce((acc, band) => {
        if (acc.length < count && !matchedBands.includes(band)) {
          acc.push(band)
        }
        return acc
      }, [])
      return matchedBands.concat(filteredBands)
    } else if (!tastebands.length && lastfmbands.length) {
      let filteredBands = lastfmbands.reduce((acc, band) => {
        if (acc.length < count && !matchedBands.includes(band)) {
          acc.push(band)
        }
        return acc
      }, [])
      return matchedBands.concat(filteredBands)
    } else if (!tastebands.length && !lastfmbands.length) {
      return matchedBands
    }
  }
}

export const cleanEvents = (event) => {
  let venueName = 'No venue listed'
  let venueCity = 'No city listed'
  let venueAddress = 'No address given'
  let date = 'No date listed'
  let eventImg
  if (event._embedded.venues) {
    venueName = event._embedded.venues[0].name
    venueCity = event._embedded.venues[0].city.name
    venueAddress = event._embedded.venues[0].address.line1
  }
  if (event.images) {
    eventImg = event.images[0].url
  } else {
    eventImg = 'https://image.freepik.com/free-vector/blue-background-people-concert_23-2147604883.jpg'
  }
  if (event.dates.start.localDate) {
    let splitDate = event.dates.start.localDate.split('-')
    date = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`
  }

  return { 
    name: event.name, 
    eventUrl: event.url, 
    id: event.id, 
    date: date,
    venue: venueName,
    venueAddress: venueAddress,
    city: venueCity,
    image: eventImg
  }
  
}

export const buildCards = (events) => {
  if (events.length === 1) {
    const event = events[0]
    const background = { backgroundImage: `url(${event.image})` }
    return(
      <main className='single'>
        <section className='single-event-card' key={event.id}>
          <a href={event.eventUrl} target='_blank' rel='noopener noreferrer'>
            <div className='background' style={background}>
              <div className='overlay'>
                <article className='card-details'>
                  <header className='top-details'>
                    <h3>{event.name}</h3>
                    <p>{event.date}</p>
                  </header>
                  <footer className='bottom-details'>
                    <p>City: {event.city}</p>
                    <p>Venue: {event.venue}</p>
                  </footer>
                </article>
              </div>
            </div>
          </a>
        </section>
      </main>
    )
  }
  const cards = events.map(event => {
    const background = { backgroundImage: `url(${event.image})` }
    return(
      <section className='event-card' key={event.id}>
        <a href={event.eventUrl} target='_blank' rel='noopener noreferrer'>
          <div className='background' style={background}>
            <div className='overlay'>
              <article className='card-details'>
                <header className='top-details'>
                  <h3>{event.name}</h3>
                  <p>{event.date}</p>
                </header>
                <footer className='bottom-details'>
                  <p>City: {event.city}</p>
                  <p>Venue: {event.venue}</p>
                </footer>
              </article>
            </div>
          </div>
        </a>
      </section>
    )
  })
  return(<main className='events-container'>{cards}</main>)
}