import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import './AgregarEvento.css'; // Opcional: Estilos del componente

const AgregarEvento: React.FC = () => {
    // Estados para manejar los datos del formulario
    const [nombre, setNombre] = useState<string>('');
    const [descripcion, setDescripcion] = useState<string>('');
    const [fecha, setFecha] = useState<string>('');
    const [mensaje, setMensaje] = useState<string>('');

    // Manejar el envío del formulario
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            // Enviar datos al backend
            const response = await axios.post('http://localhost:8000/api/eventos', {
                nom_eve: nombre,
                desc_eve: descripcion,
                fec_eve: fecha,
            });

            // Mostrar mensaje de éxito
            setMensaje('¡Evento agregado exitosamente!');
            // Limpiar formulario
            setNombre('');
            setDescripcion('');
            setFecha('');
        } catch (error) {
            console.error('Error al agregar el evento:', error);
            setMensaje('Hubo un error al agregar el evento.');
        }
    };

    return (
        <div className="agregar-evento-container">
            <h2>Agregar Evento</h2>
            {mensaje && <p className="mensaje">{mensaje}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre del Evento:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Descripción:</label>
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label>Fecha:</label>
                    <input
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Agregar Evento</button>
            </form>
        </div>
    );
};

export default AgregarEvento;
