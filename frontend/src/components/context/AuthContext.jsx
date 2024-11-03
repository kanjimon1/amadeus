import React, { createContext, useState } from 'react';
import UserService from '../service/UserService';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token'),
        role: localStorage.getItem('role'),
    });
    const navigate = useNavigate();

    // Agregamos la función isAuthenticated
    const isAuthenticated = () => {
        return !!auth.token;
    };

    const login = async (email, password) => {
        try {
            console.log("antes del try del authContext");
            const userData = await UserService.login(email, password);
            console.log("consultando authContext email y password: ", email, password);
            if (userData.token) {
                localStorage.setItem('token', userData.token);
                localStorage.setItem('role', userData.role);
                setAuth({ token: userData.token, role: userData.role });

                console.log("consultando authContext token y rol: ", userData, userData.token, userData.role);
                // Redirect based on role
                if (userData.role === 'ADMIN') {
                    navigate('/main');
                    console.log("if main: ", userData.token, userData.role);
                } else if (userData.role === 'USER') {
                    navigate('/users-extra-hours');
                    console.log("if users: ", userData.token, userData.role);
                }
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const logout = () => {
        UserService.logout();
        setAuth({ token: null, role: null });
        navigate('/login');
    };

    //const isAuthenticated = () => !!auth.token;
    const isAdmin = () => auth.role === 'ADMIN';
    const isUser = () => auth.role === 'USER';

    return (
        <AuthContext.Provider value={{ auth, login, logout, isAuthenticated, isAdmin, isUser }}>
            {children}
        </AuthContext.Provider>
    );
};
