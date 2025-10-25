// main.jsx (o index.js)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import {AuthProvider} from "../src/context/AuthContext.jsx"
import LoginPage from './pages/LoginPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import HomePage from './pages/HomePage.jsx'; 
import NoAuthRoute from './components/NoAuthRoute.jsx';

// 1. Define las rutas
const router = createBrowserRouter([
  {
    element: <NoAuthRoute/>,
    children:[
      {
        path: '/login',
        element: <LoginPage />,
      }
    ]
    
  },
  {
    element: <ProtectedRoute />, // Este elemento aplica la protección
    children: [
      {
        path: '/',
        element: <App />, // App.jsx contendrá el layout/contenido principal
      },
      {
        path: '/dashboard',
        element: <HomePage />, // Ejemplo de una sub-página protegida
      },
    ],
  },
  // Opcional: Manejo de ruta no encontrada (404)
  {
    path: '*',
    element: <h1>404 - Página no encontrada</h1>,
  },
]);

// 2. Renderiza la aplicación con el proveedor de autenticación
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);