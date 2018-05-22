import * as actionTypes from '../actions/actionTypes'

export default function auth(state = [], action) {
  switch (action.type) {
    case actionTypes.SUCCESSFUL_LOGIN:
      return {
        authenticated: true,
        token: action.response['api-token'],
        ...action.response.user,
      }

    case actionTypes.WAS_LOGGED_IN:
      return {
        authenticated: true,
        token: action.response['api-token'],
        ...action.response.user,
      }

    case actionTypes.LOG_OUT:
      return Object.keys(state).reduce((acc, current) => {
        acc[current] = null
        return acc
      }, {})

    default:
      return state
  }
}
