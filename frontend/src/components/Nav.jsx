import React from 'react';
import { FiDownload, FiGlobe } from 'react-icons/fi';
import { FaBell, FaSignInAlt } from 'react-icons/fa';
import '../components/styles/Nav.css'

const Nav = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1 className='logo'>Guzo</h1>
                <button className="app-button">
                    <FiDownload className="download-icon" />
                    Get the app
                </button>
                <div className="language-dropdown">
                    <select className="language-select">
                        <option value="amharic">Amharic</option>
                        <option value="english">English</option>
                    </select>
                    <FiGlobe className="globe-icon" />
                </div>
            </div>
            <div className="navbar-right">
                <div className="dropdown">
                    <button className="dropdown-button">More travel</button>
                    <div className="dropdown-content">
                        <a href="#">Stays</a>
                        <a href="#">Flights</a>
                        <a href="#">Cars</a>
                        <a href="#">Packages</a>
                        <a href="#">Things to do</a>
                        <a href="#">Cruises</a>
                    </div>
                </div>
                <button className="list-property-button">List your property</button>
                <button className="support-button">Support</button>
                <button className="trips-button">Trips</button>
                <button className="notification-button"><FaBell /></button>
                <button className="sign-in-button"><FaSignInAlt /> Sign in</button>
            </div>
        </nav>
    );
};

export default Nav;
