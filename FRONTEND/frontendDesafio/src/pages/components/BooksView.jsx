import React, { useState } from 'react';
import { useBooks } from './../../hooks/useBooks'; 
import BookModal from '../components/BookModal';
import Swal from 'sweetalert2'; 

const BooksView = () => {
    const { 
        books, 
        loading, 
        error, 
        isAdmin, 
        createBook, 
        updateBook, 
        deleteBook 
    } = useBooks(); 
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookToEdit, setBookToEdit] = useState(null);

    const handleModalSubmit = async (data, id) => {
        let success = false;
        if (id) {
            success = await updateBook(id, data);
        } else {
            success = await createBook(data);
        }
        
        if (success) {
            Swal.fire('Éxito', `Libro ${id ? 'actualizado' : 'creado'} correctamente.`, 'success');
            return true;
        } else {
            return false;
        }
    };

    const handleCreateClick = () => {
        setBookToEdit(null); 
        setIsModalOpen(true);
    };

    const handleEditClick = (book) => {
        setBookToEdit(book); 
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setBookToEdit(null);
    };
    
    const handleDeleteClick = (bookId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, ¡eliminar!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await deleteBook(bookId);
                if (success) {
                    Swal.fire('¡Eliminado!', 'El libro ha sido eliminado.', 'success');
                } else {
                    Swal.fire('Error', 'No se pudo eliminar el libro.', 'error');
                }
            }
        });
    };

    if (loading) return <div className="loading-state">Cargando libros...</div>;
    if (error) return <div className="error-state">Error al cargar libros: {error}</div>;

    return (
        <div className="view-container">
            <h2>📚 Catálogo de Libros</h2>
            
            {isAdmin && (
                <button 
                    onClick={handleCreateClick} 
                    className="action-button primary add-button"
                >
                    ➕ Crear Nuevo Libro
                </button>
            )}

            <div className="book-list">
                {books.length === 0 ? (
                    <p className="no-data">No hay libros disponibles en el catálogo.</p>
                ) : (
                    books.map(book => (
                        <div key={book.id} className="book-card">
                            <h4 className="book-title">{book.title}</h4>
                            <p className="book-author">Autor: {book.author}</p>
                            <span className="book-year">Publicado en: {book.publicationYear}</span>
                            
                            {isAdmin && (
                                <div className="book-actions">
                                    <button 
                                        onClick={() => handleEditClick(book)} 
                                        className="action-button tertiary"
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteClick(book.id)} 
                                        className="action-button delete-button"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            )}
                            
                        </div>
                    ))
                )}
            </div>
            
            {/* Modal de Creación/Edición */}
            <BookModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleModalSubmit}
                bookToEdit={bookToEdit}
            />
        </div>
    );
};

export default BooksView;