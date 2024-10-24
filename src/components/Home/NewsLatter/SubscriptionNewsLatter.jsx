// SubscriptionNewsLatter.jsx
import React, { useState, useEffect } from 'react';

const SubscriptionNewsLatter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('Aún en fabricación, estará funcionando pronto.');
    setEmail('');
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="container my-5 p-5" style={{ backgroundColor: '#f9f9f9', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <div className="row">
        <div className="col-12 text-center">
          <h2 style={{ color: '#333', fontWeight: 'bold', marginBottom: '20px' }}>Suscríbete a nuestro boletín de noticias</h2>
          <p style={{ color: '#666', marginBottom: '30px' }}>Recibe actualizaciones y noticias directamente en tu bandeja de entrada</p>
          <form onSubmit={handleSubmit} className="d-flex justify-content-center align-items-center flex-column flex-md-row">
            <input
              type="email"
              className="form-control mb-3 mb-md-0 w-75 w-md-50"
              style={{ padding: '15px', borderRadius: '50px', border: '1px solid #ccc', outline: 'none' }}
              placeholder="Ingresa tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-primary mx-2 px-4 py-2"
              style={{ borderRadius: '50px', fontWeight: 'bold', backgroundColor: '#007bff', border: 'none' }}
            >
              Suscribirse
            </button>
          </form>
          {message && <p className="mt-4" style={{ color: '#007bff', fontWeight: 'bold' }}>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionNewsLatter;
