import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const PROTECTED_API_URL = "http://localhost:8080/api/users";

const HomePage = () => {
  const { user, logout } = useAuth();
  const [data, setData] = useState(null);

  // Ejemplo de llamada a API protegida
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(PROTECTED_API_URL, {
          headers: {
            // Usa el token y el tokenType que recibiste del backend
            Authorization: `${user.tokenType} ${user.token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error al cargar datos protegidos:", error);
        // Si el token expira, podrías querer llamar a logout() aquí
      }
    };

    fetchData();
  }, [user]);


  return (
    <div>
      <h1>Bienvenido, {user.email}!</h1>
      <button onClick={logout}>Cerrar Sesión</button>
      
      {data ? (
        <pre>Datos protegidos cargados: {JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default HomePage;