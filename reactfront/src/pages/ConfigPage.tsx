import { useEffect, useState } from "react";
import axios from 'axios';

interface TipoEleccion {
    id_eleccion: number;
    nombre_eleccion: string;
}

const ConfigPage = () => {
    const [tipoElecciones, setTipoElecciones] = useState<TipoEleccion[]>([]);
    const [idEleccion, setIdEleccion] = useState<number>(0);

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

    return (
        <>
            <h1>Configuraciones</h1>
            <section style={styles.section}>
                <p>Categoria de los candidatos</p>
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
                <button >Guardar configuraciones</button>
            </section>
        </>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    combo: {
        padding: '.5rem'
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    }
}

export default ConfigPage;