import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AgregarPropuestas.css'; // Importa el archivo CSS

interface TipoEleccion {
    id_eleccion: number;
    nombre_eleccion: string;
}

interface Candidato {
    id_cand: number;
    nom1: string;
    nom2: string;
    ape1: string;
    ape2: string;
    cargo: string;
}

const AgregarPropuestas: React.FC = () => {
    const [tipoElecciones, setTipoElecciones] = useState<TipoEleccion[]>([]);
    const [candidatos, setCandidatos] = useState<Candidato[]>([]);
    const [selectedTipo, setSelectedTipo] = useState<number | null>(null);
    const [selectedCandidato, setSelectedCandidato] = useState<number | null>(null);
    const [nombrePropuesta, setNombrePropuesta] = useState<string>('');
    const [descripcionPropuesta, setDescripcionPropuesta] = useState<string>('');
    const [publico, setPublico] = useState<string>('');
    const [mensaje, setMensaje] = useState<string>('');

    // Cargar tipos de elección
    useEffect(() => {
        const fetchData = async () => {
            try {
                const tipoResponse = await axios.get('http://localhost:8000/api/tipoEleccion');
                setTipoElecciones(tipoResponse.data);
            } catch (error) {
                console.error('Error fetching tipo_eleccion:', error);
            }
        };
        fetchData();
    }, []);

    // Cargar candidatos cuando se selecciona un tipo de elección
    useEffect(() => {
        if (selectedTipo !== null) {
            const fetchCandidatos = async () => {
                try {
                    const candidatoResponse = await axios.get(`http://localhost:8000/api/candidatos/${selectedTipo}`);
                    setCandidatos(candidatoResponse.data);
                } catch (error) {
                    console.error('Error fetching candidatos:', error);
                }
            };
            fetchCandidatos();
        }
    }, [selectedTipo]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/propuestas', {
                id_cand: selectedCandidato,
                nom_pro: nombrePropuesta,
                des_pro: descripcionPropuesta,
                publico,
            });

            // Mensaje de éxito
            setMensaje('Propuesta agregada correctamente!');
            // Limpiar el formulario
            setNombrePropuesta('');
            setDescripcionPropuesta('');
            setPublico('');
            setSelectedCandidato(null);

        } catch (error) {
            console.error('Error al agregar propuesta:', error);
            // Mensaje de error
            setMensaje('Hubo un error al agregar la propuesta.');
        }
    };

    return (
        <div className="container">
            <h3>Agregar Propuesta</h3>

            {/* Selección de Elección */}
            <div className="select-container">
                <div>
                    <label>Elección:</label>
                    <select onChange={(e) => setSelectedTipo(Number(e.target.value))} value={selectedTipo ?? ''}>
                        <option value="">Seleccione una elección</option>
                        {tipoElecciones.map((eleccion) => (
                            <option key={eleccion.id_eleccion} value={eleccion.id_eleccion}>
                                {eleccion.nombre_eleccion}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Selección de Candidato */}
            <div className="select-container">
                <div>
                    <label>Candidato:</label>
                    <select
                        onChange={(e) => setSelectedCandidato(Number(e.target.value))}
                        value={selectedCandidato ?? ''}
                        disabled={!selectedTipo}
                    >
                        <option value="">Seleccione un candidato</option>
                        {candidatos.map((candidato) => (
                            <option key={candidato.id_cand} value={candidato.id_cand}>
                                {candidato.nom1} {candidato.ape1} ({candidato.cargo})
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Formulario de Propuesta */}
            <div>
                <h4>Formulario: Agregar Propuesta</h4>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre de la propuesta:</label>
                        <input
                            type="text"
                            value={nombrePropuesta}
                            onChange={(e) => setNombrePropuesta(e.target.value)}
                            required
                            disabled={!selectedCandidato}
                        />
                    </div>

                    <div>
                        <label>Descripción:</label>
                        <textarea
                            value={descripcionPropuesta}
                            onChange={(e) => setDescripcionPropuesta(e.target.value)}
                            required
                            disabled={!selectedCandidato}
                        ></textarea>
                    </div>

                    <div>
                        <label>Dirigido a:</label>
                        <input
                            type="text"
                            value={publico}
                            onChange={(e) => setPublico(e.target.value)}
                            required
                            disabled={!selectedCandidato}
                        />
                    </div>

                    <button type="submit" disabled={!selectedCandidato}>
                        Agregar Propuesta
                    </button>
                </form>

                {/* Mostrar mensaje de éxito o error */}
                {mensaje && (
                    <div className={`mensaje ${mensaje.includes('correctamente') ? 'exito' : 'error'}`}>
                        {mensaje}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AgregarPropuestas;
