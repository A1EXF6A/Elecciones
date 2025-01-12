import { FC, useState, useEffect } from 'react';
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
    const [visibleNoticias, setVisibleNoticias] = useState<NoticiaFavorita[]>([]); // Noticias visibles
    const [limit, setLimit] = useState<number>(3); // Límite inicial a 3 noticias

    // Fetch de noticias favoritas
    useEffect(() => {
        const fetchNoticiasFavoritas = async () => {
            try {
                const res = await axios.get<{ message: string; data: NoticiaFavorita[] }>(
                    'http://localhost:8000/api/home/fav'
                );
                setNoticias(res.data.data);
                setVisibleNoticias(res.data.data.slice(0, limit)); // Mostrar las primeras 3 noticias
                setError(null);
            } catch (err) {
                setError('Error al cargar las noticias favoritas.');
            } finally {
                setLoading(false);
            }
        };

        fetchNoticiasFavoritas();
    }, [limit]); // El efecto se vuelve a ejecutar cuando cambia el límite

    // Función para cargar más noticias
    const loadMoreNoticias = () => {
        setLimit(prevLimit => prevLimit + 3); // Incrementa el límite en 3
    };

    // Función para mostrar menos noticias
    const showLessNoticias = () => {
        setLimit(3); // Vuelve a mostrar solo las primeras 3 noticias
    };

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
                <div>
                    <ul style={styles.list}>
                        {visibleNoticias.map((noticia, index) => (
                            <li key={index} style={styles.listItem}>
                                <h3 style={styles.noticiaTitle}>{noticia.titulo_not}</h3>
                                <p style={styles.noticiaDescription}>{noticia.des_not}</p>
                            </li>
                        ))}
                    </ul>

                    {/* Botón Cargar más o Mostrar menos */}
                    <div style={styles.buttonContainer}>
                        {limit < noticias.length ? (
                            <button onClick={loadMoreNoticias} style={styles.loadMoreButton}>
                                Cargar más
                            </button>
                        ) : (
                            <button onClick={showLessNoticias} style={styles.loadMoreButton}>
                                Mostrar menos
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export { Home };

// Estilos en línea
const styles = {
    container: {
        padding: '20px',
        maxWidth: '1000px',
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
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px', // Espaciado entre las noticias
        justifyContent: 'center', // Centra las noticias horizontalmente
    },
    listItem: {
        border: '1px solid #ccc',
        padding: '10px',
        width: '300px', // Ajuste de tamaño de las noticias
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    noticiaTitle: {
        fontSize: '20px',
        margin: '0 0 10px 0',
        textAlign: 'center' as 'center',
    },
    noticiaDescription: {
        fontSize: '16px',
        color: '#555',
        textAlign: 'center' as 'center',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    },
    loadMoreButton: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};
