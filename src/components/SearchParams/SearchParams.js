import React, { Component } from 'react'

export class SearchParams extends Component {
  constructor(props) {
    super(props)
    this.state = {
      state: '',
      city: '',
      startDate: '',
      endDate: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value})
    console.log(this.state)
  }

  render() {
    const {state, city, startDate, endDate } = this.state
    return(
      <div>
        <h1>Search for events based on similar bands</h1>
        <label>State</label>
        <input defaultValue={state} name='state' onKeyUp={this.handleChange}></input>
        <label>City</label>
        <input defaultValue={city} name='city' onKeyUp={this.handleChange}></input>
        <label>Events after...</label>
        <input defaultValue={startDate} name='startDate' onKeyUp={this.handleChange}></input>
        <label>Events Before...</label>
        <input defaultValue={endDate} name='endDate' onKeyUp={this.handleChange}></input>
      </div>
    )
  }
}