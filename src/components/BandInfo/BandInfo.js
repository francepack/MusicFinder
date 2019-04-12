import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { SearchParams } from '../SearchParams/SearchParams'
import { makeBandUrl } from '../../helpers/infoCleaners'

export class BandInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      searchParams: ''
    }
  }

  collectSearchParams = (params) => {
    this.setState({ searchParams: params })
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
    let urlKeyword = makeBandUrl(term)
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

