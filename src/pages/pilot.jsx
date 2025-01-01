import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './pilot.module.css';

const Pilotos = () => {
    const [pilotos, setPilotos] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        licencia: '',
        rango: 'Capitán', // Valor por defecto
        nacionalidad: '',
        horasVuelo: '',
        experiencia: '',
        estado: 'Activo',
    });
    const [editing, setEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchPilotos = async () => {
        try {
            const response = await axios.get('https://fly-airlines-backend-3.onrender.com/api/pilotos', { withCredentials: true });
            setPilotos(response.data);
        } catch (error) {
            console.error("Error al obtener pilotos:", error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchPilotos();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPilotos = pilotos.filter(piloto =>
        piloto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                await axios.put(`https://fly-airlines-backend-3.onrender.com/api/pilotos/${formData._id}`, formData, { withCredentials: true });
            } else {
                await axios.post('https://fly-airlines-backend-3.onrender.com/api/pilotos', formData, { withCredentials: true });
            }
            fetchPilotos();
            setFormData({ nombre: '', licencia: '', rango: 'Capitán', nacionalidad: '', horasVuelo: '', experiencia: '', estado: 'Activo' });
            setEditing(false);
        } catch (error) {
            console.error("Error al guardar piloto:", error.response ? error.response.data : error.message);
        }
    };

    const handleEdit = (piloto) => {
        setFormData(piloto);
        setEditing(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://fly-airlines-backend-3.onrender.com/api/pilotos/${id}`, { withCredentials: true });
            fetchPilotos();
        } catch (error) {
            console.error("Error al eliminar piloto:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className={styles.pilotosContainer}>
            <h2>Lista de Pilotos</h2>
            <form onSubmit={handleSubmit}>

                <label for="nombre" style={{ color: "rgb(23, 23, 87)" }}>Nombre</label>
                <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />

                <label for="licencia" style={{ color: "rgb(23, 23, 87)" }}>Licencia</label>
                <input type="text" name="licencia" placeholder="Ej. ES-123456" value={formData.licencia} onChange={handleChange} required />

                <label for="rango" style={{ color: "rgb(23, 23, 87)" }}>Rango</label>
                <select name="rango" value={formData.rango} onChange={handleChange}>
                    <option value="Capitán">Capitán</option>
                    <option value="Copiloto">Copiloto</option>
                </select>

                <label for="nacionalidad" style={{ color: "rgb(23, 23, 87)" }}>Nacionalidad</label>
                <input type="text" name="nacionalidad" placeholder="Nacionalidad" value={formData.nacionalidad} onChange={handleChange} required />

                <label for="horas_vuelo" style={{ color: "rgb(23, 23, 87)" }}>Horas de vuelo</label>
                <input type="number" name="horasVuelo" placeholder="Horas de Vuelo (número)" value={formData.horasVuelo} onChange={handleChange} required />

                <label for="experiencia" style={{ color: "rgb(23, 23, 87)" }}>Descripcion de experiencia</label>
                <input type="text" name="experiencia" placeholder="Experiencia" value={formData.experiencia} onChange={handleChange} />

                <label for="estado" style={{ color: "rgb(23, 23, 87)" }}>Estado del piloto</label>
                <select name="estado" value={formData.estado} onChange={handleChange}>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>
                <button type="submit">{editing ? 'Actualizar' : 'Agregar'} Piloto</button>
            </form>

            <input
                type="text"
                placeholder="Buscar piloto..."
                className={styles.searchInput}
                value={searchTerm}
                onChange={handleSearch}
            />

            <h3>Lista de Pilotos</h3>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Licencia</th>
                        <th>Rango</th>
                        <th>Nacionalidad</th>
                        <th>Horas de Vuelo</th>
                        <th>Experiencia</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPilotos.map((piloto) => (
                        <tr key={piloto._id}>
                            <td>{piloto.nombre}</td>
                            <td>{piloto.licencia}</td>
                            <td>{piloto.rango}</td>
                            <td>{piloto.nacionalidad}</td>
                            <td>{piloto.horasVuelo}</td>
                            <td>{piloto.experiencia}</td>
                            <td>{piloto.estado}</td>
                            <td>
                                <button onClick={() => handleEdit(piloto)}>Editar</button>
                                <button onClick={() => handleDelete(piloto._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Pilotos;