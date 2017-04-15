import * as actionTypes from '../actions/actionTypes';

export default function startUps(state = [], action) {

    switch (action.type) {

        case actionTypes.INITIAL_LOAD:
          return action.list;
          break;

        case actionTypes.SUCCESSFUL_NEW_RATE_SUBMIT:
          const index = state.findIndex(startUp => startUp.id === action.productId);
          let startupToMutate = state[index];
          startupToMutate.rating = action.newRating;
          // startupToMutate.raters = action.raters;
          return [...state.slice(0, index), startupToMutate, ...state.slice(index + 1)];
        break;

        // case actionTypes.POST_NEW_COMMENT:
        //   let nextState = [...state];
        //   const index = nextState.findIndex(startUp => startUp.name === action.commentData.startupName);
        //   let startupToMutate = nextState[index];
        //   startupToMutate.comments.unshift(action.commentData);
        //   nextState[index] = startupToMutate;
        //   return nextState
        //   break;

        default:
            return state;
    }
}
