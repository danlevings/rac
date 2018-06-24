import { combineReducers } from 'redux'
import basket from './basket';
import products from './products';
import auth from './auth';

export default combineReducers({
  basket,
  products,
  auth,
})