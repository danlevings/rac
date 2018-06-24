import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BasketPopup from './BasketPopup';
import LoginRegisterModal from './LoginRegisterModal';
import { withRouter } from "react-router-dom";

import { connect } from 'react-redux'
import { checkAuth, logout } from '../store/modules/auth'
import { getProducts } from '../store/modules/products'
import { bindActionCreators } from 'redux'

class TopBar extends Component {

  state = {
    isBasketOpen: false,
    isLoginRegisterModalOpen: false,
  }
    
  componentDidMount = () => {
    if (this.props.productIds.length <= 0) {
      this.props.getProducts();
    }
    this.props.checkAuth();
  }

  toggleBasket = () => {
    this.setState({
      isBasketOpen: !this.state.isBasketOpen,
    })
  }

  toggleLoginRegister = () => {
    const { authorized } = this.props;
    if (!authorized) {
      this.setState({
        isLoginRegisterModalOpen: !this.state.isLoginRegisterModalOpen,
      });
    } else {
      this.props.logout();
    }
  }

  closeLoginRegister = () => {
    this.setState({
      isLoginRegisterModalOpen: false,
    });
  }

  onCheckoutClick = () => {
    this.props.history.push('/checkout');
    this.setState({
      isBasketOpen: false,
    })
  }

  render() {
    const { authorized, user } = this.props;
    return (
      <div className="top-bar">
        <ul>
            <li onClick={this.toggleLoginRegister}>{authorized ? `Hello, ${user.firstName}!` : 'Sign in or register'} <i className="fa fa-user"></i></li>
            <li>EN</li>
            <li onClick={this.toggleBasket}><i className="fa fa-shopping-cart"></i> ({this.props.basket.length})</li>
        </ul>

        <BasketPopup isOpen={this.state.isBasketOpen} onCheckoutClick={this.onCheckoutClick} />
        <LoginRegisterModal isOpen={this.state.isLoginRegisterModalOpen} onClose={this.closeLoginRegister}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  basket: state.basket.basket,
  authorized: state.auth.authorized,
  productIds: state.products.productIds,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  checkAuth,
  logout,
  getProducts,
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopBar));
