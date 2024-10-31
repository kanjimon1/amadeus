import React, { useState } from 'react';
import '../../assets/styles/components/_login-form.scss';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/login-type-amadeus.png';
import UserService from '../service/UserService';
import background from '../../assets/images/mainBackground.png';

const LoginForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setError] = useState('')
    const [jwtToken, setJwtToken] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await UserService.login(email, password);
            console.log("RESPUESTA DESDE EL SERVICE DE REACT: ", userData.token, userData.role, userData.message, email, password);
            if (userData.token) {
                localStorage.setItem('token', userData.token);
                localStorage.setItem('role', userData.role);
                setJwtToken(userData.token);
                console.log("ESTA ES LA RESPUESTA DESDE EL LOGIN FORM: ", userData.message);

                // Redirección basada en el rol del usuario
                if (userData.role === 'ADMIN') {
                    navigate('/main');
                } else if (userData.role === 'USER') {
                    navigate('/users-extra-hours');
                }
            } else {
                setError(userData.message)
            }

        } catch (error) {
            console.log(error)
            setError(error.message)
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    }

    return (
        <div style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
            <div class="login-container">
                <h2>Amadeus Service Hub</h2>
                <img alt="Amadeus" src={logo} />
                <form onSubmit={handleSubmit}>
                    <div class="flex-column">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                {errorMessage && <p class="error-message">{errorMessage}</p>}
                {jwtToken && <p class="token-display">JWT Token: {jwtToken}</p>}
                {/* Enlace para redirigir a la página de registro */}
                <p>No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
            </div>
        </div>

    );
};

export default LoginForm;
