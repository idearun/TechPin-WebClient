import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'; // to sync react router with redux store

import auth from './auth';
import allProducts from './allProducts';
import categories from './categories';
import productTypes from './productTypes';
import topProducts from './topProducts';
import singleProducts from './singleProducts';
import userRates from './userRates';
import byCategory from './byCategory';

const rootReducer = combineReducers({
  auth,
  userRates,
  allProducts,
  categories,
  byCategory,
  productTypes,
  topProducts,
  singleProducts,
  routing: routerReducer
});

export default rootReducer;
