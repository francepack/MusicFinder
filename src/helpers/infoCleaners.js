// export const cleanBand = (band) => {
//   return band.toLowerCase()
// }

export const makeBandUrl = (band) => {
  const letters = band.split('')
  const url = letters.map(letter => {
    switch (letter) {
      case ' ':
        letter = '+'
        return letter
      default:
        return letter
    }
  })
  return url.join('')
}

export const buildBandArray = (matchedBands, tastebands) => {
  // switch (matchedBands.length) {
  //   case 10:
  //     return matchedBands
  //   case 0:
  //     return tastebands.slice(0, 10)
  //   case < 10
  // }
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