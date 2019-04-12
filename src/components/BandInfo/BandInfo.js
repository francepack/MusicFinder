import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { SearchParams } from '../SearchParams/SearchParams'
import { makeBandUrl, makeDateUrl } from '../../helpers/infoCleaners'
import { getEvents } from '../../helpers/apiCalls'

export class BandInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      searchParams: '',
      state: '',
      city: '',
      startDate: '',
      endDate: ''
    }
  }

  collectSearchParams = (param, value) => {
    this.setState({ [param]: value })
  }

  renderSimilarBands = (bands) => {
    return bands.map(band => {
      return <li key={band}> <button onClick={() => this.handleClick(band)}>{band}</button></li>})
  }

  renderTags = (tags) => {
    return tags.map(tag => <li key={tag}> <button onClick={() => this.handleClick(tag)}>{tag}</button></li>)
  }

  handleClick = (searchItem) => {
    this.createUrl(searchItem)
  }

  createUrl = (term) => {
    const { state, city, startDate, endDate } = this.state
    const keywordUrl = makeBandUrl(term)
    let urlString = `keyword=${keywordUrl}`
    if (state) {
      const cleanState = makeBandUrl(state)
      const stateUrl = `&state=${cleanState}`
      urlString = urlString + stateUrl
    }
    if (city) {
      const cleanCity = makeBandUrl(city)
      const cityUrl = `&city=${cleanCity}`
      urlString = urlString + cityUrl
    }
    console.log(urlString)
    getEvents(urlString)
    // const startDateUrl = makeDateUrl(startDate)
    // const endDateUrl = makeDateUrl(endDate) 
    
  }

  render() {
    const similarBands = this.renderSimilarBands(this.props.similarBands)
    const tags = this.renderTags(this.props.tags)
    return(
      <div>
        <SearchParams collectSearchParams={this.collectSearchParams} />
        <p>Click below to make a search</p>
        <ul>
          <li>Similar Bands</li>
          {similarBands}
        </ul>
        <ul>
          <li>Other Interests</li>
          {tags}
        </ul>
      </div>
    )
  }
}

