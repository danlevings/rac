import React from 'react';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
 
// Module root components
import Home from './containers/HomeContainer';
import Contact from './containers/ContactContainer';
import Shop from './containers/ShopContainer';
import Orders from './containers/OrdersContainer';
import Checkout from './containers/CheckoutContainer';
import Thanks from './containers/ThanksContainer';

export default (
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/shop" component={Shop}/>
    <Route exact path="/orders" component={Orders}/>
    <Route exact path="/contact" component={Contact}/>
    <Route exact path="/checkout" component={Checkout}/>
    <Route exact path="/thanks" component={Thanks}/>
    <Route path="*" component={() => <div style={{ margin: 64, textAlign: 'center' }}><Link to="/">Page not found, click here to return to home</Link></div>} />
  </Switch>
);