import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { storeBand, storeSimilarBands, storeBandTags } from '../../actions'
import { getSimilarBands, getBandTags } from '../../helpers/apiCalls'

export class BandInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bandInput: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.findResults()
  }

  findResults = () => {
    const { bandInput } = this.state
    this.props.setLoading()
    this.saveBand(bandInput)
    this.getSearchIdeas(bandInput)
  }

  saveBand = (band) => {
    this.props.storeBand(band)
  }

  getSearchIdeas = async (band) => {
    try {
      const { history } = this.props
      let similarBands = await this.searchSimilarBands(band)
      let bandTags = await this.searchForBandTags(band)
      this.props.storeSimilarBands(similarBands)
      this.props.storeBandTags(bandTags)
      history.push('/band-info')
      this.props.setLoading()
    } catch(error) {
      return error.message
    }
  }

  searchSimilarBands = async (band) => {
    try {
      const similarBands = await getSimilarBands(band)
      return similarBands
    } catch(error) {
      return error.message
    }
  }

  searchForBandTags = async (band) => {
    try {
      const bandTags = await getBandTags(band)
      return bandTags
    } catch(error) {
      return error.message
    }
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input  className='band-input'
                name='bandInput'
                placeholder='Enter a Band'
                defaultValue={this.state.bandInput}
                onKeyUp={this.handleChange}
                >
        </input>
        <button className='submit-btn'>Submit</button>
      </form>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  storeBand: (band) =>  dispatch(storeBand(band)),
  storeSimilarBands: (bands) => dispatch(storeSimilarBands(bands)),
  storeBandTags: (tags) => dispatch(storeBandTags(tags))
})

BandInput.propTypes = {
  storeBandTags: PropTypes.func,
  storeSimilarBands: PropTypes.func,
  storeBand: PropTypes.func,
  setError: PropTypes.func,
  setLoading: PropTypes.func
}

export default withRouter(connect(null, mapDispatchToProps)(BandInput))