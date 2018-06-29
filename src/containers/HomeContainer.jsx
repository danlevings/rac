import React, { Component } from 'react'
import Hero from '../components/Hero';
import ProductsSection from '../components/ProductsSection';
import ImageSection from '../components/ImageSection';
import ServicesSection from '../components/ServicesSection';

export default class HomeContainer extends Component {
  render() {
    return (
      <div className="home-page">
        <Hero />
        <ProductsSection/>
        <ImageSection />
        <ServicesSection />
      </div>
    )
  }
}
