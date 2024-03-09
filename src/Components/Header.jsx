import React from 'react';
import Logo from './../Assets/icono.png';
import './../Style/Header.css';

function Header() {
    return (
        <header>
            <img src={Logo} alt="Logo" className='Logo' />
            <h1>Convertidor Divisas</h1>
        </header>
    );
}

export default Header;
