import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './client.module.css';

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [formData, setFormData] = useState({
        nombreCompleto: '',
        email: '',
        telefono: '',
        fechaNacimiento: '',
        numeroPasaporte: '',
        nacionalidad: '',
        estado: 'Activo',
    });
    const [editing, setEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchClients = async () => {
        try {
            const response = await axios.get('https://fly-airlines-backend-3.onrender.com/api/usuarios', { withCredentials: true });
            setClients(response.data);
        } catch (error) {
            console.error("Error al obtener clientes:", error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredClients = clients.filter(client =>
        client.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                await axios.put(`https://fly-airlines-backend-3.onrender.com/api/usuarios/${formData._id}`, formData, { withCredentials: true });
            } else {
                await axios.post('https://fly-airlines-backend-3.onrender.com/api/usuarios', formData, { withCredentials: true });
            }
            fetchClients();
            setFormData({
                nombreCompleto: '',
                email: '',
                telefono: '',
                fechaNacimiento: '',
                numeroPasaporte: '',
                nacionalidad: '',
                estado: 'Activo',
            });
            setEditing(false);
        } catch (error) {
            console.error("Error al guardar cliente:", error.response ? error.response.data : error.message);
        }
    };

    const handleEdit = (client) => {
        setFormData(client);
        setEditing(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://fly-airlines-backend-3.onrender.com/api/usuarios/${id}`, { withCredentials: true });
            fetchClients();
        } catch (error) {
            console.error("Error al eliminar cliente:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className={styles.clientsContainer}>
            <h2>Lista de Clientes</h2>
            <form onSubmit={handleSubmit}>
                <label for="nombreCompleto" style={{color:"rgb(23, 23, 87)"}}>Nombre Completo</label>
                <input type="text" id="nombreCompleto" name="nombreCompleto" placeholder="Nombre Completo" value={formData.nombreCompleto} onChange={handleChange} required />

                <label for="email" style={{color:"rgb(23, 23, 87)"}}>Correo Electrónico</label>
                <input type="email" id="email" name="email" placeholder="Correo Electrónico" value={formData.email} onChange={handleChange} required />

                <label for="telefono" style={{color:"rgb(23, 23, 87)"}}>Teléfono</label>
                <input type="text" id="telefono" name="telefono" placeholder="Ej. 991238765" value={formData.telefono} onChange={handleChange} />

                <label for="fechaNacimiento" style={{color:"rgb(23, 23, 87)"}}>Fecha de Nacimiento</label>
                <input type="date" id="fechaNacimiento" name="fechaNacimiento" placeholder="Fecha de Nacimiento" value={formData.fechaNacimiento} onChange={handleChange} required />

                <label for="numeroPasaporte" style={{color:"rgb(23, 23, 87)"}}>Número de Pasaporte</label>
                <input type="text" id="numeroPasaporte" name="numeroPasaporte" placeholder="Ej. 12345678" value={formData.numeroPasaporte} onChange={handleChange} required />

                <label for="nacionalidad" style={{color:"rgb(23, 23, 87)"}}>Nacionalidad</label>
                <input type="text" id="nacionalidad" name="nacionalidad" placeholder="Nacionalidad" value={formData.nacionalidad} onChange={handleChange} required />

                <label for="estado" style={{color:"rgb(23, 23, 87)"}}>Estado</label>
                <select id="estado" name="estado" value={formData.estado} onChange={handleChange}>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>

                <button type="submit">{editing ? 'Actualizar' : 'Agregar'} Cliente</button>
            </form>

            <input
                type="text"
                placeholder="Buscar cliente..."
                className={styles.searchInput}
                value={searchTerm}
                onChange={handleSearch}
            />

            <table>
                <thead>
                    <tr>
                        <th>Nombre Completo</th>
                        <th>Correo Electrónico</th>
                        <th>Teléfono</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Número de Pasaporte</th>
                        <th>Nacionalidad</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredClients.map((client) => (
                        <tr key={client._id}>
                            <td>{client.nombreCompleto}</td>
                            <td>{client.email}</td>
                            <td>{client.telefono}</td>
                            <td>{new Date(client.fechaNacimiento).toLocaleDateString()}</td>
                            <td>{client.numeroPasaporte}</td>
                            <td>{client.nacionalidad}</td>
                            <td>{client.estado}</td>
                            <td>
                                <button onClick={() => handleEdit(client)}>Editar</button>
                                <button onClick={() => handleDelete(client._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Clients;
