import * as actionTypes from '../actions/actionTypes'

export default function auth(state = [], action) {
  switch (action.type) {
    case actionTypes.SUCCESSFUL_LOGIN:
      return {
        authenticated: true,
        token: action.response['api-token'],
        username: action.response.user.username
      }

    case actionTypes.WAS_LOGGED_IN:
      return {
        authenticated: true,
        token: action.response['api-token'],
        username: action.response.username
      }

    case actionTypes.LOG_OUT:
      return { authenticated: false, token: null, username: null }

    default:
      return state
  }
}
