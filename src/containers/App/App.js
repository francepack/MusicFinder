import React, { Component } from 'react'
import './App.scss'
import BandInput from '../BandInput/BandInput'

class App extends Component {
  constructor() {
    super()
    this.state= {
      
    }
  }
  
  handleSubmit = async (e) => {

  }
  
  render() {
    return (
      <div className='App'>
        <h1>MusicFinder</h1>
        <BandInput />
      </div>
    )
  }
}

export default App