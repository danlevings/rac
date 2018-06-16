import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

import HeroImage from '../assets/stoxel-42.jpg';

export default class TopBar extends Component {

  render() {
    return (
        <nav className='nav-bar'>
            <div className="logo">
                <h1>R.A.C</h1>
                <div className="subtitle">Reproduction Antiques Company</div>
            </div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </nav>
    )
  }
}
