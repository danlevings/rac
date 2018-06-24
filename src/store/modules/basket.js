import axios from 'axios';
import { API_URL } from './utils';
import { CHECK_AUTH_SUCCESS } from './auth';

export const SYNC_CART_CONTENTS_REQUEST = 'basket/SYNC_CART_CONTENTS_REQUEST'
export const SYNC_CART_CONTENTS = 'basket/SYNC_CART_CONTENTS'
export const MERGE_CART_CONTENTS = 'basket/MERGE_CART_CONTENTS';

export const ADD_TO_CART_REQUEST = 'basket/ADD_TO_CART_REQUEST'
export const ADD_TO_CART = 'basket/ADD_TO_CART'

export const REMOVE_FROM_CART_REQUEST = 'basket/REMOVE_FROM_CART_REQUEST'
export const REMOVE_FROM_CART = 'basket/REMOVE_FROM_CART'

export const CHECKOUT_REQUEST = 'basket/CHECKOUT_REQUEST'
export const CHECKOUT = 'basket/CHECKOUT'

const initialState = {
  basket: [], // Product ids only
  deliveryCharge: 0,
  isLoading: false,
  isAddingToCart: false,
  isRemovingFromCart: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SYNC_CART_CONTENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      }

    case SYNC_CART_CONTENTS:
      return {
        ...state,
        isLoading: false,
        basket: action.basket,
      }

    case MERGE_CART_CONTENTS:
      return {
        ...state,
        isLoading: false,
        basket: [...state.basket, ...action.basket],
      }

    case ADD_TO_CART_REQUEST:
      return {
        ...state,
        isAddingToCart: true,
      }
      
    case ADD_TO_CART:
      return {
        ...state,
        basket: [ ...state.basket, action.id],
        isAddingToCart: false,
      }

    case REMOVE_FROM_CART_REQUEST:
      return {
        ...state,
        isRemovingFromCart: true,
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        basket: state.basket.filter(id => id !== action.id),
        isRemovingFromCart: false,
      }

    case CHECKOUT:
      return {
        ...state,
        basket: [],
      }

    default:
      return state
  }
}

export const syncCartContents = (productIds = null) => {
  return dispatch => {
    dispatch({
      type: SYNC_CART_CONTENTS_REQUEST
    })

    const USER_TOKEN = localStorage.getItem('USER_TOKEN');

    if (productIds) {
      return axios.post(`${API_URL}/basket`, { token: USER_TOKEN, productIds }).then(result => {
        dispatch({
          type: SYNC_CART_CONTENTS,
          basket: result.data.map(x => x.id),
        })
      });
    }

    return axios.post(`${API_URL}/basket`, { token: USER_TOKEN }).then(result => {
      dispatch({
        type: SYNC_CART_CONTENTS,
        basket: result.data.map(x => x.id),
      })
    });
    
    
  }
}

export const addToCart = productId => {
  return dispatch => {
    dispatch({
      type: ADD_TO_CART_REQUEST,
    })

    const USER_TOKEN = localStorage.getItem('USER_TOKEN');

    dispatch({
      type: ADD_TO_CART,
      id: productId,
    })

    if (USER_TOKEN) {
      return axios.post(`${API_URL}/basket/add`, { token: USER_TOKEN, productId });
    }
  }
}

export const removeFromCart = productId => {
  return dispatch => {
    dispatch({
      type: REMOVE_FROM_CART_REQUEST
    })

    const USER_TOKEN = localStorage.getItem('USER_TOKEN');

    dispatch({
      type: REMOVE_FROM_CART,
      id: productId,
    })

    if (USER_TOKEN) {
      return axios.post(`${API_URL}/basket/remove`, { token: USER_TOKEN, productId });
    }

    return {};
  }
}

export const checkout = (productIds, email, addressDetails) => {
  return dispatch => {
    dispatch({
      type: CHECKOUT_REQUEST
    })

    const USER_TOKEN = localStorage.getItem('USER_TOKEN');
    if (USER_TOKEN) {
      return axios.post(`${API_URL}/checkout`, { token: USER_TOKEN, addressDetails }).then(result => {
        dispatch({
          type: CHECKOUT,
        })
        dispatch({
          type: CHECK_AUTH_SUCCESS,
          user: result.data.user,
        });
      });
    } else {
      return axios.post(`${API_URL}/checkout`, { basket: productIds, email }).then(result => {
        dispatch({
          type: CHECKOUT,
        })
        
        dispatch({
          type: CHECK_AUTH_SUCCESS,
          user: result.data.user,
        });
      });
    }
  }
}
  