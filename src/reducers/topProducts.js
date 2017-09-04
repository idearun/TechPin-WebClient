import * as actionTypes from "../actions/actionTypes";

export default function topProducts(state = [], action) {
  switch (action.type) {
    case actionTypes.INITIAL_TOP25_LOAD:
      return {
        topNew: action.topNew,
        plus10Million: action.plus10Million,
        between1And10Million: action.between1And10Million
      };
      break;

    case actionTypes.SUCCESSFUL_NEW_RATE_SUBMIT:
      //there are duplicate items in different categories
      const indexInNew =
        state.topNew &&
        state.topNew.findIndex(product => product.slug === action.slug);
      const indexInPlus10Million =
        state.plus10Million &&
        state.plus10Million.findIndex(product => product.slug === action.slug);
      const indexInBetween1And10Million =
        state.between1And10Million &&
        state.between1And10Million.findIndex(
          product => product.slug === action.slug
        );

      var startupToMutateInNew,
        startupToMutateInPlus10Million,
        startupToMutateInBetween1And10Million,
        newBetween1And10Million,
        newTopNew,
        newPlus10Million;
      if (Object.keys(state).length > 0) {
        if (indexInNew && indexInNew !== -1) {
          startupToMutateInNew = state.topNew[indexInNew];
          startupToMutateInNew.rate_count = action.newRateCount;
          startupToMutateInNew.average_p_rate = action.newRating;
          newTopNew = [
            ...state.topNew.slice(0, indexInNew),
            startupToMutateInNew,
            ...state.topNew.slice(indexInNew + 1)
          ];
        }
        if (indexInPlus10Million && indexInPlus10Million !== -1) {
          startupToMutateInPlus10Million =
            state.plus10Million[indexInPlus10Million];
          startupToMutateInPlus10Million.rate_count = action.newRateCount;
          startupToMutateInPlus10Million.average_p_rate = action.newRating;
          newPlus10Million = [
            ...state.plus10Million.slice(0, indexInPlus10Million),
            startupToMutateInPlus10Million,
            ...state.plus10Million.slice(indexInPlus10Million + 1)
          ];
        }
        if (indexInBetween1And10Million && indexInBetween1And10Million !== -1) {
          startupToMutateInBetween1And10Million =
            state.between1And10Million[indexInBetween1And10Million];
          startupToMutateInBetween1And10Million.rate_count =
            action.newRateCount;
          startupToMutateInBetween1And10Million.average_p_rate =
            action.newRating;
          newBetween1And10Million = [
            ...state.between1And10Million.slice(0, indexInBetween1And10Million),
            startupToMutateInBetween1And10Million,
            ...state.between1And10Million.slice(indexInBetween1And10Million + 1)
          ];
        }
        return Object.assign(
          {},
          {
            topNew: newTopNew || state.topNew,
            plus10Million: newPlus10Million || state.plus10Million,
            between1And10Million:
              newBetween1And10Million || state.between1And10Million
          }
        );
      } else {
        return state;
      }

      break;

    default:
      return state;
  }
}
