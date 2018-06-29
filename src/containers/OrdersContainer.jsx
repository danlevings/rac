import React, { Component } from 'react'
import NavBar from '../components/NavBar';
import Breadcrumbs from '../components/Breadcrumbs';
import Product from '../components/Product';
import Accordion from '../components/Accordion';

import { connect } from 'react-redux'

class OrdersContainer extends Component {

  componentDidMount = () => {
    const { authorized } = this.props;
    if (!authorized) {
        this.props.history.push('/')
    }
  }

  getTotalPrice = (productIds) => {
    const { products } = this.props;
    const shippingPrice = productIds.reduce((a, b) => a + products[b].shippingPrice, 0);
    const totalPrice = productIds.reduce((a, b) => a + products[b].price, shippingPrice);
    return totalPrice;
  }

  render() {
    const { products, user } = this.props;
    return (
      <div className="orders-page" style={{ minHeight: 700 }}>
        <NavBar />
        <Breadcrumbs title="Orders" />
        <div className="wrapper">
          <h2>Your Orders</h2>
          
            {user.orders && user.orders.reverse().map(order => 
              <Accordion 
                headerContent={
                  <div className="header-inner">
                    <div className="header-block">
                      <div>Order ID</div>
                      <div>#00{order.id}</div>
                    </div>
                    <div className="header-block">
                      <div>Date</div>
                      <div>{order.date}</div>
                    </div>
                    <div className="header-block">
                      <div>Status</div>
                      <div style={{ textTransform: 'capitalize' }}>{order.status}</div>
                    </div>
                    <div className="header-block">
                      <div>Total</div>
                      <div>${this.getTotalPrice(order.products.reduce((a, b) => [...a, b.id], []))}</div>
                    </div>
                  </div>
                }>
                {order.products.reduce((a, b) => [...a, b.id], []).map(id =>
                  <Product
                    key={products[id].id}
                    image={products[id].images[0]}
                    tag={products[id].tag}
                    title={products[id].name}
                    price={products[id].price}
                    description={products[id].description}
                    shippingPrice={products[id].shippingPrice}
                  />)}
                 
              </Accordion>
            )}

            {user.orders && user.orders.length <= 0 && <div>You have made no orders yet</div>}
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  authorized: state.auth.authorized,
  user: state.auth.user,
  products: state.products.products,
})

export default connect(mapStateToProps)(OrdersContainer);