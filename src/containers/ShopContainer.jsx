import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NavBar from '../components/NavBar';
import Breadcrumbs from '../components/Breadcrumbs';
import Product from '../components/Product';
import Filters from '../components/Filters';
import SingleProductModal from '../components/SingleProductModal';

import { connect } from 'react-redux'
import { getProducts } from '../store/modules/products'
import { addToCart, removeFromCart } from '../store/modules/basket'
import { bindActionCreators } from 'redux'

class ShopContainer extends Component {

  componentDidMount = () => {
    if (this.props.productIds.length <= 0) {
      this.props.getProducts();
    }
  }

  onAddToCart = productId => {
    this.props.addToCart(productId);
  }

  onRemoveFromCart = productId => {
    this.props.removeFromCart(productId);
  }

  render() {
    const { products, productIds } = this.props;
    return (
      <div className="shop-page">
        <NavBar />
        <Breadcrumbs />
        <div className='shop-filters'>
          <Filters />
        </div>
        <div className='shop-products'>
          <h2 className='shop-title'>Vintage furniture</h2>
          {this.props.productIds.map(product => 
            <Product
              key={products[product].id}
              image={products[product].image}
              tag={products[product].tag}
              title={products[product].title}
              price={products[product].price}
              onAddToCart={() => this.onAddToCart(products[product].id)}
              onRemoveFromCart={() => this.onRemoveFromCart(products[product].id)}
            /> )}
          </div>

          <SingleProductModal />
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