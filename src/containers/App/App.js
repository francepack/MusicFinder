import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Instructions } from '../../components/Instructions/Instructions'
import { Loading } from '../../components/Loading/Loading'
import BandInput from '../BandInput/BandInput'
import BandInfo from '../BandInfo/BandInfo'
import Events from '../Events/Events'
import { Route, withRouter, Link } from 'react-router-dom'

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
  
  render() {
    const { error } = this.state
    return (
      <div className='App'>
        <h1>
          <Link to='/'>
            MusicFinder
          </Link>
        </h1>
        <BandInput setError={this.setError} setLoading={this.setLoading} />
        {error && error}
        {!this.props.band && <Instructions />}
        {this.state.loading && <Loading />}
        <Route exact path='/' />
        <Route path='/Loading' />
        <Route path='/band-info' component={() => <BandInfo setError={this.setError} setLoading={this.setLoading} />}/>
        <Route path='/events' component={() => <Events /> }/>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  band: state.band
})

App.propTypes = {
  band: PropTypes.string
}

export default withRouter(connect(mapStateToProps, null)(App))