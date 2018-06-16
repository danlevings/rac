import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

import { connect } from 'react-redux'
import { getProducts } from '../store/modules/products'
import { addToCart, removeFromCart } from '../store/modules/basket'
import { bindActionCreators } from 'redux'

class CheckoutContainer extends Component {
    state = {
        deliveryPrice: 50,
        shippingAndBillingSame: true,
    }

    componentWillMount = () => {
        if (this.props.basket.length <= 0) {
            this.props.history.push('/')
        }
    }

    onCheckboxClick = e => {
        e.preventDefault();
        this.setState({ shippingAndBillingSame: !this.state.shippingAndBillingSame})
    }
  render() {
    const { products, basket } = this.props;
    return (
      <div className="checkout-page">
        <NavBar />
        <div className="wrapper">
            <h2>Checkout</h2>
            <div className="checkout-grid">
                <div className="checkout-form">
                    <h3>1. Personal Details</h3>
                    <span class="logged-in-as">You are logged in as: <strong>Alberto Scott</strong></span>
                    <div className="form-group half">
                        <label>First name</label>
                        <input type="text" placeholder="First name" style={{ marginRight: 16 }}/>
                    </div>
                    <div className="form-group half">
                        <label>Last name</label>
                        <input type="text" placeholder="Last name" />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" placeholder="Email" />
                    </div>

                    <h3>2. Shipping Address</h3>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" placeholder="Address line 1" />
                        <input type="text" placeholder="Address line 2" />
                        <input type="text" placeholder="Address line 3" />
                    </div>
                    <div className="form-group half">
                        <label>Country</label>
                        <input type="text" placeholder="Country" style={{ marginRight: 16 }} />
                    </div>
                    <div className="form-group half">
                        <label>City</label>
                        <input type="text" placeholder="City" />
                    </div>
                    <div className="form-group half">
                        <label>Postal Code</label>
                        <input type="text" placeholder="Postal Code" style={{ marginRight: 16 }} />
                    </div>

                    <h3>3. Payment Details</h3>
                    <div className='filter-checkbox' for={`shipping`} onClick={this.onCheckboxClick}>
                        <input type='checkbox' id={`shipping`} checked={this.state.shippingAndBillingSame}/>
                        <label for={`shipping`}>My shipping and billing address is the same</label>
                    </div>
                    {!this.state.shippingAndBillingSame && [<div className="form-group">
                        <label>Billing address</label>
                        <input type="text" placeholder="Address line 1" />
                        <input type="text" placeholder="Address line 2" />
                        <input type="text" placeholder="Address line 3" />
                    </div>,
                    <div className="form-group half">
                        <label>Country</label>
                        <input type="text" placeholder="Country" style={{ marginRight: 16 }} />
                    </div>,
                    <div className="form-group half">
                        <label>City</label>
                        <input type="text" placeholder="City" />
                    </div>,
                    <div className="form-group half">
                        <label>Postal Code</label>
                        <input type="text" placeholder="Postal Code" style={{ marginRight: 16 }} />
                    </div>]}
                    <div className="form-group">
                        <label>Credit card number</label>
                        <input type="text" placeholder="0000 - 0000 - 0000 - 0000" />
                    </div>
                    <div className="form-group half">
                        <label>Expiration date</label>
                        <input type="text" placeholder="MM/YY" style={{ marginRight: 16 }} />
                    </div>
                    <div className="form-group half">
                        <label>Security code</label>
                        <input type="text" placeholder="CCV" />
                    </div>
                </div>
                <div className="checkout-summary">
                    <div className="summary">
                        <h3>Summary</h3>
                        <table className="basket-table">
                            {basket.map(id => (
                                <tr className="basket-item">
                                    <td>
                                        <span>{products[id].title}</span>
                                    </td>
                                    <td className="price">
                                        <span>${products[id].price}</span>
                                    </td>
                                </tr>
                            ))}
                            <tr className="delivery">
                                <td>
                                    <span>Delivery Charge</span>
                                </td>
                                <td className="price">
                                    <span>${this.state.deliveryPrice}</span>
                                </td>
                            </tr>
                            <tr className="total">
                                <td>
                                    <span>Total</span>
                                </td>
                                <td className="price">
                                    <span>${basket.reduce((a, b) => a + products[b].price, this.state.deliveryPrice)}</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <p>By clicking confirm payment, you agree to this legal stagement,
                        ensuring that the items purchased will be legal. It also
                        means you agree to this Subscription Document and 
                        these Terms and Conditions.</p>
                    <Link to="/thanks"><button className="button" style={{ width: '100%' }}>Confirm payment</button></Link>
                </div>
            </div>
        </div>
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);
