import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AgregarPropuestas.css';

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
    const propuestasPorPagina = 5;

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
                publico_pro: nuevoPublico.join(', '), // Convertir la selección en una cadena
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
        <div className="container">
            <h1>Propuestas</h1>
            {errorFormulario && <p style={{ color: 'red' }}>{errorFormulario}</p>}

            <div className="filtros">
                <label>
                    Filtrar por tipo de elección:
                    <select
                        value={filtroEleccion ?? ''}
                        onChange={(e) => setFiltroEleccion(Number(e.target.value) || null)}
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

            <button className="btn-agregar" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
                {mostrarFormulario ? 'Cancelar' : 'Agregar Propuesta'}
            </button>

            {mostrarFormulario && (
                <div className="formulario-contenedor">
                    <div className="mini-formulario">
                        <h3>Agregar Nueva Propuesta</h3>
                        <label>
                            Título de la propuesta:
                            <input
                                type="text"
                                value={nuevoTitulo}
                                onChange={(e) => setNuevoTitulo(e.target.value)}
                                name="titulo"
                                placeholder="Título"
                            />
                        </label>

                        <label>
                            Descripción de la propuesta:
                            <textarea
                                value={nuevaDescripcion}
                                onChange={(e) => setNuevaDescripcion(e.target.value)}
                                name="descripcion"
                                placeholder="Descripción"
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

                        <button onClick={agregarPropuesta}>Agregar Propuesta</button>
                    </div>
                </div>
            )}

            {propuestasPaginadas.length > 0 ? (
                <>
                    <ul>
                        {propuestasPaginadas.map((propuesta) => (
                            <li key={propuesta.id_pro}>
                                <h3>{propuesta.titulo_pro}</h3>
                                <p>{propuesta.des_pro}</p>
                                <p>
                                    <strong>Público:</strong> {propuesta.publico_pro}
                                </p>
                                <p>
                                    <strong>Favorita:</strong> {propuesta.favorita ? 'Sí' : 'No'}
                                </p>
                                <button
                                    onClick={() => cambiarFavorito(propuesta.id_pro, propuesta.favorita)}
                                >
                                    {propuesta.favorita ? 'Quitar de favoritos' : 'Marcar como favorita'}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="paginacion">
                        {Array.from({ length: totalPaginas }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => cambiarPagina(i + 1)}
                                className={paginaActual === i + 1 ? 'activo' : ''}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <p>No hay propuestas disponibles.</p>
            )}
        </div>
    );
};

export default Propuestas;
