import axios from "axios";
import { Partido } from "./models/PartidoModel";

const URI = "http://localhost:8000/api/candidatos";

type CandidatoEnCrudo = {
    id_cand: number,
    nom_can: string,
    cargo_can: string,
    img_can: string,
    nom_can2: string,
    cargo_can2: string,
    img_can2: string,
    eslogan_can: string,
    num_votos: number
}

const getPartidos = async (tipo_eleccion: number): Promise<{ partidos: Partido[] | null }> => {
    try {
        const res = await axios.get<{
            success: boolean,
            message: string,
            data: CandidatoEnCrudo[]
        }>(`${URI}/${tipo_eleccion}`)

        if (!res.data.success) {
            throw new Error(res.data.message);
        }

        const partidosObject: Partido[] = res.data.data.map((candidato) => {
            const partido: Partido = {
                id: candidato.id_cand,
                candidatos: [
                    {
                        name: candidato.nom_can,
                        img: candidato.img_can,
                        cargo: candidato.cargo_can
                    },
                    {
                        name: candidato.nom_can2,
                        img: candidato.img_can2,
                        cargo: candidato.cargo_can2
                    },
                ],
                eslogan: candidato.eslogan_can,
                num_votos: candidato.num_votos
            }
            return partido
        })

        return {
            partidos: partidosObject
        }
    } catch (error) {
        console.error(error)
        return {
            partidos: null
        }
    }
}


export { getPartidos }