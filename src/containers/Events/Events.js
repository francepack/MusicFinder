import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Events extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return(
      <div>
        {this.props.events}
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  events: state.events
})

export default connect(matchStateToProps, null)(Events)