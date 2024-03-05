import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faGlobe, faComments, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css'
const NavBar = () => {
    return (
        <div className="navbar">
            <div className="logoandbtn">
                <div className="logo">
                    Logo
                </div>
                <div className="dropdown">
                    <button className="dropbtn">More travel <FontAwesomeIcon icon={faArrowDown} /></button>
                    <div className="dropdown-content">
                        <a href="#">Package 1</a>
                        <a href="#">Package 2</a>
                        <a href="#">Package 3</a>
                        <a href="#">Package 4</a>
                        <a href="#">Package 5</a>
                    </div>
                </div>
            </div>

            <div className="navbar-buttons">
                <button className="rounded-button"><FontAwesomeIcon icon={faDownload} color='blue' /> Get the app</button>
                <div className="dropdown">
                    <button className="dropbtn">
                        <FontAwesomeIcon icon={faGlobe} /> English
                    </button>
                    <div className="dropdown-content">
                        <a href="#">Amharic</a>
                        <a href="#">English</a>
                        {/* Add more language options here */}
                    </div>
                </div>
                <button className='normalBtns'> List your property</button>
                <button className='normalBtns'> Support</button>
                <button className='normalBtns'> Trips</button>
                <button className='normalBtns'><FontAwesomeIcon icon={faComments} /></button>
                <button className='normalBtns'> Sign in</button>
            </div>
        </div>
    );
};

export default NavBar;
