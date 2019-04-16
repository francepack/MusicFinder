import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { buildCards } from '../../helpers/infoCleaners'

export class Events extends Component {


  buildEventCards = (events) => {
    return buildCards(events)
  }

  render() {
    const renderEvents = this.buildEventCards(this.props.events)

    return(
      <div className='events-section'>
        {renderEvents}
        <Link to='./'><button className='return-btn'>Return</button></Link>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  events: state.events
})

export default connect(mapStateToProps, null)(Events)