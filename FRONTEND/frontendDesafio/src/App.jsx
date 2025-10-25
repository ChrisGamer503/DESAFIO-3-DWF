// App.jsx
import React from 'react';
import { useAuth } from './context/AuthContext';
// Importa cualquier otro componente que uses en tu página principal

function App() {
  const { user, logout } = useAuth();

  return (
    <div>
      {/* <MiHeader /> Si tienes un header/nav */}
      
      <h1>Página Principal (Protegida)</h1>
      <p>Bienvenido al área protegida, **{user?.email}**!</p>
      
      <button onClick={logout}>Cerrar Sesión</button>
      
      {/* Aquí va el contenido principal de tu aplicación */}
      {/* Puedes mover el HomePage.jsx a este archivo si quieres que este sea tu único componente protegido */}
    </div>
  );
}

export default App;