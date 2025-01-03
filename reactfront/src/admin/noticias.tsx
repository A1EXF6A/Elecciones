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
    const noticiasPerPage = 5; // Número de noticias por página

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
        <div className="container">
            <h1>Lista de Noticias</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Buscar por título..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '16px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                    }}
                />
            </div>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {currentNoticias.map((noticia) => (
                    <li
                        key={noticia.id_not}
                        style={{
                            marginBottom: '20px',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            backgroundColor: '#f9f9f9',
                        }}
                    >
                        <h2>{noticia.titulo_not}</h2>
                        <p>{noticia.des_not}</p>
                        <p>
                            <strong>Favorita:</strong> {noticia.favorita ? 'Sí' : 'No'}
                        </p>
                        <button
                            style={{
                                backgroundColor: noticia.favorita ? '#e74c3c' : '#2ecc71',
                                color: '#fff',
                                border: 'none',
                                padding: '10px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                            onClick={() => toggleFavorita(noticia.id_not, noticia.favorita)}
                        >
                            {noticia.favorita ? 'Quitar de Favoritas' : 'Marcar como Favorita'}
                        </button>
                    </li>
                ))}
            </ul>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {Array.from({ length: Math.ceil(filteredNoticias.length / noticiasPerPage) }).map(
                    (_, index) => (
                        <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            style={{
                                padding: '10px',
                                margin: '0 5px',
                                backgroundColor: currentPage === index + 1 ? '#3498db' : '#ccc',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            {index + 1}
                        </button>
                    )
                )}
            </div>
        </div>
    );
};

export default NoticiasList;
