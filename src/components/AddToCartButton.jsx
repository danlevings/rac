import React from 'react'
import PropTypes from 'prop-types'

export default ({text, style}) => {
  return (
    <div className='add-to-cart-button' style={style}>
      
    </div>
  )
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    style: PropTypes.object,
}

Button.defaultProps = {
    style: {},
}
