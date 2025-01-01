import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import App from './App.jsx'; 
import Register from './Register.jsx'; 
import Login from './Login.jsx';
import './index.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Router>
      <Routes> 
        <Route path="/" element={<App />} /> {/* Ruta para el componente de inicio de sesión */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> {/* Ruta para el componente de registro */}
      </Routes>
    </Router>
  </StrictMode>
);
