import axios from "axios";
import { Partido } from "./models/PartidoModel";

const URI = "http://localhost:8000/api/candidatos";

const Sara = {
    candidatos: [
        {
            id: 1,
            name: 'SARA CAMACHO',
            cargo: 'RECTORA',
            img: 'https://i.imgur.com/7Z5Yfl4.png'
        },
        {
            id: 2,
            name: 'ALBERTO RIOS',
            cargo: 'VICERRECTORADO',
            img: 'https://i.imgur.com/TxAyc4f.png'
        }
    ],
    eslogan: 'Juntos por el cambio'
}

const Mary = {
    candidatos: [
        {
            id: 1,
            name: 'MARY CRUZ',
            cargo: 'RECTORA',
            img: 'https://www.marycruzuta.com/assets/images/Mary.JPG'
        },
        {
            id: 2,
            name: 'JUAN PAREDES',
            cargo: 'VICERRECTORADO DE INVESTIGACIÓN',
            img: 'https://www.marycruzuta.com/assets/images/Juan.JPG'
        }
    ],
    eslogan: 'Juntos por el cambio'
}

type CandidatoEnCrudo = {
    id_cand: number,
    nom_can: string,
    cargo_can: string,
    img_can: string,
    nom_can2: string,
    cargo_can2: string,
    img_can2: string,
    eslogan_can: string,
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
                eslogan: candidato.eslogan_can
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


export { Sara, Mary, getPartidos }