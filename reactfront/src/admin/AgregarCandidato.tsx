import { useState, useEffect, FC, useMemo, useRef } from 'react';
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
    const { reset: resetNomCan, ...nomCan } = useField('text', true);
    const { reset: resetNomCan2, ...nomCan2 } = useField('text', true);
    const { reset: resetEslogan, ...eslogan } = useField('text', true);
    const inputImgRef = useRef<HTMLInputElement>(null)
    const inputImgRef2 = useRef<HTMLInputElement>(null)

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
        const img1 = await converToBase64(inputImgRef.current!)
        const img2 = await converToBase64(inputImgRef2.current!)

        try {
            await axios.post('http://localhost:8000/api/candidatos/register', {
                nomCan: nomCan.value,
                cargoCan: cargos![0],
                nomCan2: nomCan2.value,
                cargoCan2: cargos![1],
                id_eleccion: idEleccion,
                eslogan: eslogan.value,
                imgCan1: img1,
                imgCan2: img2
            });

            resetNomCan!()
            resetNomCan2!()
            resetEslogan!()

            setIdEleccion(0);
            setMensaje('Candidato agregado correctamente!');
        } catch (error) {
            console.error('Error al agregar candidato:', error);
            setMensaje('Hubo un error al agregar el candidato.');
        }
    };

    const converToBase64 = (input: HTMLInputElement): Promise<string> => {
        const file = input.files![0];

        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file)
        })
    }

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
                                {...nomCan}
                                required
                            />
                            <label>Imagen del candidato:</label>
                            <input type='file' accept='image/*' required ref={inputImgRef} />
                        </div>
                        <div>
                            <label>Nombre completo del candidato a {cargos![1]}:</label>
                            <input
                                {...nomCan2}
                                required
                            />
                            <label>Imagen del candidato:</label>
                            <input type='file' accept='image/*' required ref={inputImgRef2} />
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
