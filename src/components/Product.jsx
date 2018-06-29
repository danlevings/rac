import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Product extends Component {
  static propTypes = {
    style: PropTypes.object,
    image: PropTypes.string,
    tag: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    onAddToCart: PropTypes.func,
    shippingPrice: PropTypes.number,
  }

  state = {
    isProductModalOpen: false,
    hasBeenAdded: false,
    shippingPrice: 0,
  }

  onProductClick = () => {
    if (!this.props.onAddToCart) {
      return false;
    }
    this.setState({
      isProductModalOpen: true
    });
  }

  onAddToCart = e => {
    e.stopPropagation();
    this.setState({
      hasBeenAdded: true,
    })
    this.props.onAddToCart();
  }

  onRemoveFromCart = e => {
    e.stopPropagation();
    this.setState({
      hasBeenAdded: false,
    })
    this.props.onRemoveFromCart();
  }

  onCloseModal = () => {
    this.setState({
      isProductModalOpen: false
    });
  }

  renderButton = () => {
    if (!this.props.onAddToCart) {
      return false;
    }
    if (this.state.hasBeenAdded) {
      return (<button className="add-to-cart-button" onClick={this.onRemoveFromCart} style={{ margin: '8px 0', }}>
        <i className="fa fa-minus"></i>Remove from cart
      </button>)
    }
    return (<button className="add-to-cart-button" onClick={this.onAddToCart} style={{ margin: '8px 0', }}>
      <i className="fa fa-shopping-cart"></i>Add to Cart
    </button>)
  }

  render() {
    const { style, image, tag, title, price, description, shippingPrice } = this.props;
    const { isProductModalOpen } = this.state;
    return [
      <div key={title} className={`product`} style={{...style, cursor: 'pointer'}} onClick={this.onProductClick}>
          <div className="product-image">
              <img src={image} alt={title}/>
              {tag && <div className="product-image-tag">{tag}</div>}
          </div>
          <span className="product-title">{title}</span>
          {price && 
          <span className="product-price">${price}</span>
          }
          {this.renderButton()}
      </div>,
      isProductModalOpen && <div className="underlay" onClick={this.onCloseModal} />,
      isProductModalOpen && (<div className="product-modal">
          <h2>{title}</h2>
        <span className="product-price">${price} {shippingPrice !== 0 && <span style={{ fontSize: 12, opacity: 0.8 }}>(+${shippingPrice} shipping)</span>}</span>
          <div className="left">
            <div className="product-image">
                <img src={image} alt={title}/>
                {tag && <div className="product-image-tag">{tag}</div>}
            </div>
            {this.renderButton()}
          </div>
          <div className="right">
            {description}
          </div>
          <div className="cross" onClick={this.onCloseModal} style={{ cursor: 'pointer' }}>x</div>
      </div>)
    ]
  }
}
