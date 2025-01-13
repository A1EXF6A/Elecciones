import React, { useState, FormEvent } from 'react';
import axios from 'axios';

const CrearNoticia: React.FC = () => {
    const [titulo, setTitulo] = useState<string>('');
    const [descripcion, setDescripcion] = useState<string>('');
    const [mensaje, setMensaje] = useState<string>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            // El valor de 'favorita' será siempre 0, ya que no permite modificarlo
            const response = await axios.post('http://localhost:8000/api/noticias/crear', {
                titulo_not: titulo,
                des_not: descripcion,
                favorita: 0, // Siempre 0 (no favorita)
            });

            setMensaje('¡Noticia creada exitosamente!');
            setTitulo('');
            setDescripcion('');
        } catch (error) {
            console.error('Error al crear la noticia:', error);
            setMensaje('Hubo un error al crear la noticia.');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Crear Noticia</h2>
            {mensaje && <p style={styles.mensaje}>{mensaje}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Título:</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Descripción:</label>
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                        style={styles.textarea}
                    ></textarea>
                </div>
                <button type="submit" style={styles.button}>
                    Crear Noticia
                </button>
            </form>
        </div>
    );
};

export default CrearNoticia;

const styles = {
    container: {
        maxWidth: '600px',
        margin: '50px auto',
        padding: '20px',
        backgroundColor: '#f4f4f4',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        textAlign: 'center' as const,
        fontSize: '24px',
        color: '#333',
        marginBottom: '20px',
    },
    mensaje: {
        color: 'green',
        textAlign: 'center' as const,
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '15px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column' as const,
        marginBottom: '15px',
    },
    label: {
        fontSize: '16px',
        color: '#555',
        marginBottom: '5px',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    textarea: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        resize: 'vertical' as const,
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007BFF',
        color: '#fff',
    },
};
