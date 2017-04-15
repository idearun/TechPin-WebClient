import * as actionTypes from './actionTypes';
import techpinApi from '../api/realApi';

//************************// Action Creators and helpers //************************//

function singleProductActionCreator(product) {
  return {
    type: actionTypes.SINGLE_PAGE_LOAD,
    product
  }
}

function getProductsByCategoryActionCreator(products, categorySlug) {
  return {
    type: actionTypes.CATEGORY_ITEMS_FETCH_SUCCESS,
    products,
    categorySlug
  }
}

function allProductsActionCreator(allProducts) {
  return {
    type: actionTypes.LOAD_ALL_PRODUCTS,
    allProducts
  }
}

function successfulFetchUserRates(res, slug) {
  return {
    type: actionTypes.USER_RATES_FETCH_SUCCESS,
    userRates: res,
    slug
  }
}

function initialLoadTop25ActionCreator(response) {
  return {
    type: actionTypes.INITIAL_TOP25_LOAD,
    topNew: response.top_new,
    topRanked: response.top_ranked,
    randomProducts: response.random_products
  }
}


function successfulLogin(response) {
  return {
    type: actionTypes.SUCCESSFUL_LOGIN,
    response
  }
}

function failedLogin(response) {
  return {
    type: actionTypes.FAILED_LOGIN,
    response
  }
}

function successfulNewComment(commentData, slug) {
  return {
    type: actionTypes.POST_NEW_COMMENT,
    commentData,
    slug
  }
}

function successfulNewRate(response, slug) {
  return {
    type: actionTypes.SUCCESSFUL_NEW_RATE_SUBMIT,
    newRating: response.new_p_rate,
    newRateCount: response.p_rate_count,
    slug
  }
}

//************************//  Async Actions //************************//

//******** PART 1: Initial Loadings ********//


//first api call
export function loadIntialCategories() {
  return dispatch => {
    return techpinApi.getAllcategories()
    .then(
      (response) => {
        dispatch({type: actionTypes.INITIAL_CATEGORIES_LOAD, categories: response.data.categories});
        return Promise.resolve();
      },
      (error) => {
        return Promise.reject(error);
      }
    )
  }
}

//second api call
export function loadIntialProductTypes() {
  return dispatch => {
    return techpinApi.getAllProductTypes()
    .then(
      (response) => {
        dispatch({type: actionTypes.INITIAL_PRODUCT_TYPES_LOAD, productTypes: response.data.product_types});
        return Promise.resolve();
      },
      (error) => {
        return Promise.reject(error);
      }
    )
  }
}

//third initial call
export function initialLoadTop25() {
  return dispatch => {
    return techpinApi.getTop25Products()
      .then(response => {
        dispatch(initialLoadTop25ActionCreator(response.data));
        return Promise.resolve(response.data)
      })
  }
}


//******** PART 2: On Demand Calls ********//

export function submitProduct(formData) {
  //use real api here
  return dispatch => {
    return techpinApi.postNewProduct(formData)
      .then(
        (response) => {
          if (response.status === 200 && response.data.success) {
            return Promise.resolve(response.data)
          } else {
            return Promise.reject(response.data)
          }
        },
        (res) => {
           return res
         }
       )
  }
}

export function signupUser(formData) {
  return dispatch => {
    return techpinApi.signup(formData) // instead of this start a new ajax call with and send the formdata
    .then(
      (response) => {
        console.clear();
        return Promise.resolve(response.data)
      },
      (response) => {
        console.clear();
        return Promise.reject(response.data)
      }
    )
  }
}

export function authenticate(username, password) {
  return dispatch => {
    return techpinApi.login(username, password)
      .then(
        (response) => {
          if (response.data.success) {
            const authData = {
              'api-token': response.data['api-token'],
              username: response.data.user.username
            }
            sessionStorage.setItem('techpin', JSON.stringify(authData))
            dispatch(successfulLogin(response.data))
          }
          console.clear();
          return Promise.resolve(response.data)
        },
        (response) => {
           dispatch(failedLogin(response.data))
           console.clear();
           return Promise.reject(response.data)
         }
       )
  }
}

export function getSingleProduct(slug) {
  return dispatch => {
    return techpinApi.getSingleProduct(slug)
      .then(
        (response) => {
          dispatch(singleProductActionCreator(response.data))
          return Promise.resolve(response.data)
        },
        (response) => {
           return Promise.reject(response.data)
         }
       )
  }
}

export function getAllProducts() {
  return dispatch => {
    return techpinApi.getAllProducts()
      .then(
        (response) => {
          dispatch(allProductsActionCreator(response.data))
          return Promise.resolve(response.data.products)
        },
        (error) => {
           return Promise.reject(error)
         }
       )
  }
}

export function getProductsByCategory(categorySlug) {
  return dispatch => {
    return techpinApi.getProductsByCategory(categorySlug)
      .then(
        (response) => {
          dispatch(getProductsByCategoryActionCreator(response.data.products, categorySlug))
          return Promise.resolve(response.data.products)
        },
        (error) => {
           return Promise.reject(error)
         }
       )
  }
}


export function submitAddNewVersion(formData, slug) {
  //this is a form data, to access data in it, you should use it's methods
  return (dispatch, getState) => {
    const tokenId = getState().auth.token
    return techpinApi.postNewVersion(formData, slug, tokenId)
      .then(
        (response) => {
          if (response.data.success) {
            return Promise.resolve(response)
          } else {
            return Promise.reject(response)
          }
        },
        (response) => {
           return Promise.reject(response)
         }
       )
  }
}

export function submitAddFirstVersion(formData, slug) {
  //this is a form data, to access data in it, you should use it's methods
  return (dispatch, getState) => {
    return techpinApi.postFirstVersion(formData, slug)
      .then(
        (response) => {
          if (response.data.success) {
            return Promise.resolve(response)
          } else {
            return Promise.reject(response)
          }
        },
        (response) => {
           return Promise.reject(response)
         }
       )
  }
}


export function postNewComment(commentData, slug) {
  return (dispatch, getState) => {
    const tokenId = getState().auth.token
    return techpinApi.postNewComment(commentData.text, slug, tokenId)
      .then(
        (response) => {
          if (response.status === 200 && response.data.success) {
            dispatch(successfulNewComment(commentData, slug))
            return Promise.resolve(response)
          } else {
            return Promise.reject(response)
          }
        },
        (error) => {
           return Promise.reject(error)
         }
       )
  }
}

export function postNewRate(rate, slug) {
  return (dispatch, getState) => {
    const tokenId = getState().auth.token
    return techpinApi.postNewRate(rate, slug, tokenId)
      .then(
        (response) => {
          if (response.status === 200 && response.data.success) {
            dispatch(successfulNewRate(response.data, slug))
            return Promise.resolve(response)
          } else {
            return Promise.reject(response.data)
          }
        },
        (error) => {
           return Promise.reject(error)
         }
       )
  }
}

export function getPreviousUserRates(slug) {
  return (dispatch, getState) => {
    const tokenId = getState().auth.token
    return techpinApi.getPreviousUserRates(slug, tokenId)
      .then(
        (response) => {
          if (response.status === 200 && response.data.success) {
            dispatch(successfulFetchUserRates(response.data, slug))
            return Promise.resolve(response)
          } else {
            return Promise.reject(response.data)
          }
        },
        (error) => {
           return Promise.reject(error)
         }
       )
  }
}

export function OAuthLogIn(payLoad) {
  return dispatch => {
    return techpinApi.googleLogin(payLoad.tokenId)
      .then(
        (response) => {
          const authData = {
            'api-token': response.data['api-token'],
            username: response.data.user.username
          }
          sessionStorage.setItem('techpin', JSON.stringify(authData))
          dispatch(successfulLogin(response.data))
          return Promise.resolve(response.data)
        },
        (error) => {
           return Promise.reject(error)
         }
       )
  }
}

export function logOut() {
  sessionStorage.removeItem('techpin')
  techpinApi.logout()
  return {
    type: actionTypes.LOG_OUT,
  };
}

export function wasAuthed(authObject) {
  return {
    type: actionTypes.WAS_LOGGED_IN,
    response: authObject
  }
}
