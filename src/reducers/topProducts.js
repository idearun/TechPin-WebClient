import * as actionTypes from '../actions/actionTypes';

export default function topProducts(state = [], action) {

    switch (action.type) {
  
        case actionTypes.INITIAL_TOP25_LOAD:
          return {
            topNew: action.topNew,
            topRanked: action.topRanked,
            randomProducts: action.randomProducts
          };
          break;

          case actionTypes.SUCCESSFUL_NEW_RATE_SUBMIT:
         //there are duplicate items in different categories
          const indexInNew = state.topNew && state.topNew.findIndex(product => product.slug === action.slug);
          const indexInTopRanked = state.topRanked && state.topRanked.findIndex(product => product.slug === action.slug);
          const indexInRandomProducts = state.randomProducts && state.randomProducts.findIndex(product => product.slug === action.slug);

          var startupToMutateInNew, startupToMutateInTopRanked, startupToMutateInRandomProducts,
              newRandomProducts, newTopNew, newTopRanked
          if(Object.keys(state).length > 0) {
            if(indexInNew && indexInNew !== -1) {
              startupToMutateInNew = state.topNew[indexInNew]
              startupToMutateInNew.rate_count = action.newRateCount
              startupToMutateInNew.average_p_rate = action.newRating
              newTopNew = [...state.topNew.slice(0, indexInNew), startupToMutateInNew, ...state.topNew.slice(indexInNew + 1)]
            }
            if(indexInTopRanked && indexInTopRanked !== -1) {
              startupToMutateInTopRanked = state.topRanked[indexInTopRanked]
              startupToMutateInTopRanked.rate_count = action.newRateCount
              startupToMutateInTopRanked.average_p_rate = action.newRating
              newTopRanked = [...state.topRanked.slice(0, indexInTopRanked), startupToMutateInTopRanked, ...state.topRanked.slice(indexInTopRanked + 1)]
            }
            if(indexInRandomProducts && indexInRandomProducts !== -1) {
              startupToMutateInRandomProducts = state.randomProducts[indexInRandomProducts]
              startupToMutateInRandomProducts.rate_count = action.newRateCount
              startupToMutateInRandomProducts.average_p_rate = action.newRating
              newRandomProducts = [...state.randomProducts.slice(0, indexInRandomProducts), startupToMutateInRandomProducts, ...state.randomProducts.slice(indexInRandomProducts + 1)]
            }
            return Object.assign({}, {topNew: newTopNew || state.topNew,
              topRanked: newTopRanked || state.topRanked, 
              randomProducts: newRandomProducts || state.randomProducts
            })
              
          } else {
            return state
          }
          
        break;

        default:
            return state;
    }
}
