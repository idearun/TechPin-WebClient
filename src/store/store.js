import {createStore, compose, applyMiddleware} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';
import rootReducer from '../reducers/index';
import {loadIntialCategories, loadIntialProductTypes, initialLoadTop25} from '../actions/actionCreators';
import thunk from 'redux-thunk';

// laod initial state
const defaultState = {
  userRates: {},
  allProducts: {},
  categories: [],
  auth: {authenticated: false},
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  defaultState,
  composeEnhancers(applyMiddleware(thunk))
);

//load categories
store.dispatch(loadIntialCategories());

//load product types
store.dispatch(loadIntialProductTypes());

//load top25, remove depricated api call
store.dispatch(initialLoadTop25());


export const history = syncHistoryWithStore(browserHistory, store);
export default store;
