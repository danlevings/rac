import React, { Component } from 'react'

export default class TopBar extends Component {
  render() {
    return (
      <div className="footer-outer">
        <div className="wrapper">
          <footer>
            <section className="footer-col">
              <h4>Sitemap</h4>
              <a>Home</a>
              <a>Shop</a>
              <a>Contact</a>
            </section>
            <section className="footer-col">
              <h4>Categories</h4>
              <a>Home</a>
              <a>Shop</a>
              <a>Contact</a>
            </section>
            <section className="footer-col">
              <h4>Tags</h4>
              <a>Home</a>
              <a>Shop</a>
              <a>Contact</a>
            </section>
            <section className="footer-col">
              <h4>Contact</h4>
              <address>73 Saltwells Road <br />Middlesbrough<br />TS4 2DT</address>
              <a>enquires@rac.com</a>
              <a>+440000 000 000</a>
            </section>
          </footer>
          <div className="footer-copyright">
            Copyright &copy; STU51910. Arden University.
          </div>
        </div>
      </div>
    )
  }
}
