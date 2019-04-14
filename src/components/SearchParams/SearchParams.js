import React, { Component } from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux'

export class SearchParams extends Component {
  constructor(props) {
    super(props)
  }

  handleChange = (e) => {
    let param = e.target.name
    let value = e.target.value
    this.props.collectSearchParams(param, value)
  }

  render() {
    return(
      <div className='params'>
        <h3>Search for events based on similar bands or terms</h3>
        <label>State
        <input name='state' 
               maxLength={2} 
               onKeyUp={this.handleChange}>
        </input></label>
        <label>City
        <input name='city' 
               maxLength={35} 
               onKeyUp={this.handleChange}>
        </input></label>
        <label>Events after...
        <input name='startDate' 
               onKeyUp={this.handleChange}>
        </input></label>
        <label>Events Before...
        <input name='endDate' 
               onKeyUp={this.handleChange}>
        </input></label>
      </div>
    )
  }
}