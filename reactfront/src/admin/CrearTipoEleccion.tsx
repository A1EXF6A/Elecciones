import React, { useState, FormEvent } from 'react';
import axios from 'axios';

const CrearTipoEleccion = () => {
    const [nombre, setNombre] = useState<string>('');
    const [descripcion, setDescripcion] = useState<string>(''); // Nuevo estado para la descripción
    const [mensaje, setMensaje] = useState<string>('');

    // Maneja el envío del formulario
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Enviar los datos al backend
            const response = await axios.post('http://localhost:8000/api/tipoEleccion', {
                nombre_eleccion: nombre, // nombre del campo que espera el backend
                descripcion,
            });

            console.log(response.status);
            setMensaje('Tipo de elección creado exitosamente');
            setNombre(''); // Reiniciar el campo de nombre
            setDescripcion(''); // Reiniciar el campo de descripción
        } catch (error) {
            console.error('Error al crear el tipo de elección:', error);
            setMensaje('Error al crear el tipo de elección');
        }
    };

    return (
        <div>
            <br />
            <h2>Crear Tipo de Elección</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <br />
                    <label htmlFor="nombre">Nombre del Tipo de Elección:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <br />
                    <label htmlFor="descripcion">Descripción del Tipo de Elección:</label>
                    <textarea
                        id="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        rows={4} // Permite escribir varias líneas
                        required
                    />
                </div>
                <br />
                <button type="submit">Crear</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default CrearTipoEleccion;
