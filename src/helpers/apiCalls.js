import { lastfmKey, ticketmasterKey, tastediveKey } from '../apiKey/key'
import { makeUrlString, buildBandArray, cleanEvents, matchSimilarBands } from './infoCleaners'

export const getSimilarBands = async (band) => {
  let bandUrl = makeUrlString(band)
  try {
    let tastediveBands = await tastediveGetSimilarBands(bandUrl)
    let lastfmBands = await lastfmGetSimilarBands(bandUrl)
    let similarBands
    if (lastfmBands.length || tastediveBands.length) {
      similarBands = matchSimilarBands(lastfmBands, tastediveBands)
    } else {
      similarBands = []
    }
    let bandsArray = buildBandArray(similarBands, tastediveBands, lastfmBands) 
    return bandsArray
  } catch(error) {
    return error.message
  }
}

export const lastfmGetSimilarBands = async (bandUrl) => {
  const url = `http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${bandUrl}&api_key=${lastfmKey}&format=json`
  try {
    const response = await fetch(url)
    const similarBands = await response.json()
    if (similarBands.error) {
      return []
    }
    const bandNames = similarBands.similarartists.artist.map(band => band.name)
    return bandNames
  } catch(error) {
    return error.message
  }
}

export const tastediveGetSimilarBands = async (bandUrl) => {
  const proxyUrl = `https://cors-anywhere.herokuapp.com/`
  const url = `https://tastedive.com/api/similar?q=${bandUrl}&type=music&k=${tastediveKey}`
  try {
    const response = await fetch(proxyUrl + url)
    const similarBands = await response.json()
    const bandNames = similarBands.Similar.Results.map(band => band.Name)
    return bandNames
  } catch(error) {
    return error.message
  }
}

export const getBandTags = async (band) => {
  const url = `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=${band}&user=RJ&api_key=${lastfmKey}&format=json`
  try {
    const response = await fetch(url)
    const bandTags = await response.json()
    let tags
    if (bandTags.toptags) {
      tags = bandTags.toptags.tag.slice(0,10).map(tag => tag.name)
    } else {
      tags = []
    }
    return tags
  } catch(error) {
    return error.message
  }
}

export const getEvents = async (urlString) => {
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${ticketmasterKey}${urlString}`
  try {
    const response = await fetch(url)
    const eventData = await response.json()
    let events
    if (eventData._embedded) {
      events = eventData._embedded.events.map(event => cleanEvents(event))
    } else {
      events = [{
        name: 'No Events found', 
        eventUrl: '', 
        id: '404', 
        date: '',
        venue: 'NA',
        venueAddress: '',
        city: 'NA',
        image: 'http://euchc.org/wp-content/uploads/2018/03/no-event-scheduled.png'
      }]
    }
    return events
  } catch(error) {
    return error.message
  }
}