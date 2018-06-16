import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BasketPopup from './BasketPopup';
import { withRouter } from "react-router-dom";

import { connect } from 'react-redux'
import { removeFromCart } from '../store/modules/basket'
import { bindActionCreators } from 'redux'

class TopBar extends Component {

  state = {
    isBasketOpen: false,
  }

  toggleBasket = () => {
    this.setState({
      isBasketOpen: !this.state.isBasketOpen,
    })
  }

  onCheckoutClick = () => {
    this.props.history.push('/checkout');
    this.setState({
      isBasketOpen: false,
    })
  }

  render() {
    return (
      <div className="top-bar">
        <ul>
            <li>Click to Sign in <i className="fa fa-user"></i></li>
            <li>EN</li>
            <li onClick={this.toggleBasket}><i className="fa fa-shopping-cart"></i>({this.props.basket.length})</li>
        </ul>

        <BasketPopup isOpen={this.state.isBasketOpen} onCheckoutClick={this.onCheckoutClick}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.products,
  basket: state.basket.basket,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  removeFromCart
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopBar));
