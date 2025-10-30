import React, { useState, useEffect } from 'react';

const BookModal = ({ isOpen, onClose, onSubmit, bookToEdit = null }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [year, setYear] = useState('');
    const [localError, setLocalError] = useState(null);

    const isEditMode = !!bookToEdit;

    useEffect(() => {
        if (bookToEdit) {
            setTitle(bookToEdit.title);
            setAuthor(bookToEdit.author);
            setYear(String(bookToEdit.publicationYear));
        } else {
            setTitle('');
            setAuthor('');
            setYear('');
        }
    }, [bookToEdit, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setLocalError(null);

        if (!title || !author || !year) {
            setLocalError('Todos los campos son obligatorios.');
            return;
        }

        const data = { 
            title, 
            author, 
            publicationYear: parseInt(year) 
        };

        onSubmit(data, bookToEdit?.id)
            .then(success => {
                if (success) onClose(); 
            })
            .catch(err => {
                setLocalError('Error al guardar el libro: ' + err.message);
            });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3 className="modal-title">
                    {isEditMode ? '✍️ Editar Libro' : '➕ Crear Nuevo Libro'}
                </h3>
                <form onSubmit={handleSubmit} className="crud-form">
                    <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <input type="text" placeholder="Autor" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                    <input type="number" placeholder="Año de Publicación" value={year} onChange={(e) => setYear(e.target.value)} required min="1500" max="2100" />
                    
                    {localError && <p className="error-message">{localError}</p>}
                    
                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="action-button secondary">
                            Cancelar
                        </button>
                        <button type="submit" className="action-button primary">
                            {isEditMode ? 'Guardar Cambios' : 'Crear Libro'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookModal;