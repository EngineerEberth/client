import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './Login.module.css'; 
import logo from './assets/logo.png';
import imagen from './assets/jumbo-jet-flying-sky.jpg';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Para redirigir después del inicio de sesión

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Usamos axios en lugar de fetch
      const response = await axios.post('https://fly-airlines-backend-2.onrender.com/api/login', { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Permite el envío de cookies si usas cookies
      });

      // Si el inicio de sesión es exitoso, se guarda el token en localStorage
      localStorage.setItem('token', response.data.token); // Guarda el token
      localStorage.setItem('username', response.data.username); // Guarda el nombre de usuario (si es necesario)

      // Redirige al usuario a la página principal
      navigate('/login');  // Cambia a la ruta que desees mostrar después del login
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <Container fluid className="vh-100 p-0 d-flex"> 
      <div className="flex-grow-1 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgb(23, 23, 87)', width: '500px' }}>
        <Card className="p-4" style={{ width: '380px', borderRadius: '10px', margin: '0 auto' }}>
          <div className="text-center mb-4">
            <img src={logo} alt="Logo de FLY AIRLINES" className="mb-2" style={{ width: '80px' }} />
            <h3 className="text-black">FLY AIRLINES</h3>
          </div>
          <Card.Title className="text-center text-white">Iniciar sesión</Card.Title>
          {error && <p className="text-danger">{error}</p>} 
          <Form onSubmit={handleSubmit}>
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
              Iniciar Sesión
            </Button>
          </Form>
          <div className="text-center mt-3">
            <p className="text-black">
              ¿No tienes una cuenta? Da clic en
              <Link to="/register" className="text-primary" style={{ textDecoration: 'none' }}> Registrarse</Link>
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

export default App;
