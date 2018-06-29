import axios from 'axios';
import { API_URL } from './utils';

export const GET_PRODUCTS_REQUEST = 'basket/GET_PRODUCTS_REQUEST'
export const GET_PRODUCTS = 'basket/GET_PRODUCTS'

const initialState = {
  products: {}, // Product ids only
  productIds: [],
  isLoading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      }

    case GET_PRODUCTS:
      const products = {};
      action.products.forEach(product => {
        products[product.id] = product;
      })
      return {
        ...state,
        isLoading: false,
        products: products,
        productIds: Object.keys(products),
      }

    default:
      return state
  }
}

export const getProducts = () => {
  return dispatch => {
    dispatch({
      type: GET_PRODUCTS_REQUEST
    })
    return axios.get(`${API_URL}/products`).then(result => {
      const products = result.data.map(p => ({
        description: p.description,
        id: p.id,
        name: p.name,
        price: p.price,
        shippingPrice: p.shippingPrice,
        images: p.images.map(pi => `http://ec2-54-93-35-40.eu-central-1.compute.amazonaws.com/api/public/images/${pi.image}`),
        tags: p.tags.map(t => ({
          name: t.name,
          type: t.type,
        }))
      }))

      dispatch({
        type: GET_PRODUCTS,
        products: products,
      })
    });
  }
}