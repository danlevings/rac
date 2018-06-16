import React from 'react'

export default () => {
  return (
    <div className="contact-grid">
        <div className="contact-info">
            <div className="contact-piece">
            <div className="contact-icon">
            <i className="fa fa-map-pin" />
            </div>
            <div className="contact-piece-content">
                <span>Address</span>
                <span>
                73 Saltwells Road<br />
                Middlesbrough<br />
                TS4 2DT
                </span>
            </div>
            </div>
            <div className="contact-piece">
            <div className="contact-icon">
            <i className="fa fa-phone" />
            </div>
            <div className="contact-piece-content">
                <span>Call us</span>
                <span>
                +440000 000 000
                </span>
            </div>
            </div>
            <div className="contact-piece">
            <div className="contact-icon">
            <i className="fa fa-envelope-o" />
            </div>
            <div className="contact-piece-content">
                <span>Write to us</span>
                <span>
                enquires@rac.com
                </span>
            </div>
            </div>
            <div className="contact-piece">
            <div className="contact-icon">
                <i className="fa fa-clock-o" />
            </div>
            <div className="contact-piece-content">
                <span>Opening times</span>
                <span>
                Mon - Fri: 8am - 5pm<br />
                Sun: 10am - 2pm
                </span>
            </div>
            </div>
        </div>
        <div className="contact-form">
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Phone" />
            <textarea placeholder="Message"></textarea>
            <button>Send</button>
        </div>
    </div>
  )
}
