import React from 'react';
import logo from '../assets/southwest-logo.png'; // Assuming you have a logo in assets
import '../styles/Logo.css';

const Logo = () => {
    return (
        <div className="logo">
            <img src={logo} alt="Southwest Logo" />
        </div>
    );
}

export default Logo;
