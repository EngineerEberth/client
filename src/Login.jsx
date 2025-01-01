import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Col, Row, Accordion, Form, Offcanvas, Card, Popover, OverlayTrigger } from 'react-bootstrap';
import { FaBell, FaEnvelope, FaSearch, FaBars, FaSyncAlt, FaFilter } from 'react-icons/fa';
import logo from './assets/logo.png';
import peruFlag from './assets/peru.png';
import profilePhoto from './assets/perfil_logo.jpg';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, LineElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement } from 'chart.js';
import axios from 'axios';
import Destiny from './pages/destiny.jsx'; 
import Pilot from './pages/pilot.jsx'; 
import Plane from './pages/plane.jsx'; 
import Client from './pages/client.jsx'

// Registrar componentes de Chart.js
ChartJS.register(LineElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement);

function App() {
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [username, setUsername] = useState(null); // Estado para almacenar el nombre del usuario
    const [currentPage, setCurrentPage] = useState('home'); // Estado para manejar la página actual

    useEffect(() => {
        // Recuperar el nombre del usuario del localStorage
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('https://fly-airlines-backend-3.onrender.com/api/logout'); 
            localStorage.removeItem('token'); // Elimina el token del almacenamiento local
            localStorage.removeItem('username'); // Elimina el nombre de usuario del almacenamiento local
            window.location.href = '/'; // Redirige a la página de inicio
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    const handleCloseOffcanvas = () => setShowOffcanvas(false);
    const handleShowOffcanvas = () => setShowOffcanvas(true);
    
    // Cambiar la página actual
    const handlePageChange = (page) => {
        setCurrentPage(page);
        handleCloseOffcanvas();
    };

    // Datos del gráfico lineal
    const data = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
            {
                label: 'Ingresos',
                data: [300000, 400000, 500000, 700000, 800000, 900000],
                borderColor: '#36A2EB',
                fill: false,
            },
            {
                label: 'Egresos',
                data: [150000, 250000, 350000, 400000, 450000, 500000],
                borderColor: '#FF6384',
                fill: false,
            },
            {
                label: 'Beneficio Neto',
                data: [150000, 150000, 150000, 300000, 350000, 400000],
                borderColor: '#FFCE56',
                fill: false,
            },
        ],
    };

    const stats = [
        { title: "Ingresos Totales", value: "$2,000,000", change: "+26%", isPositive: true },
        { title: "Egresos Totales", value: "$1,200,000", change: "-10%", isPositive: false },
        { title: "Beneficio Neto", value: "$800,000", change: "+15%", isPositive: true },
        { title: "Coste por Vuelo", value: "$3,500", change: "-5%", isPositive: false },
        { title: "Clientes Recurrentes", value: "12,000", change: "+20%", isPositive: true },
        { title: "Nivel de satisfacción", value: "95%", change: "-3%", isPositive: false },
    ];

    const popover = (
        <Popover id="user-options-popover" style={{ width: '200px' }}>
            <Popover.Header as="h3">Opciones de Usuario</Popover.Header>
            <Popover.Body>
                <Nav.Link href="#perfil" className="text-dark">Perfil</Nav.Link>
                <Nav.Link href="#privacidad" className="text-dark">Privacidad</Nav.Link>
                <Nav.Link href="#cerrar-sesion" className="text-danger" onClick={handleLogout}>Cerrar Sesión</Nav.Link>
            </Popover.Body>
        </Popover>
    );

    return (
        <div className="app-body">
            <Container fluid className="vh-100">
                <Row className="h-100">
                    {/* Barra lateral para pantallas grandes */}
                    <Col xs={2} className="d-none d-lg-flex flex-column p-0 navy-background fixed-left">
                        <Navbar data-bs-theme="dark" className="flex-column flex-grow-1">
                            <Navbar.Brand href="#home">
                                <ul className="empresa">
                                    <li><img src={logo} alt="Logotipo de la Empresa" className="logo" /></li>
                                    <li><p className="Fly">FLY ADMIN</p></li>
                                </ul>
                            </Navbar.Brand>
                            <Nav className="flex-column">
                                {/* Secciones de navegación */}
                                <Nav.Item>
                                    <div className="custom-hover">
                                        <Nav.Link  className="text-white" onClick={() => handlePageChange('home')}>Página Principal</Nav.Link>
                                    </div>
                                </Nav.Item>
                                <Nav.Item>
                                    <div className="custom-hover">
                                        <Nav.Link className="text-white" onClick={() => handlePageChange('destinos')} >Destinos Disponibles</Nav.Link>
                                    </div>
                                </Nav.Item>
                                <Nav.Item>
                                    <div className="custom-hover">
                                        <Nav.Link className="text-white" onClick={()=>handlePageChange('pilotos')}>Lista de Pilotos</Nav.Link>
                                    </div>
                                </Nav.Item>
                                <Nav.Item>
                                    <div className="custom-hover">
                                        <Nav.Link className="text-white"onClick={() => handlePageChange('aviones')}>Lista de Aviones</Nav.Link>
                                    </div>
                                </Nav.Item>
                                <Nav.Item>
                                    <div className="custom-hover">
                                        <Nav.Link className="text-white"onClick={() => handlePageChange('usuarios')}>Lista de Usuarios</Nav.Link>
                                    </div>
                                </Nav.Item>
                                <Nav.Item>
                                    <div className="custom-hover">
                                        <Nav.Link href="#opciones" className="text-white">Opciones de usuario</Nav.Link>
                                    </div>
                                </Nav.Item>
                            </Nav>
                        </Navbar>
                    </Col>

                    {/* Contenedor principal con margen izquierdo */}
                    <Col xs={12} lg={10} className="p-0 body" style={{ marginLeft: 'auto' }}>
                        <Navbar bg="light" expand="lg">
                            <Container fluid className="d-flex justify-content-between align-items-center menu-icons">
                                <button className="d-lg-none menu-button me-3" onClick={handleShowOffcanvas}>
                                    <FaBars size={30} />
                                </button>
                                <Form className="d-flex align-items-center form">
                                    <Form.Control
                                        type="search"
                                        placeholder="Buscar"
                                        className="me-2 form-control d-none d-lg-block"
                                        aria-label="Buscar"
                                    />
                                    <button className="search-button d-none d-lg-block">
                                        <FaSearch className="search-icon" />
                                    </button>
                                </Form>
                                <Nav className="d-flex align-items-center flex-row">
                                    <Nav.Link href="#notifications" className="me-3">
                                        <FaBell size={20} style={{ color: 'rgb(0, 0, 139)' }} />
                                    </Nav.Link>
                                    <Nav.Link href="#messages" className="me-3">
                                        <FaEnvelope size={20} style={{ color: 'rgb(0, 0, 139)' }} />
                                    </Nav.Link>
                                    <Nav.Link href="#">
                                        <img src={peruFlag} alt="Bandera Peruana" className="flag-icon" />
                                    </Nav.Link>
                                    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                                        <Nav.Link href="#" className="me-3 position-relative">
                                            <img src={profilePhoto} alt="Usuario" className="user-icon" />
                                            <span className="online-indicator"></span>
                                        </Nav.Link>
                                    </OverlayTrigger>
                                </Nav>
                            </Container>
                        </Navbar>

                        <div className="main-content mx-3" style={{ marginTop: '60px' }}>
                            {currentPage === 'home'&& (
                              
                                <>
                                    <Row className="flex-grow-1">
                                        <Col className="p-3 d-flex justify-content-between align-items-center flex-wrap">
                                            <div>
                                                <h2 className="h4">Estadísticas económicas de la Aerolínea</h2>
                                                <p>{username ? `Hola, ${username}! Aquí tendrás la información completa de las finanzas.` : "Hola! Aquí tendrás la información completa de las finanzas."}</p>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <FaSyncAlt size={20} style={{ color: 'rgb(0, 0, 139)', marginRight: '10px', cursor: 'pointer' }} />
                                                <FaFilter size={20} style={{ color: 'rgb(0, 0, 139)', marginRight: '10px', cursor: 'pointer' }} />
                                                <div style={{
                                                    backgroundColor: 'rgba(0, 0, 139, 0.1)',
                                                    color: 'rgb(0, 0, 139)',
                                                    padding: '5px 10px',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer'
                                                }}>
                                                    {new Date().toLocaleDateString()}
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className="justify-content-center p-3">
                                        <Col xs={12} md={6} className="d-flex justify-content-center align-items-center">
                                            <Card className="p-3 w-100 text-center stat-card">
                                                <Card.Body className="d-flex flex-column align-items-center">
                                                    <h5 className="mb-3">Distribución de Ingresos</h5>
                                                    <div className="line-chart" style={{ width: '80%', height: '374px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Line 
                                                            data={data} 
                                                            options={{
                                                                responsive: true,
                                                                maintainAspectRatio: false,
                                                            }} 
                                                        />
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <Row className="g-3 d-flex flex-wrap">
                                                {stats.map((stat, index) => (
                                                    <Col xs={12} sm={6} md={6} key={index}>
                                                        <Card className="text-center h-100">
                                                            <Card.Body>
                                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                                    <span className="badge text-white" style={{ backgroundColor: 'red', borderRadius: '10px', padding: '5px 10px' }}>Hoy</span>
                                                                    <Card.Title className="text-center flex-grow-1">{stat.title}</Card.Title>
                                                                </div>
                                                                <Card.Text style={{ fontSize: '1.5rem' }}>{stat.value}</Card.Text>
                                                                <div className="d-flex justify-content-center align-items-center">
                                                                    <div
                                                                        className={`percentage-box ${stat.isPositive ? 'bg-success' : 'bg-danger'}`}
                                                                        style={{ padding: '2px 5px', fontSize: '0.85rem', lineHeight: '1.2rem', display: 'flex', alignItems: 'center' }}
                                                                    >
                                                                        {stat.change}
                                                                    </div>
                                                                    <span className="small-text ms-2" style={{ fontSize: '0.85rem', lineHeight: '1.2rem' }}>desde el mes pasado</span>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </Col>
                                    </Row>
                                </>
                            )}
                            {currentPage === 'destinos' && <Destiny />}
                            {currentPage === 'pilotos' && <Pilot />}
                            {currentPage === 'aviones' && <Plane />}
                            {currentPage === 'usuarios' && <Client />}
                        </div>
                    </Col>

                    {/* Offcanvas para pantallas pequeñas */}
                    <Col xs={12} className="d-lg-none p-0">
                        <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} placement="start" className="custom-offcanvas">
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>
                                    <div className="d-flex align-items-center">
                                        <img src={logo} alt="Logotipo de la Empresa" className="logo me-2" />
                                        <span style={{ color: 'white' }}>FLY ADMIN</span>
                                    </div>
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="flex-column">
                                    {/* Secciones de navegación */}
                                    <Nav.Item>
                                        <div className="custom-hover">
                                            <Nav.Link href="#home" className="text-white" onClick={() => handlePageChange('home')}>Página Principal</Nav.Link>
                                        </div>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <div className="custom-hover">
                                            <Nav.Link onClick={() => handlePageChange('destinos')} className="text-white">Destinos Disponibles</Nav.Link>
                                        </div>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <div className="custom-hover">
                                            <Nav.Link onClick={() => handlePageChange('pilotos')} className="text-white">Lista de Pilotos</Nav.Link>
                                        </div>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <div className="custom-hover">
                                            <Nav.Link onClick={() => handlePageChange('aviones')} className="text-white">Lista de Aviones</Nav.Link>
                                        </div>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <div className="custom-hover">
                                            <Nav.Link onClick={() => handlePageChange('usuarios')} className="text-white">Lista de Usuarios</Nav.Link>
                                        </div>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <div className="custom-hover">
                                            <Nav.Link href="#usuarios" className="text-white">Opciones de usuario</Nav.Link>
                                        </div>
                                    </Nav.Item>
                                </Nav>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;