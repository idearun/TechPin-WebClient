import * as actionTypes from '../actions/actionTypes'

export default function profile(state = [], action) {
  switch (action.type) {
    case actionTypes.UPDATE_PROFILE_REQUEST:
    case actionTypes.FETCH_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
      }

    case actionTypes.FETCH_PROFILE_SUCCESS:
    case actionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        profileData: action.profile,
        isLoading: false,
      }

    case actionTypes.FETCH_PROFILE_FAIL:
    case actionTypes.UPDATE_PROFILE_FAIL:
      return {
        profileData: {},
        hadError: true,
        isLoading: false,
      }

    default:
      return state
  }
}
