import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Propuesta {
    id_pro: number;
    id_cand: number;
    titulo_pro: string;
    des_pro: string;
    publico_pro: string;
}

interface Candidato {
    id_cand: number;
    nom_can: string;
    cargo_can: string;
    img_can: string;
}

const PropuestasList: React.FC = () => {
    const [candidatos, setCandidatos] = useState<Candidato[]>([]);
    const [propuestas, setPropuestas] = useState<Propuesta[]>([]);
    const [selectedCandidato, setSelectedCandidato] = useState<number | null>(null);
    const [selectedPublico, setSelectedPublico] = useState<string>('Todos');
    const [publicos, setPublicos] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const propuestasPorPagina = 4; // Mostramos 2 propuestas por página
    const tipoEleccion = JSON.parse(localStorage.getItem('config') || '{}').tipo_eleccion;

    useEffect(() => {
        const fetchCandidatos = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/candidatos/${tipoEleccion}`);
                setCandidatos(response.data.data);
            } catch (err) {
                console.error('Error al obtener los candidatos:', err);
            }
        };

        const fetchPropuestas = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/propuestas/ver');
                setPropuestas(response.data);
            } catch (err) {
                console.error('Error al obtener las propuestas:', err);
            }
        };

        fetchCandidatos();
        fetchPropuestas();
    }, [tipoEleccion]);

    const propuestasFiltradas = selectedCandidato
        ? propuestas
            .filter((propuesta) => propuesta.id_cand === selectedCandidato)
            .filter((propuesta) =>
                selectedPublico === 'Todos'
                    ? true
                    : propuesta.publico_pro.split(',').map((p) => p.trim()).includes(selectedPublico)
            )
        : [];

    const propuestasPaginadas = propuestasFiltradas.slice(
        (currentPage - 1) * propuestasPorPagina,
        currentPage * propuestasPorPagina
    );

    const totalPaginas = Math.ceil(propuestasFiltradas.length / propuestasPorPagina);

    const handleCandidatoSelect = (id_cand: number) => {
        setSelectedCandidato(id_cand);
        setCurrentPage(1);

        const publicosUnicos = new Set<string>();
        propuestas
            .filter((propuesta) => propuesta.id_cand === id_cand)
            .forEach((propuesta) => {
                propuesta.publico_pro.split(',').forEach((publico) => {
                    publicosUnicos.add(publico.trim());
                });
            });
        setPublicos(['Todos', ...Array.from(publicosUnicos)]);
    };

    const handlePublicoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPublico(event.target.value);
        setCurrentPage(1);
    };

    const cambiarPagina = (pagina: number) => {
        if (pagina > 0 && pagina <= totalPaginas) {
            setCurrentPage(pagina);
        }
    };

    const renderCandidatos = () => (
        <div style={styles.candidatosContainer}>
            {candidatos.map((candidato) => (
                <div
                    key={candidato.id_cand}
                    onClick={() => handleCandidatoSelect(candidato.id_cand)}
                    style={styles.candidatoCard}
                >
                    <img
                        src={candidato.img_can}
                        alt={candidato.nom_can}
                        style={styles.candidatoImage}
                    />
                    <h3>{candidato.nom_can}</h3>
                    <p>{candidato.cargo_can}</p>
                </div>
            ))}
        </div>
    );

    const renderPropuestas = () => (
        <div>
            <h2 style={styles.candidatoName}>
                {candidatos.find((candidato) => candidato.id_cand === selectedCandidato)?.nom_can}
            </h2>
            <div style={styles.publicoFilter}>
                <label htmlFor="publico-filter">Filtrar por público:</label>
                <select
                    id="publico-filter"
                    value={selectedPublico}
                    onChange={handlePublicoChange}
                    style={styles.selectInput}
                >
                    {publicos.map((publico) => (
                        <option key={publico} value={publico}>
                            {publico}
                        </option>
                    ))}
                </select>
            </div>

            <div style={styles.propuestasList}>
                {propuestasPaginadas.map((propuesta) => (
                    <div key={propuesta.id_pro} style={styles.propuestaItem}>
                        <h3 style={styles.propuestaTitle}>
                            {propuesta.titulo_pro}
                        </h3>
                        <p style={styles.propuestaDescription}>{propuesta.des_pro}</p>
                        <p style={styles.propuestaPublico}>
                            <strong>Público objetivo:</strong> {propuesta.publico_pro}
                        </p>
                    </div>
                ))}
            </div>

            <div style={styles.pagination}>
                <button
                    onClick={() => cambiarPagina(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={styles.paginationButton}
                >
                    Anterior
                </button>
                <span style={styles.paginationText}>
                    Página {currentPage} de {totalPaginas}
                </span>
                <button
                    onClick={() => cambiarPagina(currentPage + 1)}
                    disabled={currentPage === totalPaginas}
                    style={styles.paginationButton}
                >
                    Siguiente
                </button>
            </div>

            <button
                onClick={() => setSelectedCandidato(null)}
                style={styles.backButton}
            >
                Volver a seleccionar candidato
            </button>
        </div>
    );

    return (
        <div style={styles.container}>
            <h1 style={styles.pageTitle}>Lista de Propuestas</h1>
            {selectedCandidato === null ? renderCandidatos() : renderPropuestas()}
        </div>
    );
};

export default PropuestasList;

const styles = {
    container: {
        padding: '20px',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    },
    pageTitle: {
        textAlign: 'center' as 'center',  // Asegurando que el valor sea el esperado por React
        fontSize: '28px',
        marginBottom: '30px',
        fontWeight: '600',
        color: '#2c3e50',
    },
    candidatosContainer: {
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap' as 'wrap', // Corregido para aceptar solo 'wrap'
        justifyContent: 'center',
        marginBottom: '20px',
    },
    candidatoCard: {
        cursor: 'pointer',
        border: '1px solid #ddd',
        padding: '15px',
        borderRadius: '10px',
        backgroundColor: '#fff',
        textAlign: 'center' as 'center', // Cambiar a un valor válido
        width: '200px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s',
    },
    candidatoImage: {
        width: '100%',
        height: '150px',
        objectFit: 'cover' as 'cover', // Asegúrate de usar un valor válido
        borderRadius: '8px',
        marginBottom: '10px',
    },
    candidatoName: {
        textAlign: 'center' as 'center',  // Aquí también debes especificarlo correctamente
        fontSize: '24px',
        marginBottom: '20px',
    },
    publicoFilter: {
        marginBottom: '20px',
        textAlign: 'center' as 'center',  // Asegúrate de que `center` es válido
    },
    selectInput: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    propuestasList: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr', // Dos propuestas por fila
        gap: '20px',
        padding: '0',
    },
    propuestaItem: {
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        padding: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    propuestaTitle: {
        color: '#333',
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },

    propuestaDescription: {
        color: '#333',
        fontSize: '16px',
        lineHeight: '1.5',
        marginBottom: '10px',
    },
    propuestaPublico: {
        color: '#666',
        fontSize: '14px',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
    },
    paginationButton: {
        backgroundColor: '#2980b9',  // Color del botón igual a los de noticias
        color: '#ffffff',
        border: 'none',
        padding: '12px 25px',
        margin: '0 10px',
        cursor: 'pointer',
        borderRadius: '30px',  // Bordes redondeados
        fontSize: '16px',
        fontWeight: '500',
        transition: 'background-color 0.3s, transform 0.3s',  // Transiciones suaves
    },
    paginationButtonDisabled: {
        backgroundColor: '#b0bec5',  // Color para los botones deshabilitados
        cursor: 'not-allowed',
    },
    paginationButtonHover: {
        backgroundColor: '#3498db',  // Color en hover
        transform: 'scale(1.05)',  // Efecto de escala al pasar el mouse
    },
    paginationText: {
        fontSize: '16px',
    },
    backButton: {
        marginTop: '20px',
        padding: '12px 25px',
        fontSize: '16px',
        borderRadius: '30px',
        backgroundColor: '#2980b9',  // Igual que los botones de paginación
        color: '#ffffff',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.3s',
    },
    backButtonDisabled: {
        backgroundColor: '#b0bec5',
        cursor: 'not-allowed',
    },
};
