import React from 'react';
import logo from '../../assets/cat.png';

import './Footer.css';

function Footer() {
  return (
    <div className='footer'>
      <img src={logo} alt='logo' />
      <span>
        Icon made by{' '}
        <a href='https://www.flaticon.com/authors/freepik'>Freepik</a> from{' '}
        <a href='https://www.flaticon.com'>www.flaticon.com</a>
      </span>
    </div>
  );
}

export default Footer;
