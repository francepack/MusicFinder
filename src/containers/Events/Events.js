import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
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
        <Link to='./band-info'><button className='return-btn'>Return to Results</button></Link>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  events: state.events
})

Events.propTypes = {
  events: PropTypes.array
}

export default connect(mapStateToProps, null)(Events)