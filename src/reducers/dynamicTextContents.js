import * as actionTypes from '../actions/actionTypes'

export default function dynamicTextContents(state = {}, action) {
  switch (action.type) {
    case actionTypes.LOAD_DYNAMIC_CONTENT_SUCCESS:
      return { ...action.items }

    default:
      return state
  }
}
