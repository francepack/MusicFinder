import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Loading from '../../components/Loading/Loading'
import BandInput from '../BandInput/BandInput'
import { BandInfo } from '../../components/BandInfo/BandInfo'
import { Events } from '../Events/Events'
import { Route, withRouter, Link } from 'react-router-dom'
import { storeEvents } from '../../actions'


export class App extends Component {
  constructor(props) {
    super(props)
    this.state= {
      error: '',
      loading: false
    }
  }

  setError = (message) => {
    this.setState({ error: message })
  }

  setLoading = () => {
    this.setState({ loading: !this.state.loading })
  }

  storeEvents = (events) => {
    const { history } = this.props
    this.props.storeEvents(events)
    history.push('/events')
  }
  
  render() {
    const { error, loading } = this.state
    return (
      <div className='App'>
        <h1>
          <Link to='/'>
            MusicFinder
          </Link>
        </h1>
        <BandInput setError={this.setError} setLoading={this.setLoading} />
        {!this.props.tags.length && 
          <div className='instructions'>
            <p>Type in the name of your favorite band above.</p>
            <p>Submit to find similar bands and descriptions of that band.</p>
            <p>Click on any results to search for Events that may interest you.</p>
          </div>
        }
        {error && error}
        {this.state.loading && <Loading />}
        <Route exact path='/' />
        <Route path='/Loading' />
        <Route path='/band-info' component={() => <BandInfo similarBands={this.props.similarBands} tags={this.props.tags} storeEvents={this.storeEvents} />}/>
        <Route path='/events' component={() => <Events events={this.props.events} /> }/>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  similarBands: state.similarBands,
  tags: state.tags,
  events: state.events
})

export const mapDispatchToProps = (dispatch) => ({
  storeEvents: (events) => dispatch(storeEvents(events))
})

App.propTypes = {
  similarBands: PropTypes.array,
  tags: PropTypes.array
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))