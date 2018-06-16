import fireplace1 from '../../assets/fireplace-1.png';
import fireplace2 from '../../assets/fireplace-2.png';
import fireplace3 from '../../assets/fireplace-3.png';
import fireplace4 from '../../assets/fireplace-4.png';

export const GET_PRODUCTS_REQUEST = 'basket/GET_PRODUCTS_REQUEST'
export const GET_PRODUCTS = 'basket/GET_PRODUCTS'

const dummyProducts = [
  {
    id: 0,
    image: fireplace1,
    tag: 'new',
    title: 'Rustic 18th Century Metal Fireplace',
    price: 50000,
  },
  {
    id: 1,
    image: fireplace2,
    tag: '',
    title: 'Windsor Small Victorian Style Gas Insert',
    price: 50000,
  },
  {
    id: 2,
    image: fireplace3,
    tag: '',
    title: '19th Century Modernized Bohemian Fireplace',
    price: 50000,
  },
  {
    id: 3,
    image: fireplace4,
    tag: '',
    title: 'Belfast Cast Iron ',
    price: 50000,
  },
  {
    id: 4,
    image: fireplace1,
    tag: 'new',
    title: 'Rustic 18th Century Metal Fireplace',
    price: 50000,
  },
  {
    id: 5,
    image: fireplace2,
    tag: '',
    title: 'Windsor Small Victorian Style Gas Insert',
    price: 50000,
  },
  {
    id: 6,
    image: fireplace3,
    tag: '',
    title: '19th Century Modernized Bohemian Fireplace',
    price: 50000,
  },
  {
    id: 7,
    image: fireplace4,
    tag: '',
    title: 'Belfast Cast Iron ',
    price: 50000,
  }
]

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

    return setTimeout(() => {
      dispatch({
        type: GET_PRODUCTS,
        products: dummyProducts,
      })
    }, 500)
  }
}