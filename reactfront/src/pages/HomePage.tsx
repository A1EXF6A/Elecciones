import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';

// Define el tipo de datos para las noticias favoritas
interface NoticiaFavorita {
    titulo_not: string;
    des_not: string;
}

const Home: FC = () => {
    const [noticias, setNoticias] = useState<NoticiaFavorita[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch de noticias favoritas
    useEffect(() => {
        const fetchNoticiasFavoritas = async () => {
            try {
                const res = await axios.get<{ message: string; data: NoticiaFavorita[] }>(
                    'http://localhost:8000/api/home/fav'
                );
                setNoticias(res.data.data);
                setError(null);
            } catch (err) {
                setError('Error al cargar las noticias favoritas.');
            } finally {
                setLoading(false);
            }
        };

        fetchNoticiasFavoritas();
    }, []);

    // Renderización
    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Noticias Favoritas</h2>
            {loading ? (
                <p style={styles.message}>Cargando noticias...</p>
            ) : error ? (
                <p style={styles.message}>{error}</p>
            ) : noticias.length === 0 ? (
                <p style={styles.message}>No hay noticias favoritas.</p>
            ) : (
                <ul style={styles.list}>
                    {noticias.map((noticia, index) => (
                        <li key={index} style={styles.listItem}>
                            <h3 style={styles.noticiaTitle}>{noticia.titulo_not}</h3>
                            <p style={styles.noticiaDescription}>{noticia.des_not}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export { Home };

// Estilos en línea
const styles = {
    container: {
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
        textAlign: 'center' as 'center',
    },
    message: {
        fontSize: '18px',
        textAlign: 'center' as 'center',
    },
    list: {
        listStyleType: 'none' as 'none',
        padding: 0,
    },
    listItem: {
        borderBottom: '1px solid #ccc',
        padding: '10px 0',
    },
    noticiaTitle: {
        fontSize: '20px',
        margin: '0 0 10px 0',
    },
    noticiaDescription: {
        fontSize: '16px',
        color: '#555',
    },
};
