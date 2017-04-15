import * as actionTypes from '../actions/actionTypes';

export default function singleProducts(state = [], action) {

    switch (action.type) {

        case actionTypes.SINGLE_PAGE_LOAD:
          return [...state, action.product];
        break;


        case actionTypes.POST_NEW_COMMENT:
          let nextState = [...state];
          const commentIndex = nextState.findIndex(product => product.product.slug === action.slug);
          let startupToAddComment = nextState[commentIndex];
          if (startupToAddComment) {
            startupToAddComment.comments.unshift(action.commentData);
            nextState[commentIndex] = startupToAddComment;
          }
          return nextState
        break;

        default:
            return state;
    }
}
