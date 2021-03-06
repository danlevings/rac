import React, { Component } from 'react'
import Button from '../components/Button';

import { connect } from 'react-redux'
import { getProducts } from '../store/modules/products'
import { addToCart, removeFromCart } from '../store/modules/basket'
import { bindActionCreators } from 'redux'

class BasketPopup extends Component {
    
  removeFromCart = id => {
    this.props.removeFromCart(id);
  }

  render() {
    const { basket, products } = this.props;
    if (!this.props.isOpen) {
        return false;
    }
    return [
      <div className="basket-popup">
        <h3>Your basket</h3>
        {this.props.basket.length <= 0 ? (<p>Your basket is currently empty</p>) : 
        (<div>
            <table className="basket-table">
                {basket.map(id => (
                    <tr className="basket-item">
                        <td>
                            <img src={products[id].images[0]} alt={products[id].name} />
                        </td>
                        <td className="basket-title">
                            <span>{products[id].name}</span> <br />
                            <a onClick={() => this.removeFromCart(id)}>Remove</a>
                        </td>
                        <td>
                            <span>${products[id].price}</span>
                        </td>
                    </tr>
                ))}
            </table>
            

            <div className="basket-total">
                <span>Total: ${basket.reduce((a, b) => a + products[b].price, 0)}</span>
            </div>
            <Button text='Checkout' onClick={this.props.onCheckoutClick}/>
        </div>)
        }
      </div>,
      <div style={{ width: '100vw', height: '100vh', top: 0, left: 0, position: 'fixed',}} onClick={this.props.onClose} />
    ]
  }
}


const mapStateToProps = state => ({
    products: state.products.products,
    productIds: state.products.productIds,
    basket: state.basket.basket,
})
  
const mapDispatchToProps = dispatch => bindActionCreators({
    getProducts,
    addToCart,
    removeFromCart,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BasketPopup);
