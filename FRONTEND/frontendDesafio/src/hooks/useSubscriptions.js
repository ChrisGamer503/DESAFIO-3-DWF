import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://localhost:8080/api/subscriptions'; 

export const useSubscriptions = () => {
    const { isAuthenticated, user, logout, getAuthToken } = useAuth(); 
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const getConfig = () => {
        const token = getAuthToken();
        return {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
    };

    const fetchMySubscriptions = async () => {
        if (!isAuthenticated) {
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(API_URL, getConfig());
            setSubscriptions(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching subscriptions:", err);
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                 setError('Error de sesión. Por favor, inicie sesión de nuevo.');
                 logout();
            } else {
                 setError('Error al cargar sus suscripciones. Revisa la conexión con el backend.');
            }
        } finally {
            setLoading(false);
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

    // Omitiendo createSubscription que no usa la vista principal
    return { subscriptions, loading, error, fetchMySubscriptions };
};