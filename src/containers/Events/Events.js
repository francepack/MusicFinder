import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { buildCards } from '../../helpers/infoCleaners'

export class Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  buildEventCards = (events) => {
    let cards = buildCards(events)
    return cards
  }

  render() {
    const { events } = this.props
    let renderEvents
    if (events.length) {
      renderEvents = this.buildEventCards(events)
    }
  
    return(
      <div className='events-container'>
        {renderEvents}
        {renderEvents && <Link to='./'><button className='return-btn'>Return</button></Link>}
      </div>
    )
  }
}



// export const mapStateToProps = (state) => ({
//   // events: state.events
// })

export default Events
// export default connect(mapStateToProps, null)(Events)