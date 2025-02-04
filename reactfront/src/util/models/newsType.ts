type NoticiaCorta = {
    id: number;
    titulo: string;
    description: string;
    imgUrl: string;
}

type Noticia = {
    id_not: number,
    titulo_not: string,
    des_not: string,
    favorita: boolean,
    img_not: string,
}

export type { NoticiaCorta, Noticia }