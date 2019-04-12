import React, { Component } from 'react'
import { connect } from 'react-redux'
import { storeBand, storeSimilarBands, storeBandTags } from '../../actions'
import { getSimilarBands, getBandTags } from '../../helpers/apiCalls'
import { cleanBand } from '../../helpers/infoCleaners'

export class BandInput extends Component {
  constructor() {
    super()
    this.state = {
      bandInput: ''
    }
  }

  saveBand = (band) => {
    this.props.storeBand(band)
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

  getIdeas = async (band) => {
    try {
      let similarBands = await this.searchSimilarBands(band)
      let bandTags = await this.searchForBandTags(band)
      await this.props.storeSimilarBands(similarBands)
      await this.props.storeBandTags(bandTags)
    } catch(error) {
      return error.message
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { bandInput } = this.state
    this.saveBand(bandInput)
    this.getIdeas(bandInput)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input  className='bandInput'
                name='bandInput'
                placeholder='Enter Your Favorite Band'
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

export default connect(null, mapDispatchToProps)(BandInput)