import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface TipoEleccion {
    id_eleccion: number;
    nombre_eleccion: string;
}

const AgregarCandidato: React.FC = () => {
    const [tipoElecciones, setTipoElecciones] = useState<TipoEleccion[]>([]);
    const [nom1, setNom1] = useState<string>('');
    const [nom2, setNom2] = useState<string>('');
    const [ape1, setApe1] = useState<string>('');
    const [ape2, setApe2] = useState<string>('');
    const [idEleccion, setIdEleccion] = useState<number | null>(null);
    const [cargo, setCargo] = useState<string>('');
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/candidatos/register', {
                nom1,
                nom2,
                ape1,
                ape2,
                id_eleccion: idEleccion,
                cargo,
            });

            // Mensaje de éxito
            setMensaje('Candidato agregado correctamente!');
            // Limpiar el formulario
            setNom1('');
            setNom2('');
            setApe1('');
            setApe2('');
            setIdEleccion(null);
            setCargo('');
        } catch (error) {
            console.error('Error al agregar candidato:', error);
            // Mensaje de error
            setMensaje('Hubo un error al agregar el candidato.');
        }
    };

    return (
        <div className="container">
            <h3>Agregar Candidato</h3>

            <form onSubmit={handleSubmit}>
                {/* Nombre */}
                <div>
                    <label>Primer Nombre:</label>
                    <input
                        type="text"
                        value={nom1}
                        onChange={(e) => setNom1(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Segundo Nombre:</label>
                    <input
                        type="text"
                        value={nom2}
                        onChange={(e) => setNom2(e.target.value)}
                    />
                </div>

                {/* Apellido */}
                <div>
                    <label>Primer Apellido:</label>
                    <input
                        type="text"
                        value={ape1}
                        onChange={(e) => setApe1(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Segundo Apellido:</label>
                    <input
                        type="text"
                        value={ape2}
                        onChange={(e) => setApe2(e.target.value)}
                    />
                </div>

                {/* Elección */}
                <div>
                    <label>Elección:</label>
                    <select
                        value={idEleccion ?? ''}
                        onChange={(e) => setIdEleccion(Number(e.target.value))}
                        required
                    >
                        <option value="">Seleccione una elección</option>
                        {tipoElecciones.map((eleccion) => (
                            <option key={eleccion.id_eleccion} value={eleccion.id_eleccion}>
                                {eleccion.nombre_eleccion}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Cargo */}
                <div>
                    <label>Cargo:</label>
                    <input
                        type="text"
                        value={cargo}
                        onChange={(e) => setCargo(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Agregar Candidato</button>
            </form>

            {/* Mostrar mensaje de éxito o error */}
            {mensaje && (
                <div className={`mensaje ${mensaje.includes('correctamente') ? 'exito' : 'error'}`}>
                    {mensaje}
                </div>
            )}
        </div>
    );
};

export default AgregarCandidato;
