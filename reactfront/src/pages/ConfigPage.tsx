import { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import { Config } from "../util/models/Config";

interface TipoEleccion {
    id_eleccion: number;
    nombre_eleccion: string;
}

const originalConfig: Config = {
    tipo_eleccion: 2,
    navbar_color: '#333'
}

const ConfigPage = () => {
    const [tipoElecciones, setTipoElecciones] = useState<TipoEleccion[]>([]);
    const [idEleccion, setIdEleccion] = useState<number>(0);
    const [color, setColor] = useState<string>('#333');

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

        const config = localStorage.getItem('config');
        if (config) {
            const configObject = JSON.parse(config) as Config;
            setIdEleccion(configObject.tipo_eleccion);
            setColor(configObject.navbar_color);
        }
    }, []);

    const saveConfig = () => {
        if (idEleccion === 0) {
            alert('Seleccione un tipo de eleccion');
            return;
        }

        const newConfig = {
            tipo_eleccion: idEleccion,
            navbar_color: color
        } as Config;
        console.log(newConfig)

        localStorage.setItem('config', JSON.stringify(newConfig));
        alert('Configuraciones guardadas');
        window.location.reload();
    }

    const resetConfig = useCallback(() => {
        const opt = window.confirm('¿Está seguro de que desea resetear las configuraciones?');
        if (opt) {
            localStorage.setItem('config', JSON.stringify(originalConfig));
            alert('Configuraciones reseteadas');
            window.location.reload();
        }
    }, []);

    return (
        <div style={styles.container}>
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
                <p>Color de la barra de navegación</p>
                <input type="color" onChange={e => setColor(e.target.value)} value={color} style={styles.input} />
                <button onClick={saveConfig}>Guardar configuraciones</button>
                <button onClick={resetConfig} style={styles.resetButton}>Resetear configuraciones</button>
            </section>
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    combo: {
        padding: '.5rem'
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '2rem',
        width: '100%',
        maxWidth: '30rem',
        border: '1px solid #ccc',
    },
    input: {
        padding: 0,
        width: 'revert'
    },
    resetButton: {
        backgroundColor: 'red',
        color: 'white',
        padding: '.5rem',
        border: 'none',
        cursor: 'pointer'
    }
}

export default ConfigPage;