import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.scss'
import Loading from '../../components/Loading/Loading'
import BandInput from '../BandInput/BandInput'
import { BandInfo } from '../../components/BandInfo/BandInfo'
import { Route, withRouter, Link } from 'react-router-dom'

export class App extends Component {
  constructor() {
    super()
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
  
  render() {
    const { error, loading } = this.state
    return (
      <div className='App'>
        <h1>MusicFinder</h1>
        <BandInput setError={this.setError} setLoading={this.setLoading} />
        {error && error}
        {this.state.loading && <Loading />}
        <Route exact path='/' />
        <Route path='/Loading' />
        <Route path='/band-info' component={() => <BandInfo similarBands={this.props.similarBands} tags={this.props.tags} />}/>
        <Route path='/events' />
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  similarBands: state.similarBands,
  tags: state.tags
})

export default withRouter(connect(mapStateToProps, null)(App))