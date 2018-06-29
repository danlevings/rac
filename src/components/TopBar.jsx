import React, { Component } from 'react'
import BasketPopup from './BasketPopup';
import LoginRegisterModal from './LoginRegisterModal';
import { withRouter, Link } from "react-router-dom";

import { connect } from 'react-redux'
import { checkAuth, logout } from '../store/modules/auth'
import { getProducts } from '../store/modules/products'
import { bindActionCreators } from 'redux'

class TopBar extends Component {

  state = {
    isBasketOpen: false,
    isLoginRegisterModalOpen: false,
    isLoginDropdownOpen: false,
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
      this.props.history.push('/');
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

  onBasketClose = () => {
    console.log('pls close');
    this.setState({
      isBasketOpen: false,
    })
  }

  renderLoginText = () => {
    if (this.props.authorized) {
      return <li className="topbar-dropdown-hover">
        <div>Welcome, <span style={{ textTransform: 'capitalize' }}>{this.props.user.firstName}</span>!&nbsp;&nbsp; <i className="fa fa-user" /></div>
        <div className="topbar-dropdown">
          <Link to="/orders">Your orders</Link>
          <span onClick={this.toggleLoginRegister}>Logout</span>
        </div>
      </li>
    }
    return <li onClick={this.toggleLoginRegister}>Sign in or register &nbsp;&nbsp; <i className="fa fa-user" /></li>
  }

  render() {
    return (
      <div className="top-bar">
        <ul>
            {this.renderLoginText()}
            <li>EN</li>
            <li onClick={this.toggleBasket}><i className="fa fa-shopping-cart"></i> {this.props.basket.length > 0 && <div className="basket-amount">{this.props.basket.length}</div>}</li>
        </ul>

        <BasketPopup isOpen={this.state.isBasketOpen} onCheckoutClick={this.onCheckoutClick} onClose={this.onBasketClose} />
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
