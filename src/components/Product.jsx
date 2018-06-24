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
  }

  state = {
    isProductModalOpen: false,
    hasBeenAdded: false,
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
    const { style, image, tag, title, price, description, shipping, onAddToCart } = this.props;
    const { isProductModalOpen, hasBeenAdded } = this.state;
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
      isProductModalOpen && <div className="underlay" />,
      isProductModalOpen && (<div className="product-modal">
          <h2>{title}</h2>
          <span className="product-price">${price} {shipping && `(+${shipping} shipping)`}</span>
          <div className="left">
            <div className="product-image">
                <img src={image} alt={title}/>
                {tag && <div className="product-image-tag">{tag}</div>}
            </div>
            {this.renderButton()}
          </div>
          <div className="right">
          The fireplace was a necessity in early America. As the hub of the house, a burning hearth provided heat, housed multiple fires for cooking and baking, and served as the nucleus of family gatherings.
          <br />
          <br />
          In the 1600s and early 1700s, the typical fireplace was a walk-in: a wide, deep, open recess, generally with only the briefest semblance of a mantel, or no mantel at all. The firebox was usually wider than it was tall, especially in the homes of Dutch settlers.
          <br />
          <br />
          Fireplaces in English homes were smaller and more efficient. In New England and the Mid-Atlantic, colonial homes had central chimneys with multiple flues so that fires could be lit in two or more rooms on each floor. 
          </div>
          <div className="cross" onClick={this.onCloseModal} style={{ cursor: 'pointer' }}>x</div>
      </div>)
    ]
  }
}
