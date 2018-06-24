import React from 'react';
import PropTypes from 'prop-types';


export default ({title = "Shop"}) => {
  return (
    <div className='breadcrumbs'>
        <ul>
            <li><i className='fa fa-home' /></li>
            <li>{title}</li>
        </ul>
    </div>
  )
}

