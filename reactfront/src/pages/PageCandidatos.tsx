import { createContext, useEffect, useState } from "react"
import Card from "../components/candidatoCard/CandidatoCard"
import { Config } from "../util/models/Config"
import { Partido } from "../util/models/PartidoModel"
import { getPartidos } from "../util/data"
import { updateVote } from "../util/update"

type VotoContextType = {
    openModal: (id: number) => void,
    idPartido: number | null
}

type Voto = {
    idPartido: number
}

const VotoContext = createContext<VotoContextType>({} as VotoContextType)

const CandidatosPage = () => {
    const [someChoose, setSomeChoose] = useState(false)
    const [confirmed, setConfirmed] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [partidos, setPartidos] = useState<Partido[]>([])
    const [idPartido, setIdPartido] = useState<number | null>(null)

    useEffect(() => {
        fetchData()

        const voto = localStorage.getItem('voto')
        if (voto) {
            const idPartidoAux = (JSON.parse(voto) as Voto).idPartido
            setIdPartido(idPartidoAux)
            setSomeChoose(true)
        }
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

    const openModal = (id: number) => {
        setDialogOpen(true)
        setIdPartido(id)
    }

    const handleVote = () => {
        setDialogOpen(false)
        setConfirmed(true)
        localStorage.setItem('voto', JSON.stringify({ idPartido }))
        updateVote(idPartido!)
    }

    return (
        <VotoContext.Provider value={{ openModal, idPartido }}>
            <div className="cand">
                <div className="cand-cont">
                    {partidos.map((partido) => (
                        <Card
                            key={partido.id}
                            idPartido={partido.id}
                            partido={partido}
                            handleLock={handleLock}
                            isLocked={someChoose}
                        />
                    ))}
                </div>
                <dialog open={dialogOpen} className='cand-dialog'>
                    {confirmed ?
                        <div className="content-dialog">
                            <h1>¡Gracias por votar!</h1>
                            <p>Recuerda que tu voto es secreto</p>
                            <button onClick={() => setDialogOpen(false)}>Entendido</button>
                        </div> :
                        <div className="content-dialog">
                            <h1>¿Estás seguro?</h1>
                            <p>No se puede deshacer el voto</p>
                            <div className="buttons">
                                <button onClick={() => setDialogOpen(false)}>No, Volver a votar</button>
                                <button onClick={() => handleVote()}>Sí, estoy seguro</button>
                            </div>
                        </div>}
                </dialog>
            </div>
        </VotoContext.Provider>
    )
}

export { CandidatosPage, VotoContext }
