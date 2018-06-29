import React, { Component } from 'react'
import NavBar from '../components/NavBar';
import ImageSection from '../components/ImageSection';
import ServicesSection from '../components/ServicesSection';

export default class HomeContainer extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
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
