import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://localhost:8080/api/books';

export const useBooks = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('token');
    
    // Configuración con el token JWT
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    // Función para obtener todos los libros
    const fetchBooks = async () => {
        if (!isAuthenticated) return;

        setLoading(true);
        try {
            // El backend verifica si el usuario autenticado tiene permiso para ver libros
            const response = await axios.get(API_URL, config);
            setBooks(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching books:", err);
            // Si el backend devuelve 401/403 (Token inválido o expirado)
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                setError('Su sesión ha expirado o no tiene permiso. Por favor, inicie sesión de nuevo.');
                logout();
            } else {
                setError('Error al cargar la lista de libros.');
            }
        } finally {
            setLoading(false);
        }
    };
    
    // Función para crear un libro (solo ADMIN)
    const createBook = async (bookData) => {
        if (user?.role !== 'ADMIN') {
            setError('Acceso denegado. Solo administradores pueden crear libros.');
            return false;
        }

        try {
            const response = await axios.post(API_URL, bookData, config);
            // Agrega el nuevo libro a la lista localmente y recarga
            setBooks(prev => [...prev, response.data]);
            return true;
        } catch (err) {
            console.error("Error creating book:", err);
            setError(err.response?.data?.message || 'Fallo la creación del libro.');
            return false;
        }
    };

    // Recarga la lista de libros al montar o si el estado de auth cambia
    useEffect(() => {
        if (isAuthenticated) {
            fetchBooks();
        } else {
             setBooks([]); // Limpia la lista si no está autenticado
             setLoading(false);
        }
    }, [isAuthenticated]);

    return { books, loading, error, fetchBooks, createBook, isAdmin: user?.role === 'ADMIN' };
};