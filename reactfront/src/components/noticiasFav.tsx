import { FC, useState, useEffect } from 'react';
import axios from 'axios';

// Definir el tipo de noticia favorita
interface NoticiaFavorita {
    titulo_not: string;
    des_not: string;
}

const NewsFav: FC = () => {
    const [noticias, setNoticias] = useState<NoticiaFavorita[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedNoticia, setSelectedNoticia] = useState<NoticiaFavorita | null>(null);  // Noticia seleccionada
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);  // Controla el estado del modal

    // Función para obtener las noticias favoritas
    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                const response = await axios.get<{ data: NoticiaFavorita[] }>('http://localhost:8000/api/home/fav');
                setNoticias(response.data.data);
                setError(null);
            } catch (err) {
                setError('Error al cargar las noticias favoritas');
            } finally {
                setLoading(false);
            }
        };

        fetchNoticias();
    }, []);

    // Función para abrir el modal y mostrar la noticia seleccionada
    const openModal = (noticia: NoticiaFavorita) => {
        setSelectedNoticia(noticia);
        setIsModalOpen(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedNoticia(null);  // Limpiar la noticia seleccionada
    };

    // Renderizado
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
                        <li key={index} style={styles.listItem} onClick={() => openModal(noticia)}>
                            <h3 style={styles.noticiaTitle}>{noticia.titulo_not}</h3>
                        </li>
                    ))}
                </ul>
            )}

            {/* Modal */}
            {isModalOpen && selectedNoticia && (
                <div style={styles.modalBackdrop}>
                    <div style={styles.modalContent}>
                        <h3 style={styles.modalTitle}>{selectedNoticia.titulo_not}</h3>
                        <p style={styles.modalDescription}>{selectedNoticia.des_not}</p>
                        <button onClick={closeModal} style={styles.closeButton}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export { NewsFav };

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
        cursor: 'pointer',
    },
    noticiaTitle: {
        fontSize: '20px',
        margin: '0 0 10px 0',
    },
    // Estilos del modal
    modalBackdrop: {
        position: 'fixed' as 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        maxWidth: '500px',
        width: '100%',
    },
    modalTitle: {
        fontSize: '22px',
        marginBottom: '10px',
    },
    modalDescription: {
        fontSize: '18px',
        marginBottom: '20px',
    },
    closeButton: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};
