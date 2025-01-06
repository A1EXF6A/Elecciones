type NoticiaCorta = {
    id: number;
    titulo: string;
}

type Noticia = {
    id_not: number,
    titulo_not: string,
    des_not: string,
    favorita: boolean
}

export type { NoticiaCorta, Noticia }