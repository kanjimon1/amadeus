import React, { useState, useEffect, useContext } from 'react';
import UserService from '../service/UserService';
import background from '../../assets/images/mainBackground.png';
//import Sidebar from '../common/Layout';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const MainPage = () => {

    //const [profileInfo, setProfileInfo] = useState({});

    /*useEffect(() => {
        fetchProfileInfo();
    }, []);*/

    //const { isAuthenticated, role, logout } = useContext(AuthContext);
    const { isAuthenticated, auth, logout } = useContext(AuthContext);
    const [profileInfo, setProfileInfo] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        //if (!isAuthenticated || (role !== 'ADMIN' || role !== 'USER')) {
        if (!isAuthenticated || auth.role !== 'ADMIN') {
            navigate('/login');
        } else {
            fetchProfileInfo();
        }
    }, [isAuthenticated, auth.role]);

    const fetchProfileInfo = async () => {
        try {

            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await UserService.getYourProfile(token);
            setProfileInfo(response.ourUsers);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    return (
        <div style={{
            display: 'flex',
            backgroundImage: `url(${background})`,
            backgroundSize: 'contain',
            backgroundPosition: 'right',
            backgroundRepeat: 'no-repeat',
            height: '100vh'
        }}>
            {/* Left Pane (Sidebar) */}
            <div style={{
                width: '250px',
                backgroundColor: '#2c3e50',
                color: 'white',
                padding: '1rem',
                height: '100vh', // Full height sidebar
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between' // Space between nav items and logout button
            }}>
                <div>
                    <h2 style={{ color: 'white', textDecoration: 'none' }}>Admin Dashboard</h2>
                    <nav>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li><Link to="employees" style={{ color: 'white', textDecoration: 'none' }}>Employees</Link></li>
                            <li><Link to="products" style={{ color: 'white', textDecoration: 'none' }}>Products</Link></li>
                            <li><Link to="users-extra-hours" style={{ color: 'white', textDecoration: 'none' }}>Users Extra Hours</Link></li>
                        </ul>
                    </nav>
                </div>
                <button onClick={logout} style={{
                    color: 'white',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    fontSize: '1rem',
                    textAlign: 'left'
                }}>
                    Logout
                </button>
            </div>
            {/* Content Area */}
            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
                <h2>Horas Extra Amadeus</h2>
                <Outlet />
                {profileInfo.role === "ADMIN" && (
                    <h2 className="text-lg">Profile id: ${profileInfo.id} Profile: ${profileInfo.role}</h2>
                )}
            </div>
        </div>
    );
};

export default MainPage;
