import * as actionTypes from '../actions/actionTypes';

export default function allProducts(state = [], action) {

    switch (action.type) {

        case actionTypes.LOAD_ALL_PRODUCTS:
          return action.allProducts.products;
          break;

        default:
            return state;
    }
}
