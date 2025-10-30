import React, { useState } from 'react';
// Eliminar: BrowserRouter, Routes, Route
// Eliminar: ProtectedRoute, NoAuthRoute

import { useAuth } from './context/AuthContext';
import BooksView from './pages/components/BooksView.jsx';
import SubscriptionsView from './pages/components/SubscriptionsView.jsx';
import './App.css'; 
import HomePage from './pages/HomePage.jsx';
const NavLink = ({ active, onClick, children }) => (
  <button 
    className={`nav-link ${active ? 'active' : ''}`} 
    onClick={onClick}
  >
    {children}
  </button>
);



const App = () => { 
  const { user, logout } = useAuth();
  const [currentView, setCurrentView] = useState('books'); 
  
  const isAdmin = user?.role === 'ADMIN';

  const renderView = () => {
    switch (currentView) {
      case 'books':
        return <BooksView />;
      case 'subscriptions':
        return <SubscriptionsView />;
      default:
        return <BooksView />;
    }
  };

  return (
    <div className="app-container">
      <header className="main-header">
        <h1 className="logo">📚 Librería UDB</h1>
        <div className="user-info">
          <span className="user-email">
            {user?.email} 
            <span className={`user-role role-${user?.role?.toLowerCase()}`}>
              ({user?.role})
            </span>
          </span>
          <button onClick={logout} className="logout-button">
            Cerrar Sesión
          </button>
        </div>
      </header>

      <nav className="main-nav">
        {/* Aquí usas la navegación interna de App, no la de rutas */}
        <NavLink active={currentView === 'books'} onClick={() => setCurrentView('books')}>
          Catálogo de Libros
        </NavLink>
        <NavLink active={currentView === 'subscriptions'} onClick={() => setCurrentView('subscriptions')}>
          Mis Suscripciones
        </NavLink>
        {isAdmin && (
            <span className="admin-tag">ADMINISTRACIÓN</span>
        )}
        {/* Opcional: Navegación a /dashboard si lo separaste */}
        <NavLink active={false} onClick={() => console.log("Navegar a /dashboard")}>
          Dashboard Externo
        </NavLink>
      </nav>

      <main className="content-area">
        {renderView()} {/* Renderiza el contenido de la vista actual */}
      </main>
      
      <footer className="main-footer">
        © 2024 Desafío UDB. Frontend con React.
      </footer>
    </div>
  );
};

export default App;