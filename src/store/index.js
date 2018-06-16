import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './modules'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'

export const history = createHistory()

const initialState = {}
const enhancers = []
const middleware = [
  thunk,
  logger
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store