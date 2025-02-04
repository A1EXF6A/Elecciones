import { createContext, useEffect, useState } from "react"
import { Config } from "../util/models/Config"
import { Partido } from "../util/models/PartidoModel"
import { getPartidos } from "../util/data"
import { updateVote } from "../util/update"
import Card from "../components/candidatoCard/CandidatoCard"

import 'chartist/dist/index.css'
import PieChartVote from "../components/PieChartVotos"

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
    const [dialogState, setDialogState] = useState<number>(0)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [partidos, setPartidos] = useState<Partido[]>([])
    const [idPartido, setIdPartido] = useState<number | null>(null)
    const [tipoEleccion, setTipoEleccion] = useState<number | null>()

    useEffect(() => {
        fetchData()

        const votoTipo = localStorage.getItem(`votoTipo${tipoEleccion}`)
        if (!votoTipo) return;

        const voto = (JSON.parse(votoTipo) as Voto).idPartido

        setIdPartido(voto)
        setSomeChoose(true)
    }, [tipoEleccion])

    const fetchData = async () => {
        const stringConfig = localStorage.getItem('config')

        if (!stringConfig) return

        const tipo = JSON.parse(stringConfig) as Config
        setTipoEleccion(tipo.tipo_eleccion)
        const data = await getPartidos(tipo.tipo_eleccion)

        if (data.partidos) {
            setPartidos(data.partidos)
        }
    }

    const openModal = (id: number) => {
        setDialogOpen(true)
        setIdPartido(id)
    }

    const backToVote = () => {
        setIdPartido(null)
        setDialogOpen(false)
    }

    const handleVote = () => {
        setSomeChoose(true)
        setDialogState(1)

        localStorage.setItem(`votoTipo${tipoEleccion}`, JSON.stringify({ idPartido }))
        updateVote(idPartido!)
    }

    return (
        <VotoContext.Provider value={{ openModal, idPartido }}>
            <div className="cand">
                <div className="cand-cont">
                    {
                        partidos.length > 0 ?
                            partidos.map((partido) => (
                                <Card
                                    key={partido.id}
                                    idPartido={partido.id}
                                    partido={partido}
                                    isLocked={someChoose}
                                />
                            )) :
                            <section className="no-cand">
                                <h1><i>No existen partidos inscritos...</i></h1>
                            </section>
                    }
                </div>
                <dialog open={dialogOpen} className='cand-dialog'>
                    {dialogState === 0 ?
                        <div className="content-dialog">
                            <h1>¿Estás seguro?</h1>
                            <p>No se puede deshacer el voto</p>
                            <div className="buttons">
                                <button onClick={() => handleVote()}>Sí, estoy seguro</button>
                                <button onClick={() => backToVote()}>No, Volver a votar</button>
                            </div>
                        </div> : dialogState === 1 ?
                            <div className="content-dialog">
                                <h1>¡Gracias por votar!</h1>
                                <p>Recuerda que tu voto es secreto</p>
                                <button onClick={() => setDialogState(2)}>Entendido</button>
                            </div> :
                            <div className="content-dialog">
                                <h1>Estadistica de votos</h1>
                                <PieChartVote tipo_eleccion={tipoEleccion!} />
                                <button onClick={() => setDialogOpen(false)}>Entendido</button>
                            </div>
                    }
                </dialog>
            </div>
        </VotoContext.Provider>
    )
}

export { CandidatosPage, VotoContext }
