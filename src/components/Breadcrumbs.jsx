import React from 'react';
import { Link } from 'react-router-dom';


export default ({title = "Shop"}) => {
  return (
    <div className='breadcrumbs'>
        <ul>
            <li><Link to="/"><i className='fa fa-home' /></Link></li>
            <li>{title}</li>
        </ul>
    </div>
  )
}

