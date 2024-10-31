import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/components/_navbar.scss';
import logo from '../../assets/images/amadeus-logo-dark-sky.png';
import UserService from '../service/UserService';

function Navbar() {
    const [openDropdown, setOpenDropdown] = useState(null);

    const handleDropdownToggle = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    const isAuthenticated = UserService.isAuthenticated();
    const isAdmin = UserService.isAdmin();

    const handleLogout = () => {
        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            UserService.logout();
        }
    };

    return (
        <nav className="navbar">
            <ul className="nav-menu">
                <img alt="Amadeus" src={logo} />
                {/* Airlines Dropdown */}
                <li className="nav-item">
                    <button onClick={() => handleDropdownToggle('airlines')} className="nav-link">
                        Airlines
                    </button>
                    {openDropdown === 'airlines' && (
                        <ul className="dropdown-menu">
                            <li className="dropdown-header">Airlines</li>
                            <li className="dropdown-item">Option 1</li>
                            <li className="dropdown-item">Option 2</li>
                            <li className="dropdown-item">Option 3</li>
                        </ul>
                    )}
                </li>

                {/* Airports Dropdown */}
                <li className="nav-item">
                    <button onClick={() => handleDropdownToggle('airports')} className="nav-link">
                        Airports
                    </button>
                    {openDropdown === 'airports' && (
                        <ul className="dropdown-menu">
                            <li className="dropdown-header">Airports</li>
                            <li className="dropdown-item">Option 1</li>
                            <li className="dropdown-item">Option 2</li>
                            <li className="dropdown-item">Option 3</li>
                        </ul>
                    )}
                </li>

                {/* Corporations Dropdown */}
                <li className="nav-item">
                    <button onClick={() => handleDropdownToggle('corporations')} className="nav-link">
                        Corporations
                    </button>
                    {openDropdown === 'corporations' && (
                        <ul className="dropdown-menu">
                            <li className="dropdown-header">Corporations</li>
                            <li className="dropdown-item">Option 1</li>
                            <li className="dropdown-item">Option 2</li>
                            <li className="dropdown-item">Option 3</li>
                        </ul>
                    )}
                </li>
                {/* Conditional rendering based on authentication status */}
                <li className="nav-item">
                    {isAuthenticated ? (
                        <button onClick={handleLogout} className="nav-link">
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className="nav-link">
                            Login
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
