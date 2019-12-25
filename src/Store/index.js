import { createStore, applyMiddleware, compose } from 'redux'

import reducer from './reducer'

// 使用saga

import createSagaWiddleware from 'redux-saga'

import mySaga from './saga'

const sagaMiddleware = createSagaWiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware))

const store = createStore(reducer, enhancer)
sagaMiddleware.run(mySaga)
export default store
