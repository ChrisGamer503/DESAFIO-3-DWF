import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

// Usamos el endpoint personal que creamos en el backend
const API_URL = 'http://localhost:8080/api/subscriptions/my'; 
const CREATE_URL = 'http://localhost:8080/api/subscriptions';

export const useSubscriptions = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('token');
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    // Función para obtener las suscripciones del usuario logueado
    const fetchMySubscriptions = async () => {
        if (!isAuthenticated) return;

        setLoading(true);
        try {
            // No enviamos userId, el backend lo obtiene del JWT
            const response = await axios.get(API_URL, config);
            setSubscriptions(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching subscriptions:", err);
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                 setError('Error de sesión. Por favor, inicie sesión de nuevo.');
                 logout();
            } else {
                 setError('Error al cargar sus suscripciones.');
            }
        } finally {
            setLoading(false);
        }
    };
    
    // Función para crear una nueva suscripción
    const createSubscription = async (dto) => {
        if (!isAuthenticated) return false;
        
        try {
             const response = await axios.post(CREATE_URL, dto, config);
             
             // Agrega la nueva suscripción y recarga
             setSubscriptions(prev => [...prev, response.data]);
             return true;

        } catch (err) {
            console.error("Error creating subscription:", err);
            setError(err.response?.data?.message || 'Fallo la creación de la suscripción.');
            return false;
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchMySubscriptions();
        } else {
            setSubscriptions([]);
            setLoading(false);
        }
    }, [isAuthenticated]);

    return { subscriptions, loading, error, fetchMySubscriptions, createSubscription };
};