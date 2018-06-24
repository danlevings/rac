import React from 'react';
import { Route, Switch } from 'react-router';
 
// Module root components
import Home from './containers/HomeContainer';
import Contact from './containers/ContactContainer';
import Shop from './containers/ShopContainer';
import Checkout from './containers/CheckoutContainer';
import Thanks from './containers/ThanksContainer';

export default (
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/shop" component={Shop}/>
    <Route exact path="/shop/product/:id" component={Shop}/>
    <Route exact path="/shop/category/:id" component={Shop}/>
    <Route exact path="/shop/tag/:id" component={Shop}/>
    <Route exact path="/contact" component={Contact}/>
    <Route exact path="/checkout" component={Checkout}/>
    <Route exact path="/thanks" component={Thanks}/>
    <Route path="*" component={() => <div>Page not found</div>} />
  </Switch>
);