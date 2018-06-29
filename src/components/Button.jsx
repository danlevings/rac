import React from 'react'

export default ({text, style, onClick}) => {
  return (
    <div className='button' style={style} onClick={onClick}>
      {text}
    </div>
  )
}

// Button.propTypes = {
//     text: PropTypes.string.isRequired,
//     style: PropTypes.object,
// }

// Button.defaultProps = {
//     style: {},
// }
