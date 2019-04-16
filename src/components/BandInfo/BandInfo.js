import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { SearchParams } from '../SearchParams/SearchParams'
import { storeEvents } from '../../actions'
import { makeUrlString, createUrlString } from '../../helpers/infoCleaners'
import { getEvents } from '../../helpers/apiCalls'

export class BandInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      state: '',
      city: '',
      startDate: '',
      endDate: ''
    }
  }

  collectSearchParams = (param, value) => {
    this.setState({ [param]: value })
  }

  handleClick = (searchItem) => {
    this.searchKeyword(searchItem)
  }

  searchKeyword = async (searchItem) => {
    this.props.setLoading()
    let url = this.createUrl(searchItem)
    try {
      let events = await this.findEvents(url)
      this.saveEvents(events)
      this.showEvents()
      this.props.setLoading()
    } catch(error) {
      return error.message
    }
  }

  createUrl = (keyword) => {
    const { state, city, startDate, endDate } = this.state
    const urlString = createUrlString(keyword, state, city, startDate, endDate)
    return urlString
  }

  findEvents = async (url) => {
    try {
      let events = await getEvents(url)
      return events
    } catch (error) {
      return error
    }
  }

  showEvents = () => {
    const { history } = this.props
    history.push('/events')
  }

  saveEvents = (events) => {
    this.props.storeEvents(events)
  }

  renderKeywords = (keywords) => {
    if (typeof keywords === 'object' && keywords.length) {
      return keywords.map((keyword, i) => {
        return(
          <li key={keyword + i}> 
            <div className='search-term' 
                 onClick={() => this.handleClick(keyword)}>
              {keyword}
            </div>
          </li>
        )
      })
    } else {
      return(
        <li>No results found</li>
      )
    }
  }

  render() {
    const similarBands = this.renderKeywords(this.props.similarBands)
    const tags = this.renderKeywords(this.props.tags)
    return(
      <div className='search-area'>
        <SearchParams collectSearchParams={this.collectSearchParams} />
        <h4>Click a search term below</h4>
        <p>You searched: <span onClick={() => this.handleClick(this.props.band)}>{this.props.band}</span></p>
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
  band: state.band,
  similarBands: state.similarBands,
  tags: state.tags
})

export const mapDispatchToProps = (dispatch) => ({
  storeEvents: (events) => dispatch(storeEvents(events)),

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BandInfo))