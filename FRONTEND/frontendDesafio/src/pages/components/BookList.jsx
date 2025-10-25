import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; 

const BookList = () => {
    const { user } = useAuth();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No está autenticado para ver los libros.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:8080/api/books', {
                    headers: {
                        // 🛑 Enviar el token como Bearer
                        Authorization: `Bearer ${token}`, 
                    },
                });
                setBooks(response.data);
                setError(null);
            } catch (err) {
                console.error('Error al obtener libros:', err);
                setError('Falló la conexión o no tiene permiso para ver el recurso.');
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) return <div>Cargando libros...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Libros Disponibles</h2>
            {user?.role === 'ADMIN' && (
                <button>Crear Nuevo Libro</button>
            )}

            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        {book.title} por {book.author} ({book.publicationYear})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;