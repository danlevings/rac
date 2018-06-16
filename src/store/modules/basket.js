export const GET_CART_CONTENTS_REQUEST = 'basket/GET_CART_CONTENTS_REQUEST'
export const GET_CART_CONTENTS = 'basket/GET_CART_CONTENTS'

export const ADD_TO_CART_REQUEST = 'basket/ADD_TO_CART_REQUEST'
export const ADD_TO_CART = 'basket/ADD_TO_CART'

export const REMOVE_FROM_CART_REQUEST = 'basket/REMOVE_FROM_CART_REQUEST'
export const REMOVE_FROM_CART = 'basket/REMOVE_FROM_CART'

const initialState = {
  basket: [], // Product ids only
  deliveryCharge: 0,
  isLoading: false,
  isAddingToCart: false,
  isRemovingFromCart: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_CONTENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      }

    case GET_CART_CONTENTS:
      return {
        ...state,
        isLoading: false,
        basket: action.basket,
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
        basket: state.basket.filter(item => item.id === action.id),
        isRemovingFromCart: false,
      }

    default:
      return state
  }
}

export const getCartContents = () => {
  return dispatch => {
    dispatch({
      type: GET_CART_CONTENTS_REQUEST
    })

    return setTimeout(() => {
      dispatch({
        type: GET_CART_CONTENTS
      })
    }, 500)
  }
}

export const addToCart = (id) => {
    return dispatch => {
      dispatch({
        type: ADD_TO_CART_REQUEST,
      })
  
      return setTimeout(() => {
        dispatch({
          type: ADD_TO_CART,
          id,
        })
      }, 500)
    }
  }

  export const removeFromCart = (id) => {
    return dispatch => {
      dispatch({
        type: REMOVE_FROM_CART_REQUEST
      })
  
      return setTimeout(() => {
        dispatch({
          type: REMOVE_FROM_CART,
          id,
        })
      }, 500)
    }
  }
  