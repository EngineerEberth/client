import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Register.module.css';
import logo from './assets/logo.png';
import imagen from './assets/jumbo-jet-flying-sky-2.jpg';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('https://fly-airlines-backend-3.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error en el registro');

      setSuccess('Registro exitoso. Redirigiendo a la página de inicio de sesión...');
      setTimeout(() => navigate('/'), 2000); // Redirige después de 2 segundos
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container fluid className="vh-100 p-0 d-flex">
      <div className="flex-grow-1 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgb(23, 23, 87)', width: '550px' }}>
        <Card className="p-4" style={{ width: '380px', borderRadius: '10px', margin: '0 auto' }}>
          <div className="text-center mb-4">
            <img src={logo} alt="Logo de FLY AIRLINES" className="mb-2" style={{ width: '80px' }} />
            <h3 className="text-black">FLY AIRLINES</h3>
          </div>
          <Card.Title className="text-center text-white">Registrarse</Card.Title>
          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="text">Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text">Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text">Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Registrarse
            </Button>
          </Form>
          <div className="text-center mt-3">
            <p className="text-black">
              ¿Ya tienes una cuenta? Da clic en
              <Link to="/" className="text-primary" style={{ textDecoration: 'none' }}> iniciar sesión</Link>
            </p>
          </div>
        </Card>
      </div>
      <div className="flex-grow-1">
        <img src={imagen} alt="Imagen de fondo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    </Container>
  );
}

export default Register;
