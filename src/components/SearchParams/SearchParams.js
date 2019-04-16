import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class SearchParams extends Component {

  handleChange = (e) => {
    let param = e.target.name
    let value = e.target.value
    this.props.collectSearchParams(param, value)
  }

  render() {
    return(
      <div className='params'>
        <h3>Search for events based on similar bands or terms</h3>
        <div className='param-inputs'>
          <div className='location-inputs'>
            <label>State Code <br />
            <input name='state'
                   className='state-code'
                   placeholder='Ex. CO' 
                   maxLength={2} 
                   onKeyUp={this.handleChange}>
            </input></label>
            <label>City <br />
            <input name='city'
                   className='city' 
                   placeholder='Ex. Denver'
                   maxLength={35} 
                   onKeyUp={this.handleChange}>
            </input></label>
          </div>
          <div className='date-inputs'>
            <label>Show events after: <br />
            <input name='startDate'
                   className='start-date'
                   placeholder='Ex. 11/29/2019' 
                   onKeyUp={this.handleChange}>
            </input></label>
            <label>Show events before: <br />
            <input name='endDate'
                   className='end-date' 
                   placeholder='Ex. 8/6/2020'
                   onKeyUp={this.handleChange}>
            </input></label>
          </div>
        </div>
      </div>
    )
  }
} 

SearchParams.propTypes = {
  collectSearchParams: PropTypes.func
}