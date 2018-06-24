import axios from 'axios';
import { API_URL } from './utils';
import { MERGE_CART_CONTENTS } from './basket';

export const LOGIN_REQUEST = 'auth/REQUEST_LOGIN';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

export const REGISTER_REQUEST = 'auth/REQUEST_REGISTER';
export const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';

export const CHECK_AUTH_SUCCESS = 'auth/CHECK_AUTH_SUCCESS';
export const CHECK_AUTH_FAILURE = 'auth/CHECK_AUTH_FAILURE';

export const LOGOUT = 'auth/LOGOUT';

const initialState = {
  authorized: false,
  user: {},
  isLoggingIn: false,
  isRegistering: false,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        error: null,
      }

    case LOGIN_SUCCESS:
      return {
        ...state,
        authorized: true,
        user: action.user,
        isLoggingIn: false,
        error: null,
      }

    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        error: action.error,
      }

    case CHECK_AUTH_SUCCESS:
      return {
        ...state,
        authorized: true,
        user: action.user,
        error: null,
      }

    case CHECK_AUTH_FAILURE:
      return {
        ...state,
        authorized: false,
        error: null,
      }

    case REGISTER_REQUEST:
      return {
        ...state,
        isRegistering: true,
        error: null,
      }

    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.user,
        authorized: true,
        isRegistering: false,
        error: null,
      }

    case REGISTER_FAILURE:
      return {
        ...state,
        isRegistering: false,
        error: action.error,
      }
    
    case LOGOUT:
      return {
        ...state,
        authorized: false,
        user: {},
        error: null,
      }

    default:
      return state
  }
}

export const login = (email, password) => {
  return dispatch => {
    dispatch({
      type: LOGIN_REQUEST,
    });
    return axios.post(`${API_URL}/login`, { email, password }).then(result => {
      console.log(result);
      if (typeof result.data.user === 'undefined') {
        dispatch({
          type: LOGIN_FAILURE,
          error: result.data,
        })
      } else {
        localStorage.setItem('USER_TOKEN', result.data.token);
        dispatch({
          type: LOGIN_SUCCESS,
          user: result.data.user,
        });
        
        dispatch({
          type: MERGE_CART_CONTENTS,
          basket: result.data.user.products.map(b => b.id),
        });
      }
    });
  }
}

export const register = (firstName, lastName, email, password) => {
  return dispatch => {
    dispatch({
      type: REGISTER_REQUEST,
    });
    return axios.post(`${API_URL}/register`, { firstName, lastName, email, password }).then(result => {
      if (typeof result.data.user === 'undefined') {
        dispatch({
          type: REGISTER_FAILURE,
          error: result.data,
        })
      } else {
        localStorage.setItem('USER_TOKEN', result.data.token);
        dispatch({
          type: REGISTER_SUCCESS,
          user: result.data.user,
        });
      }
    });
  }
}

export const checkAuth = () => {
  return dispatch => {
    const USER_TOKEN = localStorage.getItem('USER_TOKEN');
    if (typeof USER_TOKEN === 'undefined') {
      return;
    }
    return axios.post(`${API_URL}/user`, { token: USER_TOKEN }).then(result => {
      if (typeof result.data.user === 'undefined') {
        localStorage.removeItem('USER_TOKEN');
        dispatch({
          type: CHECK_AUTH_FAILURE,
        })
      } else {
        dispatch({
          type: CHECK_AUTH_SUCCESS,
          user: result.data.user,
        });
        dispatch({
          type: MERGE_CART_CONTENTS,
          basket: result.data.user.products.map(b => b.id),
        })
      }
    }).catch(() => dispatch({
      type: CHECK_AUTH_FAILURE,
    }));
  }
}

export const logout = () => {
  return dispatch => {
    const USER_TOKEN = localStorage.getItem('USER_TOKEN');
    localStorage.removeItem('USER_TOKEN');
    dispatch({
      type: LOGOUT,
    });
    return axios.post(`${API_URL}/logout`, { token: USER_TOKEN });
  }
}