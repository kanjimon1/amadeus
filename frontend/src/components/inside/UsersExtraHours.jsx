import React, { useState, useEffect, useContext } from 'react';
import UserService from '../service/UserService';
import background from '../../assets/images/mainBackground.png';
import { AuthContext } from '../context/AuthContext';
import { Outlet, Link, useNavigate, Form } from 'react-router-dom';
//import { Card, CardHeader, CardTitle, CardContent } from '@/components/iu/card';
//import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';


const UsersExtraHours = () => {

    //const [profileInfo, setProfileInfo] = useState({});
    /*const { isAuthenticated, auth, logout } = useContext(AuthContext);
    const [profileInfo, setProfileInfo] = useState({});*/

    const [extraHours, setExtraHours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated, auth, logout } = useContext(AuthContext);

    const tableCellStyle = {
        border: '1px solid black',
        padding: '8px',
        textAlign: 'left'
    };

    const tableHeaderStyle = {
        ...tableCellStyle,
        backgroundColor: '#f3f4f6',
        fontWeight: 'bold'
    };

    //const navigate = useNavigate();

    /*useEffect(() => {
        if (!isAuthenticated || auth.role !== 'ADMIN') {
            navigate('/login');
        } else {
            //fetchProfileInfo();
            fetchExtraHoursUsers();
        }
    }, [isAuthenticated, auth.role]);*/

    /*useEffect(() => {
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
    };*/

    /*const [users, setExtraHoursUsers] = useState([]);
    
    useEffect(() => {
        // Fetch users data when the component mounts
        fetchExtraHoursUsers();
    }, []);
    
    const fetchExtraHoursUsers = async () => {
        try {
    
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await UserService.getAllExtraHoursUsers(token);
            //   console.log(response);
            setExtraHoursUsers(response.ourUsersList); // Assuming the list of users is under the key 'ourUsersList'
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };*/

    useEffect(() => {
        const fetchExtraHoursUsers = async () => {
            try {
                const data = await UserService.getAllExtraHoursUsers(auth.token);
                setExtraHours(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching extra hours:', err);
                setError('Error loading extra hours data');
                setLoading(false);
            }
        };

        if (isAuthenticated && auth.role === 'ADMIN' || auth.role === 'USER') {
            fetchExtraHoursUsers();
        }
    }, [isAuthenticated, auth]);

    if (loading) {
        return <div className="flex justify-center items-center p-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 p-4">{error}</div>;
    }

    /*const formatDateTime = (dateString) => {
        return new Date(dateString).toLocaleString('es-ES', {
            dateStyle: 'medium',
            timeStyle: 'short'
        });
    };*/

    /*const deleteUser = async (userId) => {
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
    };*/

    {/*return (
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
                            <th style={{ color: 'white', textDecoration: 'none' }}>Employee ID</th>
                            <th style={{ color: 'white', textDecoration: 'none' }}>Employee Name</th>
                            <th style={{ color: 'white', textDecoration: 'none' }}>Job Name</th>
                            <th style={{ color: 'white', textDecoration: 'none' }}>Salary</th>
                            <th style={{ color: 'white', textDecoration: 'none' }}>Area</th>
                            <th style={{ color: 'white', textDecoration: 'none' }}>Percentage</th>
                            <th style={{ color: 'white', textDecoration: 'none' }}>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.length > 0 ? (
                            users.map(user => (
                                <tr key={user.id}>
                                    <td style={{ color: 'white', textDecoration: 'none' }}>{user.id}</td>
                                    <td style={{ color: 'white', textDecoration: 'none' }}>{user.employee.employeeId}</td>
                                    <td style={{ color: 'white', textDecoration: 'none' }}>{user.employee.employeeName}</td>
                                    <td style={{ color: 'white', textDecoration: 'none' }}>{user.employee.job.jobName}</td>
                                    <td style={{ color: 'white', textDecoration: 'none' }}>{user.employee.salary}</td>
                                    <td style={{ color: 'white', textDecoration: 'none' }}>{user.area.areaName}</td>
                                    <td style={{ color: 'white', textDecoration: 'none' }}>{user.extraHourType.percentage}</td>
                                    <td style={{ color: 'white', textDecoration: 'none' }}>{user.extraHourType.description}</td>
                                    <td>
                                        <button className='delete-button' >Delete</button>
                                        <button><Link to={`/update-user/${user.id}`}>
                                            Update
                                        </Link>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" style={{ color: 'white', textAlign: 'center' }}>No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div >
    );

};*/}

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Horas Extra Amadeus</h2>

            {extraHours.length > 0 ? (
                <div className="overflow-x-auto">
                    <center>
                        <table
                            style={{ borderCollapse: 'collapse', width: '100%' }}>
                            <thead>
                                <tr>
                                    <th style={tableHeaderStyle}>ID</th>
                                    <th style={tableHeaderStyle}>Id empleado</th>
                                    <th style={tableHeaderStyle}>Nombre Empleado</th>
                                    <th style={tableHeaderStyle}>Cargo</th>
                                    <th style={tableHeaderStyle}>Salario</th>
                                    <th style={tableHeaderStyle}>Area</th>
                                    <th style={tableHeaderStyle}>% H/Extra</th>
                                    <th style={tableHeaderStyle}>Desc H/Extra</th>
                                    <th style={tableHeaderStyle}>startDatetime</th>
                                    <th style={tableHeaderStyle}>endDatetime</th>
                                    <th style={tableHeaderStyle}>hourPrice</th>
                                    <th style={tableHeaderStyle}>amountExtraHours</th>
                                    <th style={tableHeaderStyle}>comments</th>
                                    <th style={tableHeaderStyle}>totalExtraHour</th>
                                    <th style={tableHeaderStyle}>totalPayment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {extraHours.map((hour) => (
                                    <tr key={hour.id} className="hover:bg-gray-50">
                                        <td style={{ color: 'red', textDecoration: 'none' }}>{hour.id}</td>
                                        <td style={{ color: 'white', textDecoration: 'none' }}>{hour.employee.employeeId}</td>
                                        <td style={{ color: 'white', textDecoration: 'none' }}>{hour.employee.employeeName}</td>
                                        <td style={{ color: 'white', textDecoration: 'none' }}>{hour.employee.job.jobName}</td>
                                        <td style={{ color: 'white', textDecoration: 'none' }}>{hour.employee.salary}</td>
                                        <td style={{ color: 'white', textDecoration: 'none' }}>{hour.employee.area.areaName}</td>
                                        <td style={{ color: 'white', textDecoration: 'none' }}>{hour.extraHourType.percentage}</td>
                                        <td style={{ color: 'white', textDecoration: 'none' }}>{hour.extraHourType.percentage}</td>
                                        <td style={{ color: 'white', textDecoration: 'none' }}>{hour.startDatetime}</td>
                                        <td style={{ color: 'white', textDecoration: 'none' }}>{hour.endDatetime}</td>
                                        <td style={{ color: 'white', textDecoration: 'none' }}>{hour.hourPrice}</td>
                                        <td style={{ color: 'white', textDecoration: 'none' }}>{hour.amountExtraHours}</td>
                                        <td style={{ color: 'white', textDecoration: 'none' }}>{hour.comments}</td>
                                        <td style={{ color: 'white', textDecoration: 'none' }}>{hour.totalExtraHour}</td>
                                        <td style={{ color: 'white', textDecoration: 'none' }}>{hour.totalPayment}</td>
                                        <td>
                                            <button className='delete-button' >Delete</button>
                                            <button><Link to={`/update-user/${hour.id}`}>
                                                Update
                                            </Link>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </center>
                </div>
            ) : (
                <div className="text-center py-4 text-gray-500">
                    No se encontraron registros de horas extra
                </div>
            )}
        </div>
    );
};

export default UsersExtraHours;