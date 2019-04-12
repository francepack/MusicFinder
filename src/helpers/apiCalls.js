import { lastfmKey, eventfulKey, ticketmasterKey, tastediveKey } from '../apiKey/key'
import { makeBandUrl, buildBandArray, cleanEvents } from './infoCleaners'

export const getSimilarBands = async (band) => {
  let bandUrl = makeBandUrl(band)
  try {
    let tastediveBands = await tastediveGetSimilarBands(bandUrl)
    let lastfmBands = await lastfmGetSimilarBands(bandUrl)
    let similarBands = lastfmBands.reduce((acc, val) => {
      let matchedBand = tastediveBands.find(band => {
        return band === val
      })
      if (matchedBand) acc.push(matchedBand)
      return acc
    }, [])
    let bandsArray = await buildBandArray(similarBands, tastediveBands) 
    return bandsArray
  } catch(error) {
    return error.message
  }
}

const lastfmGetSimilarBands = async (bandUrl) => {
  const url = `http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${bandUrl}&api_key=${lastfmKey}&format=json`
  try {
    let response = await fetch(url)
    let similarBands = await response.json()
    let bandNames = await similarBands.similarartists.artist.map(band => band.name)
    return bandNames
  } catch(error) {
    return error.message
  }
}

const tastediveGetSimilarBands = async (bandUrl) => {
  const proxyUrl = `https://cors-anywhere.herokuapp.com/`
  const url = `https://tastedive.com/api/similar?q=${bandUrl}&type=music&k=${tastediveKey}`
  try {
    let response = await fetch(proxyUrl + url)
    let similarBands = await response.json()
    let bandNames = await similarBands.Similar.Results.map(band => band.Name)
    return bandNames
  } catch(error) {
    return error.message
  }
}

export const getBandTags = async (band) => {
  const url = `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=${band}&user=RJ&api_key=${lastfmKey}&format=json`
  try {
    let response = await fetch(url)
    let bandTags = await response.json()
    let tags = await bandTags.toptags.tag.slice(0,10).map(tag => tag.name)
    return tags
  } catch(error) {
    return error.message
  }
}

export const getEvents = async (urlString) => {
  const url = `https://app.ticketmaster.com/discovery/v1/events.json?${urlString}&apikey=${ticketmasterKey}`
  try {
    const response = await fetch(url)
    const eventData = await response.json()
    console.log(eventData)
    const events = await cleanEvents(eventData)
    console.log(events)
    // const ImageUrls = await findImageUrls(events)
  } catch(error) {
    return error.message
  }
}

// const findImageUrls = (events) => {
//   let images = events.map(async event => {
//     let url = `https://s1.ticketm.net${event.image}`
//     try {
//       console.log(event.image)
//       // await fetch(event.image)
//     } catch(error) {
//       return error.message
//     }
//   })

// }











// export const getInfo = async () => {
//   const url = `http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=rock&api_key=${lastfmKey}&format=json`
//   try {
//     const response = await fetch(url)
//     const info = await response.json()
//     return info.topartists.artist.map(art => art.name)
//   } catch (error) {
//     return error.message
//   }
// }

// export const getEventfulBandId = async () => {
//   const url = `http://api.eventful.com/json/performers/search?app_key=${eventfulKey}&keywords=ween`
//   const proxyurl = "https://cors-anywhere.herokuapp.com/"
//   try {
//     const response = await fetch(proxyurl + url)
//     const info = await response.json()
//     return info.performers.performer.map(art => art.id)
//   } catch (error) {
//     return error.message
//   }
// }

// export const getDenverEvents = async () => {
//   const url = `http://api.eventful.com/json/events/search?app_key=${eventfulKey}&category=music&l=Denver`
//   const proxyurl = "https://cors-anywhere.herokuapp.com/"
//   try {
//     const response = await fetch(proxyurl + url)
//     const info = await response.json()
//     return info.events.event.map(event => event.title)
//   } catch(error) {
//     return error.message
//   }
// }


// export const ticketmasterevents = async () => {
//   const url = `https://app.ticketmaster.com/discovery/v1/events.json?apikey=${ticketmasterKey}`
//   // const proxyurl = "https://cors-anywhere.herokuapp.com/"
//   try {
//     const response = await fetch(url)
//     const info = await response.json()
//     return info._embedded.events.map(event => event.name)
//   } catch(error) {
//     return error.message
//   }
// }