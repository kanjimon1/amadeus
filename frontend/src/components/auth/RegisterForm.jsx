import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../../assets/images/mainBackground.png';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        employeeId: '',
        username: '',
        email: '',
        password: '',
        //city: '',
        role: 'USER'  // Default role can be 'USER'
    });
    const [responseMessage, setResponseMessage] = useState('');
    const navigate = useNavigate();  // Hook to handle navigation

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("ENTRANDO AL HANDLE SUBMIT");
        try {
            console.log("DENTRO DEL TRY:");
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),

            });

            console.log("DESPUES DEL TRY: ", response, formData);

            const data = await response.json();

            console.log("DESPUES DEL JSON RESPONSE: ", response, data);

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            setResponseMessage(`Registration successful: ${data.message}`);
            navigate('/login');
        } catch (error) {
            setResponseMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
            <div class="login-container">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Employee ID:</label>
                        <input
                            type="text"
                            name="employeeId"
                            value={formData.employeeId}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/*<div>
                        <label>City:</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </div>*/}
                    <div>
                        <label>Role:</label>
                        <select name="role" value={formData.role} onChange={handleChange}>
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="MANAGER">MANAGER</option>
                        </select>
                    </div>
                    <button type="submit">Register</button>
                </form>
                {responseMessage && <p>{responseMessage}</p>}
            </div>
        </div>
    );
};

export default RegisterForm;
