// context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);
const API_URL = "http://localhost:8080/api/auth"; // Ajusta tu URL del backend

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const { token, email: userEmail, role } = response.data;      
      
      localStorage.setItem('token', token);      
      setUser({ email: userEmail, role: role }); 
      localStorage.setItem('userRole', role);
      setAuthenticated(true);

    } catch (error) {
      console.error("Login failed", error);
      throw error; 
    }
  };

  loadUserFromLocalStorage = () => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole'); // 👈 Leer el rol
    const userEmail = localStorage.getItem('userEmail'); // Si lo guardaste al inicio
    
    if (token && userEmail && userRole) {
        setAuthenticated(true);
        // Cargar el rol en el estado
        setUser({ email: userEmail, role: userRole }); 
    }
};

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  
  const value = { user, login, logout, isAuthenticated: !!user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};