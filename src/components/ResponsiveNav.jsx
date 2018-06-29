import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ResponsiveNav extends Component {
    state = {
        isOpen: false,
    }
  render() {
    return [
        <div className="responsive-navicon" style={this.props.style}>
            <i className="fa fa-navicon" onClick={() => { this.setState({isOpen: true}) }}/>
        </div>,
        this.state.isOpen && <div className="res-nav">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/contact">Contact</Link>
            <div className="close" onClick={() => { this.setState({isOpen: false}) }}> <i className="fa fa-close" /> </div>
        </div>
    ]
  }
}
