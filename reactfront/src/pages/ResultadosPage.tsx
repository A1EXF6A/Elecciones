import { useState, useEffect } from "react";
import PieChartVote from "../components/PieChartVotos"
import { Config } from "../util/models/Config";

const ResultadosPage = () => {
    const [tipoEleccion, setTipoEleccion] = useState<number | null>();

    useEffect(() => {
        const stringConfig = localStorage.getItem('config')

        if (!stringConfig) return

        const tipo = JSON.parse(stringConfig) as Config;
        setTipoEleccion(tipo.tipo_eleccion);
    }, [])

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "30px",
        }}>
            <h3>Ver resultados de los votos</h3>
            <PieChartVote tipo_eleccion={tipoEleccion!} />
        </div>
    )
}

export default ResultadosPage