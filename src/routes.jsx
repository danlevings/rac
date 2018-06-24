import React from 'react';
import { Route, Switch } from 'react-router';
 
// Module root components
import Home from './containers/HomeContainer';
import Contact from './containers/ContactContainer';
import Shop from './containers/ShopContainer';
import Orders from './containers/OrdersContainer';
import Checkout from './containers/CheckoutContainer';
import Thanks from './containers/ThanksContainer';
import Launch from './containers/LaunchBanner';

export default (
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/shop" component={Shop}/>
    <Route exact path="/orders" component={Orders}/>
    <Route exact path="/contact" component={Contact}/>
    <Route exact path="/checkout" component={Checkout}/>
    <Route exact path="/thanks" component={Thanks}/>
    <Route exact path="/launch" component={Launch}/>
    <Route path="*" component={() => <div>Page not found</div>} />
  </Switch>
);