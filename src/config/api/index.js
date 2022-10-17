import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {AppAction} from '../../store/actions';
import Store from '../../store';
import {NavigationService} from '..';

const baseUrl = 'https://jamesclub248.com.br/';
/* The following lines will add access token in every request to server */

// let userAccessToken = Store.getState()?.AppReducer?.user?.access_token ? Store.getState()?.AppReducer?.user?.access_token : "";
// Axios.defaults.headers.common['access_token'] = userAccessToken;

// Axios.interceptors.response.use((response) => {
//     return response
// }, ({ response }) => {
//     if (response.status == 401) {
//         try {
//             AsyncStorage.removeItem("user").then(() => {
//                 Store.dispatch(AppAction.SignoutSuccess());
//                 NavigationService.reset_0("Signin")
//             })
//             console.log('%c{Error 401}', "color: red", response)
//         }
//         catch (err) {
//             console.log(`%c${err.name}`, "color: red", err?.message)
//         }
//     } else {
//         let status = response?.status.toString()
//         console.log(`%c${status[0] == "2" ? "Response " : "Error " + status}`, `color: ${status[0] == "2" ? "green" : "red"}`, response)
//     }
//     return response
// })

export default class ApiCaller {
  static url = baseUrl;
  static Get = (endPoint = '', headers = {}, customUrl = '') => {
    if (headers['user_id']) {
      headers['user-id'] = headers['user_id'];
      headers['access-token'] = headers['access_token'];
    }
    return Axios.get(customUrl ? customUrl : `${baseUrl}${endPoint}`, {
      headers: {'Content-Type': 'application/json', ...headers},
    })
      .then(res => res)
      .catch(err => err.response);
  };
  static PostMultipart = (endPoint = '', body = {}, headers = {}) => {
    return Axios.post(`${baseUrl}${endPoint}`, body, {
      headers: {'Content-Type': 'multipart/form-data ', ...headers},
    })
      .then(res => res)
      .catch(err => err.response);
  };
  static Post = (endPoint = '', body = {}, headers = {}) => {
    if (headers['user_id']) {
      headers['user-id'] = headers['user_id'];
      headers['access-token'] = headers['access_token'];
    }
    return Axios.post(`${baseUrl}${endPoint}`, body, {
      headers: {'Content-Type': 'application/json', ...headers},
    })
      .then(res => res)
      .catch(err => err.response);
  };
  // static Post = (endPoint = "", body = {}, headers = {}) => {
  //     return Axios.post(`${endPoint}`, body, {
  //         headers
  //     }).then((res) => res).catch((err) => err.response)
  // }

  static Put = (endPoint = '', body = {}, headers = {}) => {
    return Axios.put(`${endPoint}`, body, {
      headers,
    })
      .then(res => res)
      .catch(err => err.response);
  };
}
