import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NavBar from '../components/NavBar';
import Breadcrumbs from '../components/Breadcrumbs';
import Product from '../components/Product';
import Filters from '../components/Filters';
import SingleProductModal from '../components/SingleProductModal';

import banner from '../assets/RAC-launch.png';

import { connect } from 'react-redux'
import { getProducts } from '../store/modules/products'
import { addToCart, removeFromCart } from '../store/modules/basket'
import { bindActionCreators } from 'redux'

class ShopContainer extends Component {
  render() {
    const { products, productIds } = this.props;
    return (
      <div className="shop-page">
        <NavBar />
        <Breadcrumbs title="Launch banner"/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.products,
  productIds: state.products.productIds,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getProducts,
  addToCart,
  removeFromCart,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ShopContainer);