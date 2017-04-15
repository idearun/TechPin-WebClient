import * as actionTypes from "../actions/actionTypes";

export default function categories(state = {}, action) {
  switch (action.type) {
    case actionTypes.CATEGORY_ITEMS_FETCH_SUCCESS:
      return Object.assign({}, state, {[action.categorySlug]: action.products});
      break;

    default:
      return state;
  }
}
