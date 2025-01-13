import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Noticia {
    id_not: number;
    titulo_not: string;
    des_not: string;
    favorita: number;
}

const NoticiasList: React.FC = () => {
    const [noticias, setNoticias] = useState<Noticia[]>([]);
    const [filteredNoticias, setFilteredNoticias] = useState<Noticia[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const noticiasPerPage = 4;

    // Obtener todas las noticias
    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/noticias');
                setNoticias(response.data);
                setFilteredNoticias(response.data); // Inicialmente mostrar todas las noticias
            } catch (err) {
                console.error('Error al obtener las noticias:', err);
                setError('Error al obtener las noticias.');
            }
        };

        fetchNoticias();
    }, []);

    // Filtrar noticias por título
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredNoticias(noticias); // Mostrar todas si el campo de búsqueda está vacío
        } else {
            const filtered = noticias.filter((noticia) =>
                noticia.titulo_not.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredNoticias(filtered);
        }
        setCurrentPage(1); // Reiniciar a la primera página cuando cambia el filtro
    }, [searchTerm, noticias]);

    // Cambiar el estado de favorita
    const toggleFavorita = async (id_not: number, favorita: number) => {
        try {
            const updatedFavorita = favorita === 1 ? 0 : 1;
            await axios.patch(`http://localhost:8000/api/noticias/${id_not}`, {
                favorita: updatedFavorita,
            });

            // Actualizar el estado local
            setNoticias((prevNoticias) =>
                prevNoticias.map((noticia) =>
                    noticia.id_not === id_not ? { ...noticia, favorita: updatedFavorita } : noticia
                )
            );
        } catch (err) {
            console.error('Error al actualizar el estado de favorita:', err);
            setError('Error al cambiar el estado de favorita.');
        }
    };

    // Calcular las noticias a mostrar por página
    const indexOfLastNoticia = currentPage * noticiasPerPage;
    const indexOfFirstNoticia = indexOfLastNoticia - noticiasPerPage;
    const currentNoticias = filteredNoticias.slice(indexOfFirstNoticia, indexOfLastNoticia);

    // Cambiar de página
    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Noticias</h2>

            {error && <p style={styles.error}>{error}</p>}

            <div style={styles.filters}>
                <input
                    type="text"
                    placeholder="Buscar por título"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.filterInput}
                />
            </div>

            <div style={styles.grid}>
                {currentNoticias.length === 0 ? (
                    <p>No se encontraron noticias.</p>
                ) : (
                    currentNoticias.map((noticia) => (
                        <div key={noticia.id_not} style={styles.newsItem}>
                            <h3 style={styles.newsTitle}>{noticia.titulo_not}</h3>
                            <p style={styles.newsDescription}>{noticia.des_not}</p>
                            <p style={styles.newsFavorite}>
                                <strong>Favorita:</strong> {noticia.favorita ? 'Sí' : 'No'}
                            </p>
                            <button
                                style={noticia.favorita ? styles.removeFavoriteButton : styles.addFavoriteButton}
                                onClick={() => toggleFavorita(noticia.id_not, noticia.favorita)}
                            >
                                {noticia.favorita ? 'Quitar de Favoritas' : 'Marcar como Favorita'}
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div style={styles.pagination}>
                {Array.from({ length: Math.ceil(filteredNoticias.length / noticiasPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        style={styles.paginationButton}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default NoticiasList;

const styles = {
    container: {
        padding: '20px',
        maxWidth: '100%',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        minHeight: '100vh',
    },
    title: {
        textAlign: 'center' as const,
        fontSize: '28px',
        color: '#2c3e50',
        marginBottom: '30px',
        fontWeight: '600',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)', // 2 columnas
        gap: '20px', // Espacio entre columnas y filas
        padding: '0',
        margin: '0',
    },
    newsItem: {
        backgroundColor: '#f9fafb',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'pointer',
    },
    newsTitle: {
        fontSize: '22px',
        color: '#34495e',
        fontWeight: '500',
        marginBottom: '10px',
    },
    newsDescription: {
        fontSize: '16px',
        color: '#7f8c8d',
        marginBottom: '10px',
    },
    newsFavorite: {
        fontSize: '14px',
        color: '#16a085',
        fontStyle: 'italic',
    },
    error: {
        color: '#e74c3c',
        textAlign: 'center' as const,
        marginBottom: '30px',
        fontSize: '18px',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30px',
    },
    paginationButton: {
        backgroundColor: '#2980b9',
        color: '#ffffff',
        border: 'none',
        padding: '12px 25px',
        margin: '0 10px',
        cursor: 'pointer',
        borderRadius: '30px',
        fontSize: '16px',
        fontWeight: '500',
        transition: 'background-color 0.3s, transform 0.3s',
    },
    addFavoriteButton: {
        backgroundColor: '#2ecc71',
        color: '#fff',
        border: 'none',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    removeFavoriteButton: {
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    filters: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '20px',
    },
    filterInput: {
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '14px',
    },
};
