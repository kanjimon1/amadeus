import React, { useState, useEffect } from 'react';
import UserService from '../service/UserService';
import background from '../../assets/images/mainBackground.png';

const MainPage = () => {

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
        <div style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
            <div className="menu">
                <h1>Horas extra Amadeus</h1>
                <div className="grid">
                    {profileInfo.role === "ADMIN" && (
                        <h2><p style={{ color: '#FFFFFF' }}>Profile id: ${profileInfo.id} Profile: ${profileInfo.role}</p></h2>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
