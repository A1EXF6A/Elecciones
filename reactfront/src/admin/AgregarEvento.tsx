import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import './AgregarEvento.css'; // Opcional: Estilos del componente

const AgregarEvento: React.FC = () => {
    // Estados para manejar los datos del formulario
    const [nombre, setNombre] = useState<string>('');
    const [descripcion, setDescripcion] = useState<string>('');
    const [fecha, setFecha] = useState<string>('');
    const [mensaje, setMensaje] = useState<string>('');

    // Función para obtener la fecha actual en formato YYYY-MM-DD
    const obtenerFechaActual = () => {
        const hoy = new Date();
        const anio = hoy.getFullYear();
        const mes = String(hoy.getMonth() + 1).padStart(2, '0');
        const dia = String(hoy.getDate()).padStart(2, '0');
        return `${anio}-${mes}-${dia}`;
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Validar que la fecha no sea anterior a la fecha actual
        const fechaActual = obtenerFechaActual();
        if (fecha < fechaActual) {
            setMensaje('La fecha del evento no puede ser anterior a la fecha actual.');
            return;
        }

        try {
            // Enviar datos al backend
            await axios.post('http://localhost:8000/api/eventos', {
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
                        min={obtenerFechaActual()} // Establece el valor mínimo en el campo de fecha
                        required
                    />
                </div>

                <button type="submit">Agregar Evento</button>
            </form>
        </div>
    );
};

export default AgregarEvento;
