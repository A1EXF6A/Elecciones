import { useEffect, useState } from 'react';
import axios from 'axios';

// Define el tipo de noticia
interface Noticia {
    id_not: number;
    titulo_not: string;
    des_not: string;
}

const Noticias = () => {
    const [noticias, setNoticias] = useState<Noticia[]>([]);
    const [error, setError] = useState('');
    const [pagina, setPagina] = useState(0);
    const [busqueda, setBusqueda] = useState(''); // Estado para la búsqueda por título
    const [filtroDescripcion, setFiltroDescripcion] = useState(''); // Estado para el filtro por descripción
    const noticiasPorPagina = 4;

    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                const response = await axios.get<Noticia[]>('http://localhost:8000/api/noticias/ver');
                setNoticias(response.data);
            } catch (err) {
                console.error('Error al obtener las noticias:', err);
                setError('No se pudieron cargar las noticias. Inténtalo de nuevo más tarde.');
            }
        };

        fetchNoticias();
    }, []);

    // Función para filtrar las noticias según los criterios
    const noticiasFiltradas = noticias.filter((noticia) => {
        const coincideTitulo = noticia.titulo_not.toLowerCase().includes(busqueda.toLowerCase());
        const coincideDescripcion = filtroDescripcion
            ? noticia.des_not.toLowerCase().includes(filtroDescripcion.toLowerCase())
            : true;
        return coincideTitulo && coincideDescripcion;
    });

    const noticiasAMostrar = noticiasFiltradas.slice(
        pagina * noticiasPorPagina,
        (pagina + 1) * noticiasPorPagina
    );

    const cambiarPagina = (direccion: 'anterior' | 'siguiente') => {
        if (direccion === 'anterior' && pagina > 0) {
            setPagina(pagina - 1);
        } else if (direccion === 'siguiente' && (pagina + 1) * noticiasPorPagina < noticiasFiltradas.length) {
            setPagina(pagina + 1);
        }
    };

    const borrarFiltros = () => {
        setBusqueda('');
        setFiltroDescripcion('');
        setPagina(0);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Noticias</h2>
            {error && <p style={styles.error}>{error}</p>}
            <div style={styles.filters}>
                <input
                    type="text"
                    placeholder="Buscar por título..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    style={styles.filterInput}
                />
                <input
                    type="text"
                    placeholder="Filtrar por descripción..."
                    value={filtroDescripcion}
                    onChange={(e) => setFiltroDescripcion(e.target.value)}
                    style={styles.filterInput}
                />
                <button onClick={borrarFiltros} style={styles.clearButton}>
                    Borrar filtros
                </button>
            </div>
            <div style={styles.grid}>
                {noticiasAMostrar.map((noticia) => (
                    <div key={noticia.id_not} style={styles.noticiaCard}>
                        <h3 style={styles.noticiaTitle}>{noticia.titulo_not}</h3>
                        <p style={styles.noticiaDescription}>{noticia.des_not}</p>
                    </div>
                ))}
            </div>
            <div style={styles.pagination}>
                <button
                    style={styles.paginationButton}
                    onClick={() => cambiarPagina('anterior')}
                    disabled={pagina === 0}
                >
                    Anterior
                </button>
                <span style={styles.pageNumber}>
                    Página {pagina + 1} de {Math.ceil(noticiasFiltradas.length / noticiasPorPagina)}
                </span>
                <button
                    style={styles.paginationButton}
                    onClick={() => cambiarPagina('siguiente')}
                    disabled={(pagina + 1) * noticiasPorPagina >= noticiasFiltradas.length}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default Noticias;

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
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
    },
    noticiaCard: {
        backgroundColor: '#f9fafb',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'pointer',
    },
    noticiaTitle: {
        fontSize: '22px',
        color: '#34495e',
        fontWeight: '500',
        marginBottom: '10px',
    },
    noticiaDescription: {
        fontSize: '16px',
        color: '#7f8c8d',
        marginBottom: '10px',
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
    pageNumber: {
        fontSize: '18px',
        color: '#34495e',
        fontWeight: '400',
    },
    filters: {
        display: 'flex',
        marginBottom: '20px',
        gap: '10px',
    },
    filterInput: {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        width: '200px',
    },
    clearButton: {
        padding: '10px 15px',
        backgroundColor: '#2980b9',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: '500',
        transition: 'background-color 0.3s',
    },
    clearButtonHover: {
        backgroundColor: '#2980b9',
    },
};
