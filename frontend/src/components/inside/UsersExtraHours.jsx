import React, { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';
import background from '../../assets/images/mainBackground.png';

const UsersExtraHours = () => {

    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
        fetchProfileInfo();
    }, []);

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
            <div className="menu">
                <h1 style={{ color: 'white', textDecoration: 'none' }}>Horas extra Amadeus</h1>
                <div className="grid">
                    {profileInfo.role === "USER" && (
                        <h2><p style={{ color: '#FFFFFF' }}>Profile id: ${profileInfo.id} Profile: ${profileInfo.role}</p></h2>
                    )}
                </div>
            </div>
        </div>
    );

};

export default UsersExtraHours;