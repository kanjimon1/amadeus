import React, { useState, useContext } from 'react';
import '../../assets/styles/components/_login-form.scss';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/login-type-amadeus.png';
import background from '../../assets/images/mainBackground.png';
import { AuthContext } from '../context/AuthContext';

const LoginForm = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (error) {
            setError('Login failed');
        }
    };

    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh'
        }}>
            <br />
            <br />
            <br />
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
                {/*{jwtToken && <p class="token-display">JWT Token: {jwtToken}</p>}*/}
                {/* Enlace para redirigir a la página de registro */}
                <br />
                <p>No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
            </div>
        </div>

    );
};

export default LoginForm;
