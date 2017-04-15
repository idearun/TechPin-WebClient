import * as actionTypes from '../actions/actionTypes';

export default function userRates(state = {}, action) {

    switch (action.type) {

        case actionTypes.USER_RATES_FETCH_SUCCESS:
          return {...state, [action.slug]: action.userRates}
          break;

        default:
            return state;
    }
}
