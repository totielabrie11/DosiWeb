import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from './configLocalHost'; // Importar la URL del backend
import './Login.css';

const Login = ({ setIsAdmin, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Usar BACKEND_URL en la llamada a la API
      const response = await fetch(`${BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.success) {
        // Guardar el usuario en el localStorage
        localStorage.setItem('user', JSON.stringify({ name: data.username, role: data.role }));
        // Establecer si el usuario es administrador
        setIsAdmin(data.role === 'administrador');
        setUser({ name: data.username, role: data.role });
        setSuccess('Logueado correctamente. Se ha agregado el menú administrador. Redirigiendo...');
        // Redirigir a la vista original o al home
        setTimeout(() => navigate('/home'), 3000);
      } else {
        setError('Credenciales inválidas.');
      }
      
    } catch (error) {
      setError('Ocurrió un error. Por favor, intente nuevamente.');
    }
  };

  return (
    <div id="login-wrapper">
      <div id="login-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
  