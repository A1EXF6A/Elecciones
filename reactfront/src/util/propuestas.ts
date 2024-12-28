import axios, { AxiosError } from "axios";
import { Propuesta, PropuestaCorta } from "./models/propuestaType";

const URI = "http://localhost:8000/api/propuestas";

const getPropuestasFavoritas = async (): Promise<{ propuestas: PropuestaCorta[] | null }> => {
    try {
        const res = await axios.get<{
            message: string,
            data: Propuesta[]
        }>(`${URI}/favoritas`)

        console.log(res)
        if (res.data.message) {
            console.log('error')
            throw new Error(res.data.message);
        }

        const propuestasObject: PropuestaCorta[] = res.data.data.map((propuesta) => {
            const propuestaCorta: PropuestaCorta = {
                id: propuesta.id_not,
                titulo: propuesta.titulo_not
            }
            return propuestaCorta
        })

        return { propuestas: propuestasObject }
    } catch (error) {
        console.error((error as AxiosError<{
            message: string
        }>).response?.data.message)
        return { propuestas: null }
    }
}

export { getPropuestasFavoritas }