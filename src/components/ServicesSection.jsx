import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Product from './Product';
import fireplace1 from '../assets/fireplace-1.png';
import fireplace2 from '../assets/fireplace-2.png';
import fireplace3 from '../assets/fireplace-3.png';
import fireplace4 from '../assets/fireplace-4.png';

export default class TopBar extends Component {

    state = {
        services: [
            {
              id: 0,
              image: fireplace1,
              title: 'Reproduction',
            },
            {
              id: 1,
              image: fireplace2,
              title: 'Restoration',
            },
            {
              id: 2,
              image: fireplace3,
              title: 'Conservation',
            },
            {
              id: 3,
              image: fireplace4,
              title: 'Overseas Delivery',
            },
          ]
    }
  render() {
    return (
        <section className='wrapper' style={{ textAlign: 'center', padding: 42 }}>
        <h3>Our Services</h3>
        <div className="services" style={{ columnCount: 4, columnGap: 20, textAlign: 'left' }} >
        {this.state.services.map(service => 
          <Product
            key={service.id}
            image={service.image}
            title={service.title}
            style={{ textAlign: 'center' }}
          /> )}
            
        </div>
    </section>
    )
  }
}
