// src/components/Footer.js
import React from 'react';
import './Footer.css'; 
import {useNavigate} from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();


  return (
    <footer className="footer">
      <p>© 2024 Cheesecake. All rights reserved.</p>
      <button className="contact-us-btn" onClick={()=> navigate('/contact-us')}>
        Contact Us
        </button>
    </footer>
  );
};

export default Footer;
