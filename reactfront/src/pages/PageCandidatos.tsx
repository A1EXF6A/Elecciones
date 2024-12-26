import { useEffect, useState } from "react"
import Card from "../components/candidatoCard/CandidatoCard"

const CandidatosPage = () => {
    const [someChoose, setSomeChoose] = useState(false)

    useEffect(() => {
        const stringConfig = localStorage.getItem('config')

        if (!stringConfig) return

        const tipo = JSON.parse(stringConfig)
        console.log(tipo.tipo_eleccion)
    }, [])

    const handleLock = () => {
        setSomeChoose(true)
    }

    return (
        <div className="cand">
            <div className="cand-cont">
                <Card
                    handleLock={handleLock}
                    isLocked={someChoose}
                />
                <Card
                    handleLock={handleLock}
                    isLocked={someChoose}
                />
            </div>
        </div>
    )
}

export { CandidatosPage }
