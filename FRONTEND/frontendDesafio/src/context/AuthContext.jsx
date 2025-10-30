import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);
const API_URL = "http://localhost:8080/api/auth"; 
const TOKEN_KEY = 'jwt_token'; 
const USER_KEY = 'user_data'; 

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getAuthToken = () => localStorage.getItem(TOKEN_KEY);

    useEffect(() => {
        const loadInitialUser = () => {
            const token = getAuthToken();
            const userData = JSON.parse(localStorage.getItem(USER_KEY));

            if (token && userData) {
                setUser(userData);
            }
            setIsLoading(false);
        };

        loadInitialUser();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            
            const { token, email: userEmail, role } = response.data;
            
            const newUser = { email: userEmail, role: role };

            localStorage.setItem(TOKEN_KEY, token);
            localStorage.setItem(USER_KEY, JSON.stringify(newUser));
            
            setUser(newUser);
            return true; 

        } catch (error) {
            console.error("Login failed", error);
            throw error; 
        }
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
        isLoading,
        isAuthenticated: !!user, 
        getAuthToken, 
    };

    if (isLoading) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>Cargando aplicación...</div>;
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};