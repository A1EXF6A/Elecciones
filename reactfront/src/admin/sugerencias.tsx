import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Sugerencia {
    id_sug: number;
    texto_sug: string;
    correo_usu_suge: string;
    visible: number;
    fec_sug: string;
}

const Sugerencias: React.FC = () => {
    const [sugerencias, setSugerencias] = useState<Sugerencia[]>([]);
    const [filteredSugerencias, setFilteredSugerencias] = useState<Sugerencia[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const itemsPerPage = 5;

    // Obtener sugerencias visibles
    useEffect(() => {
        const fetchSugerencias = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/sugerencias');
                const visibles = response.data.filter((sugerencia: Sugerencia) => sugerencia.visible === 1); // Filtrar por visibilidad
                setSugerencias(visibles);
                setFilteredSugerencias(visibles); // Inicialmente mostrar todas las visibles
            } catch (err) {
                console.error('Error al obtener las sugerencias:', err);
                setError('Error al obtener las sugerencias.');
            }
        };

        fetchSugerencias();
    }, []);

    // Manejar cambio en el término de búsqueda
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredSugerencias(sugerencias); // Mostrar todas si el campo de búsqueda está vacío
        } else {
            const filtered = sugerencias.filter((sugerencia) =>
                sugerencia.texto_sug.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredSugerencias(filtered);
        }
        setCurrentPage(1); // Reiniciar a la primera página al cambiar el filtro
    }, [searchTerm, sugerencias]);

    // Calcular las sugerencias actuales en función de la página
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredSugerencias.slice(indexOfFirstItem, indexOfLastItem);

    // Cambiar visibilidad de una sugerencia
    const handleEliminar = async (id_sug: number) => {
        try {
            await axios.patch(`http://localhost:8000/api/sugerencias/${id_sug}`, { visible: 0 });
            setSugerencias((prevSugerencias) =>
                prevSugerencias.filter((sugerencia) => sugerencia.id_sug !== id_sug)
            );
        } catch (err) {
            console.error('Error al actualizar la visibilidad:', err);
            setError('Error al eliminar la sugerencia.');
        }
    };

    // Manejo de la paginación
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="container">
            <h1>Sugerencias Visibles</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Buscar sugerencias..."
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

            <ul>
                {currentItems.map((sugerencia) => (
                    <li key={sugerencia.id_sug} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc' }}>
                        <p><strong>Texto:</strong> {sugerencia.texto_sug}</p>
                        <p><strong>Correo del usuario:</strong> {sugerencia.correo_usu_suge}</p>
                        <p><strong>Fecha:</strong> {new Date(sugerencia.fec_sug).toLocaleDateString()}</p>
                        <button
                            style={{
                                backgroundColor: '#e74c3c',
                                color: '#fff',
                                border: 'none',
                                padding: '10px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleEliminar(sugerencia.id_sug)}
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>

            {/* Controles de paginación */}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                {Array.from({ length: Math.ceil(filteredSugerencias.length / itemsPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        style={{
                            padding: '10px',
                            margin: '0 5px',
                            backgroundColor: currentPage === index + 1 ? '#3498db' : '#ddd',
                            color: currentPage === index + 1 ? '#fff' : '#000',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Sugerencias;
