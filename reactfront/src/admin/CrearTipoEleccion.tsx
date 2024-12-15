import React, { useState, FormEvent } from 'react';
import axios from 'axios';

const CrearTipoEleccion = () => {
    const [nombre, setNombre] = useState<string>('');
    const [mensaje, setMensaje] = useState<string>('');

    // Maneja el envío del formulario
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Enviar los datos al backend
            const response = await axios.post('http://localhost:3306/api/tipoEleccion', { nombre });
            console.log(response.status);
            setMensaje('Tipo de elección creado exitosamente');
            setNombre(''); // Reiniciar el formulario
        } catch (error) {
            console.error('Error al crear el tipo de elección:', error);
            setMensaje('Error al crear el tipo de elección');
        }
    };

    return (
        <div>
            <br></br>
            <h2>Crear Tipo de Elección</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <br></br>
                    <label htmlFor="nombre">Nombre del Tipo de Elección:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Crear</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default CrearTipoEleccion;
