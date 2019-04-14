import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { rootReducer } from './reducers/index'
import './scss/index.scss'
import App from './containers/App/App'
import * as serviceWorker from './serviceWorker'

const store = createStore(
  rootReducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const router = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(router, document.getElementById('root'))

serviceWorker.unregister()