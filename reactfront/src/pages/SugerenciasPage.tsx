import React, { useState } from 'react';
import axios from 'axios';

const SugerenciaForm = () => {
    const [formData, setFormData] = useState({
        textoSugerencia: '',
        correoSugerencia: ''
    });
    const [error, setError] = useState('');
    const [mensajeExito, setMensajeExito] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { textoSugerencia, correoSugerencia } = formData;
        if (!textoSugerencia || !correoSugerencia) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/sugerencias', {
                texto_sug: textoSugerencia,
                correo_usu_suge: correoSugerencia,
            });

            setMensajeExito('Sugerencia enviada correctamente');
            setFormData({ textoSugerencia: '', correoSugerencia: '' });
            setError('');
        } catch (err) {
            setError('Hubo un error al enviar la sugerencia. Inténtalo de nuevo.');
            console.error(err);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Enviar Sugerencia</h2>
            {error && <p style={styles.error}>{error}</p>}
            {mensajeExito && <p style={styles.success}>{mensajeExito}</p>}

            <form style={styles.form} onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="correoSugerencia">Correo del usuario</label>
                    <input
                        style={styles.input}
                        type="email"
                        id="correoSugerencia"
                        name="correoSugerencia"
                        value={formData.correoSugerencia}
                        onChange={handleChange}
                        placeholder="Correo electrónico"
                        required
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="textoSugerencia">Texto de la sugerencia</label>
                    <textarea
                        style={styles.textarea}
                        id="textoSugerencia"
                        name="textoSugerencia"
                        value={formData.textoSugerencia}
                        onChange={handleChange}
                        placeholder="Escribe tu sugerencia..."
                        rows={4}
                        required
                    ></textarea>
                </div>

                <button
                    style={styles.button}
                    type="submit"
                >
                    Enviar Sugerencia
                </button>
            </form>
        </div>
    );
};

export default SugerenciaForm;

const styles = {
    container: {
        maxWidth: '600px',
        margin: '50px auto',
        padding: '30px',
        backgroundColor: '#ffffff',
        borderRadius: '15px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    },
    title: {
        textAlign: 'center' as const,
        fontSize: '28px',
        marginBottom: '30px',
        color: '#333',
        fontWeight: '600',
    },
    error: {
        color: '#e74c3c',
        marginBottom: '15px',
        textAlign: 'center' as const,
        fontSize: '16px',
    },
    success: {
        color: '#2ecc71',
        marginBottom: '15px',
        textAlign: 'center' as const,
        fontSize: '16px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '20px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '10px',
    },
    label: {
        fontSize: '18px',
        fontWeight: '500',
        color: '#333',
    },
    input: {
        padding: '12px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        transition: 'border-color 0.3s',
    },
    textarea: {
        padding: '12px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        transition: 'border-color 0.3s',
    },
    button: {
        padding: '12px 20px',
        fontSize: '18px',
        color: '#ffffff',
        backgroundColor: '#3498db',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.3s',
    },
    buttonHover: {
        backgroundColor: '#2980b9',
        transform: 'scale(1.05)',
    },
};
