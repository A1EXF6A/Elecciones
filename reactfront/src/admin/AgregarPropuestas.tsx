import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Propuesta {
    id_pro: number;
    id_cand: number;
    titulo_pro: string;
    des_pro: string;
    publico_pro: string;
    favorita: number;
}

interface Candidato {
    id_cand: number;
    nom_can: string;
    cargo_can: string;
}

interface TipoEleccion {
    id_eleccion: number;
    nombre_eleccion: string;
}

const Propuestas: React.FC = () => {
    const [propuestas, setPropuestas] = useState<Propuesta[]>([]);
    const [candidatos, setCandidatos] = useState<Candidato[]>([]);
    const [tiposEleccion, setTiposEleccion] = useState<TipoEleccion[]>([]);
    const [filtroCandidato, setFiltroCandidato] = useState<number | null>(null);
    const [filtroEleccion, setFiltroEleccion] = useState<number | null>(null);
    const [nuevoTitulo, setNuevoTitulo] = useState<string>('');
    const [nuevaDescripcion, setNuevaDescripcion] = useState<string>('');
    const [nuevoPublico, setNuevoPublico] = useState<string[]>([]);
    const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);
    const [errorFormulario, setErrorFormulario] = useState<string | null>(null);

    const [paginaActual, setPaginaActual] = useState<number>(1);
    const propuestasPorPagina = 4;

    const opcionesPublico = ['Estudiantes', 'Trabajadores', 'Empresarios', 'Desempleados', 'Jubilados', 'Universidades', 'Escuelas', 'Hospitales'];

    useEffect(() => {
        const fetchTiposEleccion = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/tipoEleccion');
                setTiposEleccion(response.data || []);
            } catch (err) {
                console.error(err);
            }
        };

        fetchTiposEleccion();
    }, []);

    useEffect(() => {
        const fetchPropuestas = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/propuestas/ver');
                setPropuestas(response.data || []);
            } catch (err) {
                console.error(err);
            }
        };

        fetchPropuestas();
    }, []);

    useEffect(() => {
        const fetchCandidatos = async () => {
            if (filtroEleccion === null) {
                setCandidatos([]);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8000/api/candidatos/${filtroEleccion}`);
                setCandidatos(response.data.data || []);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCandidatos();
    }, [filtroEleccion]);

    const cambiarFavorito = async (id_pro: number, favorita: number) => {
        try {
            const response = await axios.patch(`http://localhost:8000/api/propuestas/${id_pro}`, {
                favorita: favorita === 1 ? 0 : 1,
            });

            setPropuestas((prevPropuestas) =>
                prevPropuestas.map((propuesta) =>
                    propuesta.id_pro === id_pro
                        ? { ...propuesta, favorita: response.data.favorita }
                        : propuesta
                )
            );
        } catch (err) {
            console.error('Error al cambiar el estado de favorito:', err);
        }
    };

    const agregarPropuesta = async () => {
        if (!filtroEleccion || !filtroCandidato || !nuevoTitulo || !nuevaDescripcion || nuevoPublico.length === 0) {
            setErrorFormulario('Por favor complete todos los campos.');
            return;
        }
        setErrorFormulario(null);

        try {
            const nuevaPropuesta = {
                id_cand: filtroCandidato,
                titulo_pro: nuevoTitulo,
                des_pro: nuevaDescripcion,
                publico_pro: nuevoPublico.join(', '),
                favorita: 0,
            };

            const response = await axios.post('http://localhost:8000/api/propuestas', nuevaPropuesta);
            setPropuestas([...propuestas, response.data]);
            setNuevoTitulo('');
            setNuevaDescripcion('');
            setNuevoPublico([]);
            setFiltroCandidato(null);
            setMostrarFormulario(false);
        } catch (err) {
            console.error('Error al agregar la propuesta:', err);
        }
    };

    const propuestasFiltradas = propuestas.filter((propuesta) => {
        if (filtroCandidato !== null && propuesta.id_cand !== filtroCandidato) return false;
        return true;
    });

    const indexUltimaPropuesta = paginaActual * propuestasPorPagina;
    const indexPrimeraPropuesta = indexUltimaPropuesta - propuestasPorPagina;
    const propuestasPaginadas = propuestasFiltradas.slice(indexPrimeraPropuesta, indexUltimaPropuesta);

    const totalPaginas = Math.ceil(propuestasFiltradas.length / propuestasPorPagina);

    const cambiarPagina = (nuevaPagina: number) => {
        setPaginaActual(nuevaPagina);
    };

    const manejarCambioPublico = (opcion: string) => {
        if (nuevoPublico.includes(opcion)) {
            setNuevoPublico(nuevoPublico.filter((item) => item !== opcion));
        } else {
            setNuevoPublico([...nuevoPublico, opcion]);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Propuestas</h1>
            {errorFormulario && <p style={styles.error}>{errorFormulario}</p>}

            <div style={styles.filters}>
                <label>
                    Filtrar por tipo de elección:
                    <select
                        value={filtroEleccion ?? ''}
                        onChange={(e) => setFiltroEleccion(Number(e.target.value) || null)}
                        style={styles.filterSelect}
                    >
                        <option value="">-- Seleccionar tipo de elección --</option>
                        {tiposEleccion.map((tipo) => (
                            <option key={tipo.id_eleccion} value={tipo.id_eleccion}>
                                {tipo.nombre_eleccion}
                            </option>
                        ))}
                    </select>
                </label>

                {filtroEleccion && (
                    <label>
                        Filtrar por candidato:
                        <select
                            value={filtroCandidato ?? ''}
                            onChange={(e) => setFiltroCandidato(Number(e.target.value) || null)}
                            style={styles.filterSelect}
                        >
                            <option value="">-- Seleccionar candidato --</option>
                            {candidatos.map((candidato) => (
                                <option key={candidato.id_cand} value={candidato.id_cand}>
                                    {candidato.nom_can} - {candidato.cargo_can}
                                </option>
                            ))}
                        </select>
                    </label>
                )}
            </div>

            <button style={styles.btnAgregar} onClick={() => setMostrarFormulario(!mostrarFormulario)}>
                {mostrarFormulario ? 'Cancelar' : 'Agregar Propuesta'}
            </button>

            {mostrarFormulario && (
                <div style={styles.formularioContainer}>
                    <div style={styles.formulario}>
                        <h3>Agregar Nueva Propuesta</h3>
                        <label>
                            Título de la propuesta:
                            <input
                                type="text"
                                value={nuevoTitulo}
                                onChange={(e) => setNuevoTitulo(e.target.value)}
                                placeholder="Título"
                                style={styles.input}
                            />
                        </label>

                        <label>
                            Descripción de la propuesta:
                            <textarea
                                value={nuevaDescripcion}
                                onChange={(e) => setNuevaDescripcion(e.target.value)}
                                placeholder="Descripción"
                                style={styles.textarea}
                            />
                        </label>

                        <label>
                            Público al que va dirigida:
                            {opcionesPublico.map((opcion) => (
                                <div key={opcion}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value={opcion}
                                            checked={nuevoPublico.includes(opcion)}
                                            onChange={() => manejarCambioPublico(opcion)}
                                        />
                                        {opcion}
                                    </label>
                                </div>
                            ))}
                        </label>

                        <button style={styles.submitButton} onClick={agregarPropuesta}>
                            Agregar Propuesta
                        </button>
                    </div>
                </div>
            )}

            <div style={styles.grid}>
                {propuestasPaginadas.length === 0 ? (
                    <p>No hay propuestas disponibles.</p>
                ) : (
                    propuestasPaginadas.map((propuesta) => (
                        <div key={propuesta.id_pro} style={styles.propuestaCard}>
                            <h3 style={styles.propuestaTitle}>{propuesta.titulo_pro}</h3>
                            <p style={styles.propuestaDescription}>{propuesta.des_pro}</p>
                            <p style={styles.propuestaPublico}>Público: {propuesta.publico_pro}</p>
                            <p style={styles.propuestaFavorita}>
                                {propuesta.favorita ? 'Favorita' : 'No favorita'}
                            </p>
                            <button
                                style={styles.favoriteButton}
                                onClick={() => cambiarFavorito(propuesta.id_pro, propuesta.favorita)}
                            >
                                {propuesta.favorita ? 'Quitar de favoritos' : 'Marcar como favorita'}
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div style={styles.pagination}>
                <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1} style={styles.paginationButton}>
                    Anterior
                </button>
                <span style={styles.pageNumber}>Página {paginaActual}</span>
                <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas} style={styles.paginationButton}>
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default Propuestas;

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
        textAlign: 'center' as 'center', // Especificamos el tipo correcto
        fontSize: '28px',
        color: '#2c3e50',
        marginBottom: '30px',
        fontWeight: '600',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)', // 2 columnas
        gap: '20px', // Espacio entre columnas y filas
    },
    propuestaCard: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    propuestaTitle: {
        fontSize: '22px',
        color: '#34495e',
        fontWeight: '500',
    },
    propuestaDescription: {
        fontSize: '16px',
        color: '#7f8c8d',
    },
    propuestaPublico: {
        fontSize: '14px',
        color: '#16a085',
        fontStyle: 'italic',
    },
    propuestaFavorita: {
        fontSize: '14px',
        color: '#2980b9',
    },
    favoriteButton: {
        backgroundColor: '#2980b9',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '30px',
        cursor: 'pointer',
    },
    filters: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '30px',
    },
    filterSelect: {
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    btnAgregar: {
        backgroundColor: '#2980b9',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '30px',
        cursor: 'pointer',
        display: 'block',
        margin: '0 auto 30px auto',
    },
    formularioContainer: {
        marginBottom: '20px',
    },
    formulario: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        height: '100px',
    },
    submitButton: {
        backgroundColor: '#27ae60',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '30px',
        cursor: 'pointer',
        width: '100%',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30px',
    },
    paginationButton: {
        backgroundColor: '#2980b9',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    pageNumber: {
        margin: '0 20px',
        fontSize: '16px',
        color: '#34495e',
    },
    error: {
        color: 'red',
        textAlign: 'center' as 'center', // Corregido aquí también
        fontSize: '14px',
    },
};
