import { useEffect, useState } from "react"
import Card from "../components/candidatoCard/CandidatoCard"
import { Config } from "../util/models/Config"
import { Partido } from "../util/models/PartidoModel"
import { getPartidos } from "../util/data"

const CandidatosPage = () => {
    const [someChoose, setSomeChoose] = useState(false)
    const [partidos, setPartidos] = useState<Partido[]>([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const stringConfig = localStorage.getItem('config')

        if (!stringConfig) return

        const tipo = JSON.parse(stringConfig) as Config
        const data = await getPartidos(tipo.tipo_eleccion)

        if (data.partidos) {
            setPartidos(data.partidos)
        }
    }

    const handleLock = () => {
        setSomeChoose(true)
    }

    return (
        <div className="cand">
            <div className="cand-cont">
                {partidos.map((partido) => (
                    <Card
                        key={partido.id}
                        partido={partido}
                        handleLock={handleLock}
                        isLocked={someChoose}
                    />
                ))}
            </div>
        </div>
    )
}

export { CandidatosPage }
