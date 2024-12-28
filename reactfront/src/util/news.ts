import axios from "axios";
import { NoticiaCorta, Noticia } from "./models/newsType";

const URI = "http://localhost:8000/api/noticias";

const getNoticiasFavoritas = async (): Promise<{ noticias: NoticiaCorta[] | null }> => {
    try {
        const res = await axios.get<{
            message: string,
            data: Noticia[]
        }>(`${URI}/favoritas`)

        if (res.data.message) {
            console.log('error')
            throw new Error(res.data.message);
        }

        const noticiasObject: NoticiaCorta[] = res.data.data.map((noticia) => {
            const noticiaCorta: NoticiaCorta = {
                id: noticia.id_not,
                titulo: noticia.titulo_not
            }
            return noticiaCorta
        })

        return { noticias: noticiasObject }
    } catch (error) {
        console.error(error)
        return { noticias: null }
    }
}

export { getNoticiasFavoritas }