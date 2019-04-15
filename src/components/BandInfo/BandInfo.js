import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { SearchParams } from '../SearchParams/SearchParams'
import { storeEvents } from '../../actions'
import { makeUrlString, makeDateUrl, cleanEvents } from '../../helpers/infoCleaners'
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
      return <li key={band}> <div className='search-term' onClick={() => this.handleClick(band)}>{band}</div></li>})
  }

  renderTags = (tags) => {
    return tags.map(tag => <li key={tag}> <div className='search-term' onClick={() => this.handleClick(tag)}>{tag}</div></li>)
  }

  handleClick = (searchItem) => {
    this.searchKeyword(searchItem)
  }

  searchKeyword = async (searchItem) => {
    let url = this.createUrl(searchItem)
    try {
      let events = await this.findEvents(url)
      this.saveEvents(events)
    } catch(error) {
      console.log(error)
      return error.message
    }
  }

  createUrl = (keyword) => {
    const { state, city, startDate, endDate } = this.state
    const keywordUrl = makeUrlString(keyword)
    let urlString = `classificationName=music&keyword=${keywordUrl}`
    if (state) {
      const cleanState = makeUrlString(state)
      const stateUrl = `&stateCode=${cleanState}`
      urlString = urlString + stateUrl
    }
    if (city) {
      const cleanCity = makeUrlString(city)
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
    // console.log(this.props.band)
    const similarBands = this.renderSimilarBands(this.props.similarBands)
    const tags = this.renderTags(this.props.tags)
    return(
      <div className='search-area'>
        <SearchParams collectSearchParams={this.collectSearchParams} />
        <h4>Click a search term below</h4>
        <p>Terms related to <span onClick={() => this.handleClick(this.props.band)}>{this.props.band}</span></p>
        <div className='keywords'>
          <ul className='bands-list'>
            <li className='list-head'>Similar Bands</li>
            {similarBands}
          </ul>
          <ul className='tags-list'>
            <li className='list-head'>Associated Terms</li>
            {tags}
          </ul>
        </div>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  // band: state.band
})

export const mapDispatchToProps = (dispatch) => ({
  // storeEvents: (events) => dispatch(storeEvents(events))
})

export default connect(mapStateToProps, mapDispatchToProps)(BandInfo)