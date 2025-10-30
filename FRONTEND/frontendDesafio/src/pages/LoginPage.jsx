import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Necesario para la función de registro

// Componente separado para el formulario de Login
const LoginForm = ({ onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            // Manejo de errores más robusto si viene de la API
            const msg = err.response?.data?.message || 'Credenciales inválidas. Por favor, revisa tu email y contraseña.';
            setError(msg);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="📧 Email" 
                required 
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="🔒 Contraseña" 
                required 
            />
            <button type="submit" className="auth-button primary">Iniciar Sesión</button>
            {error && <p className="error-message">{error}</p>}
            <p className="switch-prompt">
                ¿No tienes cuenta? <button type="button" onClick={onSwitchToRegister} className="switch-button">Regístrate</button>
            </p>
        </form>
    );
};

// Componente para el formulario de Registro
const RegisterForm = ({ onSwitchToLogin }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    
    // Asumiendo que tu endpoint de registro es POST /api/users
    const API_URL = "http://localhost:8080/api/users"; 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        // Nota: En un sistema real, el usuario registrado debe tener el rol 'USER' por defecto
        try {
            await axios.post(API_URL, {
                firstName,
                lastName,
                email,
                password,
            });
            setMessage('✅ Registro exitoso. Por favor, inicia sesión.');
            // Opcional: limpiar campos
            setFirstName(''); setLastName(''); setEmail(''); setPassword('');
        } catch (err) {
            const msg = err.response?.data?.message || 'Fallo el registro. Inténtalo de nuevo.';
            setError(msg);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <input 
                type="text" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                placeholder="👤 Nombre" 
                required 
            />
            <input 
                type="text" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                placeholder="👤 Apellido (Opcional)" 
            />
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="📧 Email" 
                required 
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="🔒 Contraseña (mín. 6 chars)" 
                required 
            />
            <button type="submit" className="auth-button secondary">Registrarse</button>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <p className="switch-prompt">
                ¿Ya tienes cuenta? <button type="button" onClick={onSwitchToLogin} className="switch-button">Inicia Sesión</button>
            </p>
        </form>
    );
};


// Componente principal de la página de Login/Registro
const LoginPage = () => {
    const [isLoginView, setIsLoginView] = useState(true);

    return (
        <div className="auth-page-container">
            <div className="auth-box">
                <h1 className="auth-title">📚 Librería UDB</h1>
                
                {/* Pestañas de Navegación */}
                <div className="tab-switcher">
                    <button 
                        className={`tab-button ${isLoginView ? 'active' : ''}`} 
                        onClick={() => setIsLoginView(true)}
                    >
                        Iniciar Sesión
                    </button>
                    <button 
                        className={`tab-button ${!isLoginView ? 'active' : ''}`} 
                        onClick={() => setIsLoginView(false)}
                    >
                        Registrarse
                    </button>
                </div>

                {/* Contenido del Formulario */}
                <div className="form-content">
                    {isLoginView ? (
                        <LoginForm onSwitchToRegister={() => setIsLoginView(false)} />
                    ) : (
                        <RegisterForm onSwitchToLogin={() => setIsLoginView(true)} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;