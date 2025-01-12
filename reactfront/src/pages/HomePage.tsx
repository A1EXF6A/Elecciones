import { FC, useState, useEffect } from 'react';
import axios from 'axios';

// Define los tipos de datos para cada sección
interface NoticiaFavorita {
    titulo_not: string;
    des_not: string;
}

interface PropuestaFavorita {
    titulo_pro: string;
    des_pro: string;
}

interface EventoProximo {
    nom_eve: string;
    desc_eve: string;
    fec_eve: string; // Fecha en formato string
}

const Home: FC = () => {
    const [noticias, setNoticias] = useState<NoticiaFavorita[]>([]);
    const [propuestas, setPropuestas] = useState<PropuestaFavorita[]>([]);
    const [eventos, setEventos] = useState<EventoProximo[]>([]);

    const [visibleNoticias, setVisibleNoticias] = useState<NoticiaFavorita[]>([]);
    const [visiblePropuestas, setVisiblePropuestas] = useState<PropuestaFavorita[]>([]);
    const [visibleEventos, setVisibleEventos] = useState<EventoProximo[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [limitNoticias, setLimitNoticias] = useState<number>(3);
    const [limitPropuestas, setLimitPropuestas] = useState<number>(3);
    const [limitEventos, setLimitEventos] = useState<number>(3);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [noticiasRes, propuestasRes, eventosRes] = await Promise.all([
                    axios.get<{ data: NoticiaFavorita[] }>('http://localhost:8000/api/home/notfav'),
                    axios.get<{ data: PropuestaFavorita[] }>('http://localhost:8000/api/home/profav'),
                    axios.get<{ data: EventoProximo[] }>('http://localhost:8000/api/home/cer'),
                ]);

                setNoticias(noticiasRes.data.data);
                setPropuestas(propuestasRes.data.data);
                setEventos(eventosRes.data.data);

                setVisibleNoticias(noticiasRes.data.data.slice(0, limitNoticias));
                setVisiblePropuestas(propuestasRes.data.data.slice(0, limitPropuestas));
                setVisibleEventos(eventosRes.data.data.slice(0, limitEventos));

                setError(null);
            } catch (err) {
                setError('Error al cargar los datos.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [limitNoticias, limitPropuestas, limitEventos]);

    const loadMore = (type: string) => {
        if (type === 'noticias') setLimitNoticias(prev => prev + 3);
        if (type === 'propuestas') setLimitPropuestas(prev => prev + 3);
        if (type === 'eventos') setLimitEventos(prev => prev + 3);
    };

    const showLess = (type: string) => {
        if (type === 'noticias') setLimitNoticias(3);
        if (type === 'propuestas') setLimitPropuestas(3);
        if (type === 'eventos') setLimitEventos(3);
    };

    return (
        <div style={styles.container}>
            {loading ? (
                <p style={styles.message}>Cargando datos...</p>
            ) : error ? (
                <p style={styles.message}>{error}</p>
            ) : (
                <div>

                    <section>
                        <h3 style={styles.sectionTitle}>Noticias Favoritas</h3>
                        {noticias.length === 0 ? (
                            <p style={styles.message}>No hay noticias favoritas.</p>
                        ) : (
                            <div>
                                <ul style={styles.list}>
                                    {visibleNoticias.map((noticia, index) => (
                                        <li key={index} style={styles.listItem}>
                                            <h4 style={styles.itemTitle}>{noticia.titulo_not}</h4>
                                            <p style={styles.itemDescription}>{noticia.des_not}</p>
                                        </li>
                                    ))}
                                </ul>
                                <div style={styles.buttonContainer}>
                                    {limitNoticias < noticias.length ? (
                                        <button onClick={() => loadMore('noticias')} style={styles.loadMoreButton}>
                                            Cargar más
                                        </button>
                                    ) : (
                                        <button onClick={() => showLess('noticias')} style={styles.loadMoreButton}>
                                            Mostrar menos
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Propuestas Favoritas */}
                    <section>
                        <h3 style={styles.sectionTitle}>Propuestas Favoritas</h3>
                        {propuestas.length === 0 ? (
                            <p style={styles.message}>No hay propuestas favoritas.</p>
                        ) : (
                            <div>
                                <ul style={styles.list}>
                                    {visiblePropuestas.map((propuesta, index) => (
                                        <li key={index} style={styles.listItem}>
                                            <h4 style={styles.itemTitle}>{propuesta.titulo_pro}</h4>
                                            <p style={styles.itemDescription}>{propuesta.des_pro}</p>
                                        </li>
                                    ))}
                                </ul>
                                <div style={styles.buttonContainer}>
                                    {limitPropuestas < propuestas.length ? (
                                        <button onClick={() => loadMore('propuestas')} style={styles.loadMoreButton}>
                                            Cargar más
                                        </button>
                                    ) : (
                                        <button onClick={() => showLess('propuestas')} style={styles.loadMoreButton}>
                                            Mostrar menos
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Eventos Próximos */}
                    <section>
                        <h3 style={styles.sectionTitle}>Eventos Próximos</h3>
                        {eventos.length === 0 ? (
                            <p style={styles.message}>No hay eventos próximos.</p>
                        ) : (
                            <div>
                                <ul style={styles.list}>
                                    {visibleEventos.map((evento, index) => (
                                        <li key={index} style={styles.listItem}>
                                            <h4 style={styles.itemTitle}>{evento.nom_eve}</h4>
                                            <p style={styles.itemDescription}>{evento.desc_eve}</p>
                                            <p style={styles.itemDate}>Fecha: {evento.fec_eve}</p>
                                        </li>
                                    ))}
                                </ul>
                                <div style={styles.buttonContainer}>
                                    {limitEventos < eventos.length ? (
                                        <button onClick={() => loadMore('eventos')} style={styles.loadMoreButton}>
                                            Cargar más
                                        </button>
                                    ) : (
                                        <button onClick={() => showLess('eventos')} style={styles.loadMoreButton}>
                                            Mostrar menos
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            )}
        </div>
    );
};

export { Home };

// Estilos en línea
const styles = {
    // Variables de estilo reutilizables
    variables: {
        primaryColor: '#007BFF',
        secondaryColor: '#555',
        borderColor: '#ccc',
        fontFamily: 'Arial, sans-serif',
        borderRadius: '5px',
        containerPadding: '20px',
        maxWidth: '1000px',
    },

    container: {
        padding: '20px',
        maxWidth: '100%',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        minHeight: '100vh', // Asegura que ocupe al menos toda la altura de la pantalla
    },

    title: {
        fontSize: '28px',
        marginBottom: '20px',
        textAlign: 'center' as const,
        color: '#333',
        fontWeight: 'bold',
    },

    sectionTitle: {
        fontSize: '22px',
        marginBottom: '15px',
        color: '#444',
        fontWeight: '600',
        borderBottom: '2px solid #ddd', // Línea decorativa debajo del título
        paddingBottom: '5px',
    },

    message: {
        fontSize: '18px',
        textAlign: 'center' as const,
        color: '#666',
    },

    list: {
        listStyleType: 'none' as const,
        padding: 0,
        display: 'flex',
        flexWrap: 'wrap' as const,
        gap: '20px',
        justifyContent: 'center' as const,
    },

    listItem: {
        border: `1px solid #ccc`,
        padding: '15px',
        width: '280px',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center' as const,
        backgroundColor: '#fff', // Fondo blanco
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',

        // Efecto hover para interactividad
        ':hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
        },
    },

    itemTitle: {
        fontSize: '18px',
        margin: '0 0 10px 0',
        textAlign: 'center' as const,
        color: '#333',
        fontWeight: 'bold',
    },

    itemDescription: {
        fontSize: '16px',
        color: '#555',
        textAlign: 'center' as const,
        lineHeight: '1.5',
    },

    itemDate: {
        fontSize: '14px',
        color: '#777',
        textAlign: 'center' as const,
        marginTop: '5px',
        fontStyle: 'italic',
    },

    buttonContainer: {
        display: 'flex',
        justifyContent: 'center' as const,
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
        fontWeight: 'bold',
        transition: 'background-color 0.3s, transform 0.2s',

        // Efecto hover para el botón
        ':hover': {
            backgroundColor: '#0056b3',
            transform: 'scale(1.05)',
        },

        // Efecto de enfoque
        ':focus': {
            outline: '2px solid #0056b3',
        },
    },
};
