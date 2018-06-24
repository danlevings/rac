import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Product from './Product';

import { connect } from 'react-redux'
import { getProducts } from '../store/modules/products'
import { addToCart, removeFromCart } from '../store/modules/basket'
import { bindActionCreators } from 'redux'

 class TopBar extends Component {

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
      <section className='wrapper' style={{ textAlign: 'center', padding: 42 }}>
        <h3>A Collection of Products</h3>
        <div className="products" style={{ columnCount: 4, columnGap: 20, textAlign: 'left' }} >
          {this.props.productIds.map(id => 
            <Product
              key={id}
              image={products[id].images[0]}
              tag={products[id].tag}
              title={products[id].name}
              price={products[id].price}
              onAddToCart={() => this.onAddToCart(id)}
              onRemoveFromCart={() => this.onRemoveFromCart(id)}
            /> )}
            
        </div>
    </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);