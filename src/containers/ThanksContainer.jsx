import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NavBar from '../components/NavBar';
import ProductsSection from '../components/ProductsSection';
import ImageSection from '../components/ImageSection';
import ServicesSection from '../components/ServicesSection';

export default class HomeContainer extends Component {
  render() {
    return (
      <div className="home-page">
        <NavBar />
        <section className='wrapper' style={{ textAlign: 'center', padding: 42 }}>
        <h3>Thanks for your purchase! Check your email for confirmation.</h3>
        </section>
        <ImageSection />
        <ServicesSection />
      </div>
    )
  }
}
