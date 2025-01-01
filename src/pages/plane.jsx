import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './plane.module.css';

const Planes = () => {
    const [planes, setPlanes] = useState([]);
    const [formData, setFormData] = useState({
        matricula: '',
        modelo: '',
        fabricante: '',
        capacidadPasajeros: '',
        capacidadCargaKg: '',
        anoFabricacion: '',
        estado: 'Operativo', // Valor por defecto
    });
    const [editing, setEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchPlanes = async () => {
        try {
            const response = await axios.get('https://fly-airlines-backend-2.onrender.com/api/aviones', { withCredentials: true });
            setPlanes(response.data);
        } catch (error) {
            console.error("Error al obtener aviones:", error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchPlanes();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPlanes = planes.filter(plane =>
        plane.modelo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                await axios.put(`https://fly-airlines-backend-2.onrender.com/api/aviones/${formData._id}`, formData, { withCredentials: true });
            } else {
                await axios.post('https://fly-airlines-backend-2.onrender.com/api/aviones', formData, { withCredentials: true });
            }
            fetchPlanes();
            setFormData({
                matricula: '',
                modelo: '',
                fabricante: '',
                capacidadPasajeros: '',
                capacidadCargaKg: '',
                anoFabricacion: '',
                estado: 'Operativo',
            });
            setEditing(false);
        } catch (error) {
            console.error("Error al guardar avión:", error.response ? error.response.data : error.message);
        }
    };

    const handleEdit = (plane) => {
        setFormData(plane);
        setEditing(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://fly-airlines-backend-2.onrender.com/api/aviones/${id}`, { withCredentials: true });
            fetchPlanes();
        } catch (error) {
            console.error("Error al eliminar avión:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className={styles.planesContainer}>
            <h2>Lista de Aviones</h2>
            <form onSubmit={handleSubmit}>

            <label for="matricula" style={{color:"rgb(23, 23, 87)"}}>Matricula</label>
                <input type="text" name="matricula" placeholder="Ej. AB-123 / XA_CXZ" value={formData.matricula} onChange={handleChange} required />
                
                <label for="modelo" style={{color:"rgb(23, 23, 87)"}}>Modelo del avion</label>
                <input type="text" name="modelo" placeholder="Modelo" value={formData.modelo} onChange={handleChange} required />
                
                <label for="fabricante" style={{color:"rgb(23, 23, 87)"}}>Fabricante del avion</label>
                <input type="text" name="fabricante" placeholder="Fabricante" value={formData.fabricante} onChange={handleChange} required />
                
                <label for="capacidad_pasajeros" style={{color:"rgb(23, 23, 87)"}}>Capacidad de pasajeros</label>
                <input type="number" name="capacidadPasajeros" placeholder="Capacidad Pasajeros (numerico)" value={formData.capacidadPasajeros} onChange={handleChange} required />
                
                <label for="capacidad_carga" style={{color:"rgb(23, 23, 87)"}}>Capacidad de carga</label>
                <input type="number" name="capacidadCargaKg" placeholder="Capacidad Carga (numerico)" value={formData.capacidadCargaKg} onChange={handleChange} required />
                
                <label for="año_fabricacion" style={{color:"rgb(23, 23, 87)"}}>Año de fabricacion</label>
                <input type="number" name="anoFabricacion" placeholder="Ej. 1950 - 2024" value={formData.anoFabricacion} onChange={handleChange} required />
                
                <label for="estado" style={{color:"rgb(23, 23, 87)"}}>Estado del avion</label>
                <select name="estado" value={formData.estado} onChange={handleChange}>
                    <option value="Operativo">Operativo</option>
                    <option value="En Mantenimiento">En Mantenimiento</option>
                    <option value="Fuera de Servicio">Fuera de Servicio</option>
                </select>
                <button type="submit">{editing ? 'Actualizar' : 'Agregar'} Avión</button>
            </form>

            <input
                type="text"
                placeholder="Buscar avión..."
                className={styles.searchInput}
                value={searchTerm}
                onChange={handleSearch}
            />

            <table>
                <thead>
                    <tr>
                        <th>Matrícula</th>
                        <th>Modelo</th>
                        <th>Fabricante</th>
                        <th>Capacidad Pasajeros</th>
                        <th>Capacidad Carga (kg)</th>
                        <th>Año de Fabricación</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPlanes.map((plane) => (
                        <tr key={plane._id}>
                            <td>{plane.matricula}</td>
                            <td>{plane.modelo}</td>
                            <td>{plane.fabricante}</td>
                            <td>{plane.capacidadPasajeros}</td>
                            <td>{plane.capacidadCargaKg}</td>
                            <td>{plane.anoFabricacion}</td>
                            <td>{plane.estado}</td>
                            <td>
                                <button onClick={() => handleEdit(plane)}>Editar</button>
                                <button onClick={() => handleDelete(plane._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Planes;