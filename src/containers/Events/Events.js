import React, { Component } from 'react'
import { connect } from 'react-redux'
import { buildCards } from '../../helpers/infoCleaners'

export class Events extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  buildEventCards = (events) => {
    // buildCards(events)
    if (events.length) {
      return events.map(event => {
        return(
          <div key={event.id}>
            <a href={event.eventUrl} target='_blank'>
              <div backgroundimage={event.image}>
                <h3>{event.name}</h3>
                <p>{event.date}</p>
                <p>{event.city}</p>
                <p>{event.venue}</p>
              </div>
            </a>
          </div>
        )
      })
  }
  }

  render() {
    const { events } = this.props
    console.log(events)
    let renderEvents
    if (events.length) {
      renderEvents = this.buildEventCards(events)
    }
    // this.buildEventCards(this.props.events)
    // if (this.props.events){
    //   events = this.props.events.map(event => <p>{event.name}</p>)
    // }
    return(
      <div>
        {renderEvents}
      </div>
    )
  }
}



// export const mapStateToProps = (state) => ({
//   // events: state.events
// })

export default Events
// export default connect(mapStateToProps, null)(Events)