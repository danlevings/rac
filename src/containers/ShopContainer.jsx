import React, { Component } from 'react'
import NavBar from '../components/NavBar';
import Breadcrumbs from '../components/Breadcrumbs';
import Product from '../components/Product';
import Filters from '../components/Filters';

import { connect } from 'react-redux'
import { getProducts } from '../store/modules/products'
import { addToCart, removeFromCart } from '../store/modules/basket'
import { bindActionCreators } from 'redux'

class ShopContainer extends Component {

  state = {
    filters: [],
  }

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

  displayTag = product => {
    const { products } = this.props;
    if (products[product].tags.length > 0) {
      const tag = products[product].tags.find(x => x.type === "misc");
      if (tag) {
        return tag.name;
      }
    }
    return '';
  }

  getTags = () => {
    const { products, productIds } = this.props;
    const tags = {};
    
    productIds.forEach(id => {
      products[id].tags.forEach(tag => {
        if (tag.type !== 'category') {
          tags[tag.name] = true;
        }
      })
    })

    return Object.keys(tags);
  }

  getCategories = () => {
    const { products, productIds } = this.props;
    const categories = {};

    productIds.forEach(id => {
      products[id].tags.forEach(tag => {
        if (tag.type === 'category') {
          categories[tag.name] = true;
        }
      })
    })

    return Object.keys(categories);
  }

  onFilterChange = filters => {
    this.setState({
      filters,
    })
  }

  filter = product => {
    const { products } = this.props;
    const { filters } = this.state;
    let valid = false;
    if (filters.length <= 0) {
      return true;
    }

    const { tags } = products[product];
    if (tags) {
      filters.forEach(filter => {
        console.log(filter);
        if (tags.find(t => t.name === filter)) {
          console.log(products[product]);
          valid = true;
        }
      })
    }

    return valid;
  }

  render() {
    const { products } = this.props;
    return (
      <div className="shop-page">
        <NavBar />
        <Breadcrumbs />
        <Filters categories={this.getCategories()} tags={this.getTags()} onFilterChange={this.onFilterChange} />
        <div className='shop-products'>
          {this.props.productIds.filter(this.filter).map(product => 
            <Product
              key={products[product].id}
              image={products[product].images[0]}
              title={products[product].name}
              price={products[product].price}
              description={products[product].description}
              shippingPrice={products[product].shippingPrice}
              tag={this.displayTag(product)}
              onAddToCart={() => this.onAddToCart(products[product].id)}
              onRemoveFromCart={() => this.onRemoveFromCart(products[product].id)}
            /> )}
          </div>
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