import React, { Component } from 'react'
import NavBar from '../components/NavBar';
import ContactInformation from '../components/ContactInformation';
import mapImg from '../assets/RACmap.png';

export default class ContactContainer extends Component {
  state = {
    sent: false,
  }
  render() {
    return (
      <div className="contact-page">
        <NavBar />
        <div className="wrapper">
          <ContactInformation sent={this.state.sent} onClick={() => this.setState({
            sent: true
          })}
          />
        </div>
        <div className="map" style={{ background: `url(${mapImg})`, backgroundSize: 'cover' }}>
          
        </div>
      </div>
    )
  }
}
