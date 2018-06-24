import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Accordion extends Component {
    state = {
        isOpen: false,
    }
  render() {
    return (
      <div className="accordion">
        <header onClick={() => {
            this.setState({ isOpen: !this.state.isOpen })
        }}>
            {this.props.headerContent}
            <i className={`fa ${this.state.isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ position: 'absolute', top: '50%', right: 32, transform: 'translateY(-50%)', color: '#CCCCCC' }}/>
        </header>
        {this.state.isOpen && 
            <main>
                {this.props.children}
            </main>
        }
      </div>
    )
  }
}
