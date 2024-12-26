import { useState, useEffect, FC, useMemo } from 'react';
import { useField } from '../util/hooks/useField';
import axios from 'axios';


interface TipoEleccion {
    id_eleccion: number;
    nombre_eleccion: string;
}

const cargosStrings = {
    presidencial: ['Presidente', 'Vicepresidente'],
    provincial: ['Gobernador', 'Prefecto'],
    universidad: ['Rector', 'Vicerrector']
}

const AgregarCandidato: FC = () => {
    const [tipoElecciones, setTipoElecciones] = useState<TipoEleccion[]>([]);
    const [idEleccion, setIdEleccion] = useState<number>(0);
    const [mensaje, setMensaje] = useState<string>('');
    const { reset: resetCargo1, ...cargo1 } = useField()
    const { reset: resetCargo2, ...cargo2 } = useField()
    const { reset: resetCargo3, ...eslogan } = useField()

    const cargos = useMemo(() => {
        if (idEleccion === 0) {
            return null
        }

        if (idEleccion === 1) return cargosStrings.provincial
        else if (idEleccion === 2) return cargosStrings.universidad
        else return cargosStrings.presidencial
    }, [idEleccion])

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
                cargo1: cargo1.value,
                cargo2: cargo2.value,
                id_eleccion: idEleccion,
                eslogan: eslogan.value
            });

            resetCargo1()
            resetCargo2()
            resetCargo3()

            setIdEleccion(0);
            setMensaje('Candidato agregado correctamente!');
        } catch (error) {
            console.error('Error al agregar candidato:', error);
            setMensaje('Hubo un error al agregar el candidato.');
        }
    };

    return (
        <div className="container">
            <h3>Agregar Candidato</h3>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Elección:</label>
                    <select
                        value={idEleccion ?? ''}
                        onChange={(e) => setIdEleccion(Number(e.target.value))}
                        required
                        style={styles.combo}
                    >
                        <option value='0'>Seleccione un tipo</option>
                        {tipoElecciones.map((eleccion) => (
                            <option key={eleccion.id_eleccion} value={eleccion.id_eleccion}>
                                {eleccion.nombre_eleccion}
                            </option>
                        ))}
                    </select>
                </div>
                {idEleccion !== 0 ? (
                    <>
                        <div>
                            <label>Nombre completo del candidato a {cargos![0]}:</label>
                            <input
                                {...cargo1}
                                required
                            />
                        </div>
                        <div>
                            <label>Nombre completo del candidato a {cargos![1]}:</label>
                            <input
                                {...cargo2}
                                required
                            />
                        </div>
                        <div>
                            <label>Eslogan del candidato:</label>
                            <input
                                {...eslogan}
                                required
                            />
                        </div>
                        <button type="submit">Agregar Candidato</button>
                    </>
                ) : null}
            </form>
            {mensaje && (
                <div className={`mensaje ${mensaje.includes('correctamente') ? 'exito' : 'error'}`}>
                    {mensaje}
                </div>
            )}
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    combo: {
        padding: '.5rem'
    }
}

export default AgregarCandidato;
