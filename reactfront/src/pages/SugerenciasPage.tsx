import React, { useState } from 'react';
import axios from 'axios';

const SugerenciaForm = () => {
    const [formData, setFormData] = useState({
        textoSugerencia: '',
        correoSugerencia: ''
    });
    const [error, setError] = useState('');
    const [mensajeExito, setMensajeExito] = useState('');

    // Manejar el cambio en los campos del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Enviar la sugerencia al servidor
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validar los campos
        const { textoSugerencia, correoSugerencia } = formData;
        if (!textoSugerencia || !correoSugerencia) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        try {
            // Enviar la sugerencia a la API
            const response = await axios.post('http://localhost:8000/api/sugerencias', {
                texto_sug: textoSugerencia,
                correo_usu_suge: correoSugerencia,
            });

            // Si la respuesta es exitosa, mostramos el mensaje de éxito
            setMensajeExito('Sugerencia enviada correctamente');
            setFormData({ textoSugerencia: '', correoSugerencia: '' });
            setError('');
        } catch (err) {
            // Si hay algún error, mostramos el mensaje de error
            setError('Hubo un error al enviar la sugerencia. Inténtalo de nuevo.');
            console.error(err);
        }
    };

    return (
        <div className="form-container">
            <h2>Enviar Sugerencia</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {mensajeExito && <p style={{ color: 'green' }}>{mensajeExito}</p>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="correoSugerencia">Correo del usuario</label>
                    <input
                        type="email"
                        id="correoSugerencia"
                        name="correoSugerencia"
                        value={formData.correoSugerencia}
                        onChange={handleChange}
                        placeholder="Correo electrónico"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="textoSugerencia">Texto de la sugerencia</label>
                    <textarea
                        id="textoSugerencia"
                        name="textoSugerencia"
                        value={formData.textoSugerencia}
                        onChange={handleChange}
                        placeholder="Escribe tu sugerencia..."
                        rows={4}
                        required
                    ></textarea>
                </div>

                <button type="submit">Enviar Sugerencia</button>
            </form>
        </div>
    );
};

export default SugerenciaForm;
