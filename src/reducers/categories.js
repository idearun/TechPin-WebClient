import * as actionTypes from '../actions/actionTypes';
import { sortByName } from '../helpers/helpers'
export default function categories(state = [], action) {

    switch (action.type) {

        case actionTypes.INITIAL_CATEGORIES_LOAD:
          return action.categories.sort(sortByName);
          break;

        default:
            return state;
    }
}