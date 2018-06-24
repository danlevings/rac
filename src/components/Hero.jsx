import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

import HeroImage from '../assets/stoxel-42.jpg';

export default class TopBar extends Component {

  render() {
    return (
      <div className="hero">
        
        <div className="hero-content">
            <div className="hero-content-image">
                <img src={HeroImage} alt="Rac" />
            </div>
            <div className="hero-content-inner">
                <nav>
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
                <div className="center">
                    <h2>The Reproduction Antiques Company</h2>
                    <p>A fictitious manifacturing company that makes reproduction goods to order for both the home market and the overseas market</p>
                    <br />
                    <Link to="/shop" className="button" >Start shopping</Link>
                </div>
            </div>
        </div>
    </div>
    )
  }
}
