import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://localhost:8080/api/books';

export const useBooks = () => {
    // 🛑 CLAVE: Importar getAuthToken desde el contexto
    const { isAuthenticated, user, logout, getAuthToken } = useAuth(); 
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const isAdmin = user?.role === 'ADMIN';

    // 🛑 CLAVE: getConfig usa getAuthToken para obtener el valor más fresco
    const getConfig = () => {
        const token = getAuthToken(); // Obtiene el token más reciente y garantiza su existencia
        if (!token) return {}; 
        
        return {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
    };

    const fetchBooks = async () => {
        if (!isAuthenticated) {
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(API_URL, getConfig());
            setBooks(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching books:", err);
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                setError('Su sesión ha expirado o no tiene permiso. Iniciando Logout...');
                logout(); 
            } else {
                setError('Error al cargar la lista de libros. Revisa la conexión con el backend.');
            }
        } finally {
            setLoading(false);
        }
    };
    
    // Función para crear un libro (solo ADMIN)
    const createBook = async (bookData) => {
        if (!isAdmin) {
            setError('Acceso denegado. Solo administradores pueden crear libros.');
            return false;
        }

        try {
            const response = await axios.post(API_URL, bookData, getConfig());
            setBooks(prev => [...prev, response.data]);
            setError(null);
            return true;
        } catch (err) {
            console.error("Error creating book:", err);
            setError(err.response?.data?.message || 'Fallo la creación del libro.');
            return false;
        }
    };
    
    // Función para actualizar un libro (solo ADMIN)
    const updateBook = async (id, bookData) => {
        if (!isAdmin) {
            setError('Acceso denegado. Solo administradores pueden actualizar libros.');
            return false;
        }
        
        try {
            const response = await axios.put(`${API_URL}/${id}`, bookData, getConfig());
            setBooks(prev => prev.map(book => book.id === id ? response.data : book));
            setError(null);
            return true;
        } catch (err) {
            console.error("Error updating book:", err);
            // Si hay un error, el hook lo reporta
            setError(err.response?.data?.message || 'Fallo la actualización del libro.');
            return false;
        }
    };

    // Función para eliminar un libro (solo ADMIN)
    const deleteBook = async (id) => {
        if (!isAdmin) {
            setError('Acceso denegado. Solo administradores pueden eliminar libros.');
            return false;
        }
        
        try {
            await axios.delete(`${API_URL}/${id}`, getConfig());
            setBooks(prev => prev.filter(book => book.id !== id));
            setError(null);
            return true;
        } catch (err) {
            console.error("Error deleting book:", err);
            setError(err.response?.data?.message || 'Fallo la eliminación del libro.');
            return false;
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchBooks();
        } else {
             setBooks([]); 
             setLoading(false);
        }
    }, [isAuthenticated]);

    return { 
        books, 
        loading, 
        error, 
        fetchBooks, 
        createBook, 
        updateBook, 
        deleteBook,
        isAdmin
    };
};