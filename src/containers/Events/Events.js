import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Events extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    let events
    if (this.props.events){
      events = this.props.events.map(event => <p>{event.name}</p>)
    }
    return(
      <div>
        {this.props.events && events}
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  // events: state.events
})

export default connect(mapStateToProps, null)(Events)