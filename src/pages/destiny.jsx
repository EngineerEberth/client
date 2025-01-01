import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './destiny.module.css';

const Destinos = () => {
    const [destinos, setDestinos] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        codigoIATA: '',
        pais: '',
        continente: '',
        descripcion: '',
        estado: 'Activo',
    });
    const [editing, setEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Función para obtener destinos
    const fetchDestinos = async () => {
        try {
            const response = await axios.get('https://fly-airlines-backend-3.onrender.com/api/destinos', {
                withCredentials: true,
            });
            setDestinos(response.data);
        } catch (error) {
            console.error("Error al obtener destinos:", error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchDestinos();
    }, []);

    // Función para manejar la búsqueda
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filtrar destinos según el término de búsqueda
    const filteredDestinos = destinos.filter(destino =>
        destino.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                // Actualizar destino
                await axios.put(`https://fly-airlines-backend-3.onrender.com/api/destinos/${formData._id}`, formData, {
                    withCredentials: true,
                });
            } else {
                // Agregar nuevo destino
                await axios.post('https://fly-airlines-backend-3.onrender.com/api/destinos', formData, {
                    withCredentials: true,
                });
            }
            fetchDestinos(); // Actualiza la lista de destinos
            setFormData({ nombre: '', codigoIATA: '', pais: '', continente: '', descripcion: '', estado: 'Activo' }); // Resetea el formulario
            setEditing(false); // Resetea el modo de edición
        } catch (error) {
            console.error("Error al guardar destino:", error.response ? error.response.data : error.message);
        }
    };

    // Manejar la edición de un destino
    const handleEdit = (destino) => {
        setFormData(destino);
        setEditing(true);
    };

    // Manejar la eliminación de un destino
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://fly-airlines-backend-3.onrender.com/api/destinos/${id}`, {
                withCredentials: true,
            });
            fetchDestinos(); // Actualiza la lista después de eliminar
        } catch (error) {
            console.error("Error al eliminar destino:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className={styles.destinosContainer}>
            <h2>Destinos Disponibles</h2>
            <form onSubmit={handleSubmit}>
                <label for="nombre" style={{color:"rgb(23, 23, 87)"}}>Nombre</label>
                <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
                
                <label for="CodigoIATA" style={{color:"rgb(23, 23, 87)"}}>Codigo IATA</label>
                <input type="text" name="codigoIATA" placeholder="Ej. MAD (MADRID)" value={formData.codigoIATA} onChange={handleChange} required />
                
                <label for="Pais" style={{color:"rgb(23, 23, 87)"}}>Pais</label>
                <input type="text" name="pais" placeholder="País" value={formData.pais} onChange={handleChange} required />
                
                <label for="Continente" style={{color:"rgb(23, 23, 87)"}}>Continente</label>
                <input type="text" name="continente" placeholder="Continente" value={formData.continente} onChange={handleChange} required />
                
                <label for="Descripcion" style={{color:"rgb(23, 23, 87)"}}>Descripcion</label>
                <textarea name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} />
                
                <label for="Estado" style={{color:"rgb(23, 23, 87)"}}>Estado</label>
                <select name="estado" value={formData.estado} onChange={handleChange}>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>
                <button type="submit">{editing ? 'Actualizar' : 'Agregar'} Destino</button>
            </form>

            <input
                type="text"
                placeholder="Buscar destino..."
                className={styles.searchInput}
                value={searchTerm}
                onChange={handleSearch}
            />

            <h3>Lista de Destinos</h3>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Código IATA</th>
                        <th>País</th>
                        <th>Continente</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDestinos.map((destino) => (
                        <tr key={destino._id}>
                            <td>{destino.nombre}</td>
                            <td>{destino.codigoIATA}</td>
                            <td>{destino.pais}</td>
                            <td>{destino.continente}</td>
                            <td>{destino.estado}</td>
                            <td>
                                <button onClick={() => handleEdit(destino)}>Editar</button>
                                <button onClick={() => handleDelete(destino._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Destinos;
