import React, { Component } from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux'

export class SearchParams extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  handleChange = (e) => {
    let param = e.target.name
    let value = e.target.value
    this.props.collectSearchParams(param, value)
  }

  render() {
    const {state, city, startDate, endDate } = this.state
    return(
      <div>
        <h1>Search for events based on similar bands</h1>
        <label>State</label>
        <input defaultValue={state} name='state' maxLength={2} onKeyUp={this.handleChange}></input>
        <label>City</label>
        <input defaultValue={city} name='city' maxLength={35} onKeyUp={this.handleChange}></input>
        <label>Events after...</label>
        <input defaultValue={startDate} name='startDate' onKeyUp={this.handleChange}></input>
        <label>Events Before...</label>
        <input defaultValue={endDate} name='endDate' onKeyUp={this.handleChange}></input>
      </div>
    )
  }
}