import { createStore, compose, applyMiddleware } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'
import rootReducer from '../reducers/index'
import thunk from 'redux-thunk'
import { wasAuthed } from '../actions/actionCreators'

import {
  loadIntialCategories,
  loadIntialProductTypes,
  initialLoadTop25,
} from '../actions/actionCreators'

// load initial state
const defaultState = {
  userRates: {},
  allProducts: {},
  categories: [],
  dynamicTextContents: {},
  auth: { authenticated: false },
  profile: { isLoading: false, profileData: null },
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  defaultState,
  composeEnhancers(applyMiddleware(thunk))
)

const authed = JSON.parse(localStorage.getItem('techpin'))
try {
  if (authed['api-token']) {
    store.dispatch(wasAuthed(authed))
  }
} catch (e) {
  // no-op
}

//load categories
store.dispatch(loadIntialCategories())

//load product types
store.dispatch(loadIntialProductTypes())

//load top25, remove depricated api call
store.dispatch(initialLoadTop25())

export const history = syncHistoryWithStore(browserHistory, store)
export default store
