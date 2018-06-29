import React, { Component } from 'react'
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
      <section className='wrapper' style={{ padding: 42 }}>
        <h3 style={{ textAlign: 'center' }}>A Collection of Products</h3>
        <div className="products" style={{ 
            display: 'flex',
            flexWrap: 'wrap', 
            
          }} >
          {productIds.slice(0, 4).map(id => 
            <Product
              key={id}
              image={products[id].images[0]}
              tag={products[id].tag}
              title={products[id].name}
              price={products[id].price}
              description={products[id].description}
              shippingPrice={products[id].shippingPrice}
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