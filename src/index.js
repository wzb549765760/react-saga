import React from 'react'
import ReactDOM from 'react-dom'
// 引用 store
import store from './Store'

import { Provider } from 'react-redux'

import Index from './Components/index'

const App = (
  <Provider store={store}>
    <Index />
  </Provider>
)

ReactDOM.render(App, document.getElementById('root'))
