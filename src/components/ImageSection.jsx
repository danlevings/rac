import React, { Component } from 'react'
import woodImage from '../assets/wood-3.jpg';

export default class TopBar extends Component {
  render() {
    return (
      <section className='image-section' style={{background: `url(${woodImage})`, backgroundSize: 'cover' }}>
          <h2>Hundreds of hand crafted wares</h2>
          <a href="/launch" className="button">Launch Advert</a>
      </section>
    )
  }
}
