import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { SearchParams } from '../SearchParams/SearchParams'
import { storeEvents } from '../../actions'
import { makeBandUrl, makeDateUrl, cleanEvents } from '../../helpers/infoCleaners'
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
      endDate: '',
      events: []
    }
  }

  collectSearchParams = (param, value) => {
    this.setState({ [param]: value })
  }

  renderSimilarBands = (bands) => {
    return bands.map(band => {
      return <li key={band}> <div onClick={() => this.handleClick(band)}>{band}</div></li>})
  }

  renderTags = (tags) => {
    return tags.map(tag => <li key={tag}> <div onClick={() => this.handleClick(tag)}>{tag}</div></li>)
  }

  handleClick = (searchItem) => {
    this.searchKeyword(searchItem)
  }

  searchKeyword = async (searchItem) => {
    let url = this.createUrl(searchItem)
    try {
      let events = await this.findEvents(url)
      console.log(events)
      this.saveEvents(events)
    } catch(error) {
      console.log(error)
      return error.message
    }
  }

  createUrl = (keyword) => {
    const { state, city, startDate, endDate } = this.state
    const keywordUrl = makeBandUrl(keyword)
    let urlString = `keyword=${keywordUrl}`
    if (state) {
      const cleanState = makeBandUrl(state)
      const stateUrl = `&stateCode=${cleanState}`
      urlString = urlString + stateUrl
    }
    if (city) {
      const cleanCity = makeBandUrl(city)
      const cityUrl = `&city=${cleanCity}`
      urlString = urlString + cityUrl
    }
    // if (startDate) {
    //   const cleanStartDate = makeDateUrl(startDate)
    //   const startDateUrl = `&startDateTime=${cleanStartDate}`
    //   urlString = urlString + startDateUrl
    // }
    // if (endDate) {
    //   const cleanEndDate = makeDateUrl(endDate) 
    //   const endDateUrl = `&endDateTime=${cleanEndDate}`
    //   urlString = urlString + endDateUrl
    // }
    return urlString
  }
      // try {
        // let events = await getEvents(urlString)
        // console.log(events)
        // this.setState({ events: events})
        // this.props.storeEvents(this.state.events)
      // } catch (error) {
      //   return error.message
      // }

  findEvents = async (url) => {
    try {
      let events = await getEvents(url)
      return events
      // let events = await this.searchEvents(url)
      // let cleanedEvents = cleanEvents(events)
      // console.log(events)
      // this.setState({ events: events})
      // await this.saveEvents(events)
    } catch (error) {
      console.log('error')
      return error
    }
      // console.log(cleanedEvents[1])
      // console.log(typeof cleanedEvents)
    
    // console.log(events)
    // await this.setState({events})
    // console.log(this.state.events)
    // console.log(typeof this.state.events)
    // let e = await cleanEvents(events)
    // await this.setState({ events: e})
    // console.log(e)
    // this.props.storeEvents(events)
  }

  // searchEvents = async (url) => {
  //   try {
  //     let events = await getEvents(url)
  //     return events
  //   } catch(error) {
  //     return error.message
  //   }
  // }

  saveEvents = (events) => {
    // console.log(events)
    const storedevents = this.props.storeEvents(events)
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

export const mapDispatchToProps = (dispatch) => ({
  // storeEvents: (events) => dispatch(storeEvents(events))
})

export default connect(null, mapDispatchToProps)(BandInfo)