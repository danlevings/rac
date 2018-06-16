import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NavBar from '../components/NavBar';
import ContactInformation from '../components/ContactInformation';
import mapImg from '../assets/RACmap.png';

export default class ContactContainer extends Component {
  render() {
    return (
      <div className="contact-page">
        <NavBar />
        <div className="wrapper">
          <ContactInformation />
        </div>
        <div className="map" style={{ background: `url(${mapImg})`, backgroundSize: 'cover' }}>
          
        </div>
      </div>
    )
  }
}
