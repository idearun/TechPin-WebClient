import axios from 'axios';
import querystring from 'querystring'

require('core-js/fn/object/values')
require('core-js/fn/object/entries')

export const baseUrl = 'https://api.techpin.xyz';
var baseApiUrl = 'https://api.techpin.xyz';

var config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': '*/*'
  },
}

export default class techpinApi {

  //get methods

  static getTop25Products() {
    return axios.get(`${baseApiUrl}/products/top`);
    // .then(res => console.log(res));
  }

  static getAllProducts() {
    return axios.get(`${baseApiUrl}/products`);
    // .then(res => console.log(res));
  }

  static getAllcategories() {
    return axios.get(`${baseApiUrl}/categories`);
    // .then(res => console.log(res));
  }

  static getAllProductTypes() {
    return axios.get(`${baseApiUrl}/product_types`);
    // .then(res => console.log(res));
  }

  static getProductsByCategory(categorySlug) {
    return axios.get(`${baseApiUrl}/category/${categorySlug}/products`);
    // .then(res => console.log(res));
  }

  static getSingleProduct(slug) {
    return axios.get(`${baseApiUrl}/products/${slug}`);
    // .then(res => console.log(res));
  }

  static getPreviousUserRates(slug, tokenId) {
    let config = {
      headers: {
        'Accept': '*/*',
        'Authorization': 'Token ' + tokenId,
      },
    }
    return axios.get(`${baseApiUrl}/rates/${slug}`, config);
    // .then(res => console.log(res));
  }

  //// authentication

  static login(email, password) {
    let qs =  querystring.stringify({email, password})
    return axios.post(`${baseApiUrl}/login`, qs, config)
  }

  static googleLogin(tokenId) {
    return axios.post(`${baseApiUrl}/google-login`, `idtoken=${tokenId}`, config)
  }

  static signup(formData) {
    let qs =  querystring.stringify({...formData}) 
    return axios.post(`${baseApiUrl}/signup`, qs, config);
  }

  static logout() {
    return axios.get(`${baseApiUrl}/logout`);
    // .then(res => console.log(res));
  }

//user interactions

  static postNewRate(rate, slug, tokenId) {
    let config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Token ' + tokenId,
        'Accept': '*/*'
      },
    }
    const qs = querystring.stringify({rate});
    return axios.post(`${baseApiUrl}/products/${slug}/rate`, qs, config);
    // .then(res => console.log(res));
  }

  static postNewComment(text, slug, tokenId) {
    let config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Token ' + tokenId,
        'Accept': '*/*'
      },
    }
    const qs = querystring.stringify({text});
    return axios.post(`${baseApiUrl}/products/${slug}/comments`, qs, config);
    // .then(res => console.log(res));
  }

  static postNewVersion(formData, slug, tokenId) {
    let config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Token ' + tokenId,
        'Accept': '*/*'
      },
    }
    // const qs = querystring.stringify(newVersionFields);
    return axios.patch(`${baseApiUrl}/products/${slug}/versions/add`, formData, config)
    // .then(res => console.log(res));
  }

  static postNewProduct(formData) {
    const qs = querystring.stringify(formData);
    return axios.post(`${baseApiUrl}/products/add`, qs, config)
  }

  static postFirstVersion(formData, slug) {
    // const qs = querystring.stringify(newVersionFields);
    return axios.patch(`${baseApiUrl}/products/${slug}/versions/add`, formData, config);
    // .then(res => console.log(res));
  }


}
