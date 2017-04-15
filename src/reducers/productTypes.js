import * as actionTypes from '../actions/actionTypes';

export default function productTypes(state = [], action) {

    switch (action.type) {

        case actionTypes.INITIAL_PRODUCT_TYPES_LOAD:
          return action.productTypes;
          break;

        default:
            return state;
    }
}
