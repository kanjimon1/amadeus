import React, { useState, useEffect, useContext } from 'react';
import UserService from '../service/UserService';
import background from '../../assets/images/mainBackground.png';
import { AuthContext } from '../context/AuthContext';
import { Outlet, Link, useNavigate } from 'react-router-dom';

const UsersExtraHours = () => {

    //const [profileInfo, setProfileInfo] = useState({});
    const { isAuthenticated, auth, logout } = useContext(AuthContext);
    const [profileInfo, setProfileInfo] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated || auth.role !== 'ADMIN') {
            navigate('/login');
        } else {
            fetchProfileInfo();
        }
    }, [isAuthenticated, auth.role]);

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

    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users data when the component mounts
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {

            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await UserService.getAllUsers(token);
            //   console.log(response);
            setUsers(response.ourUsersList); // Assuming the list of users is under the key 'ourUsersList'
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            // Prompt for confirmation before deleting the user
            const confirmDelete = window.confirm('Are you sure you want to delete this user?');

            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            if (confirmDelete) {
                await UserService.deleteUser(userId, token);
                // After deleting the user, fetch the updated list of users
                fetchUsers();
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            <div className="menu">
                <h1 style={{ color: 'white', textDecoration: 'none' }}>Horas extra Amadeus</h1>
                <div className="grid">
                    {profileInfo.role === "USER" && (
                        <h2><p style={{ color: '#FFFFFF' }}>Profile id: ${profileInfo.id} Profile: ${profileInfo.role}</p></h2>
                    )}
                </div>
                <table>
                    <thead>
                        <tr>
                            <th style={{ color: 'white', textDecoration: 'none' }}>ID</th>
                            <th style={{ color: 'white', textDecoration: 'none' }}>Name</th>
                            <th style={{ color: 'white', textDecoration: 'none' }}>Email</th>
                            <th style={{ color: 'white', textDecoration: 'none' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td style={{ color: 'white', textDecoration: 'none' }}>{user.id}</td>
                                <td style={{ color: 'white', textDecoration: 'none' }}>{user.name}</td>
                                <td style={{ color: 'white', textDecoration: 'none' }}>{user.email}</td>
                                <td>
                                    <button className='delete-button' onClick={() => deleteUser(user.id)}>Delete</button>
                                    <button><Link to={`/update-user/${user.id}`}>
                                        Update
                                    </Link>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

};

export default UsersExtraHours;