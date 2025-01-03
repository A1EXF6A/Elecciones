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
    const [error, setError] = useState<string | null>(null);
    const [publicos, setPublicos] = useState<string[]>([]);
    const [expandedPropuesta, setExpandedPropuesta] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual

    const propuestasPorPagina = 5; // Número de propuestas por página
    const tipoEleccion = JSON.parse(localStorage.getItem('config') || '{}').tipo_eleccion;

    useEffect(() => {
        const fetchCandidatos = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/candidatos/${tipoEleccion}`);
                setCandidatos(response.data.data);
            } catch (err) {
                console.error('Error al obtener los candidatos:', err);
                setError('Error al obtener los candidatos.');
            }
        };

        const fetchPropuestas = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/propuestas/ver');
                setPropuestas(response.data);
            } catch (err) {
                console.error('Error al obtener las propuestas:', err);
                setError('Error al obtener las propuestas.');
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

    const togglePropuestaDetails = (id_pro: number) => {
        setExpandedPropuesta((prev) => (prev === id_pro ? null : id_pro));
    };

    const cambiarPagina = (pagina: number) => {
        if (pagina > 0 && pagina <= totalPaginas) {
            setCurrentPage(pagina);
        }
    };

    const renderCandidatos = () => (
        <div style={{ marginBottom: '20px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {candidatos.map((candidato) => (
                <div
                    key={candidato.id_cand}
                    onClick={() => handleCandidatoSelect(candidato.id_cand)}
                    style={{
                        cursor: 'pointer',
                        border: '1px solid #ccc',
                        padding: '10px',
                        borderRadius: '10px',
                        backgroundColor: '#f9f9f9',
                        textAlign: 'center',
                        width: '150px',
                    }}
                >
                    <img
                        src={candidato.img_can}
                        alt={candidato.nom_can}
                        style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: '5px',
                            marginBottom: '10px',
                        }}
                    />
                    <h3>{candidato.nom_can}</h3>
                    <p>{candidato.cargo_can}</p>
                </div>
            ))}
        </div>
    );

    const renderPropuestas = () => (
        <div>
            <h2>{candidatos.find((candidato) => candidato.id_cand === selectedCandidato)?.nom_can}</h2>
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="publico-filter" style={{ marginRight: '10px' }}>
                    Filtrar por público:
                </label>
                <select
                    id="publico-filter"
                    value={selectedPublico}
                    onChange={handlePublicoChange}
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                    }}
                >
                    {publicos.map((publico) => (
                        <option key={publico} value={publico}>
                            {publico}
                        </option>
                    ))}
                </select>
            </div>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {propuestasPaginadas.map((propuesta) => (
                    <li
                        key={propuesta.id_pro}
                        style={{
                            marginBottom: '20px',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            backgroundColor: '#f9f9f9',
                        }}
                    >
                        <h3
                            onClick={() => togglePropuestaDetails(propuesta.id_pro)}
                            style={{
                                cursor: 'pointer',
                                color: '#007bff',
                                textDecoration: 'underline',
                            }}
                        >
                            {propuesta.titulo_pro}
                        </h3>
                        {expandedPropuesta === propuesta.id_pro && (
                            <>
                                <p>{propuesta.des_pro}</p>
                                <p>
                                    <strong>Público objetivo:</strong> {propuesta.publico_pro}
                                </p>
                            </>
                        )}
                    </li>
                ))}
            </ul>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button
                    onClick={() => cambiarPagina(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{
                        padding: '10px',
                        margin: '0 5px',
                        borderRadius: '5px',
                        backgroundColor: '#f0f0f0',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    }}
                >
                    Anterior
                </button>
                <span style={{ padding: '10px' }}>
                    Página {currentPage} de {totalPaginas}
                </span>
                <button
                    onClick={() => cambiarPagina(currentPage + 1)}
                    disabled={currentPage === totalPaginas}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        fontSize: '16px',
                        borderRadius: '5px',
                        border: '1px solid #007bff', // Borde azul
                        backgroundColor: '#007bff',  // Fondo azul
                        color: '#fff',
                        cursor: currentPage === totalPaginas ? 'not-allowed' : 'pointer',
                    }}
                >
                    Siguiente
                </button>
            </div>

            <button
                onClick={() => setSelectedCandidato(null)}
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    border: '1px solid #007bff', // Borde azul
                    backgroundColor: '#007bff',  // Fondo azul
                    color: '#fff',               // Texto blanco
                    cursor: 'pointer',
                }}
            >
                Volver a seleccionar candidato
            </button>

        </div>
    );

    return (
        <div className="container">
            <h1>Lista de Propuestas</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {selectedCandidato === null ? renderCandidatos() : renderPropuestas()}
        </div>
    );
};

export default PropuestasList;
