export const storeBand = (band) => ({
  type: 'STORE_BAND',
  band
})

export const storeSimilarBands = (bands) => ({
  type: 'STORE_SIMILAR',
  bands
})

export const storeBandTags = (tags) => ({
  type: 'STORE_TAGS',
  tags
})

export const storeEvents = (events) => ({
  type: 'STORE_EVENTS',
  events
})