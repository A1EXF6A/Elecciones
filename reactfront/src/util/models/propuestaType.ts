type PropuestaCorta = {
    id: number;
    titulo: string;
    description: string;
    imgUrl: string;
}

type Propuesta = {
    id_pro: number,
    titulo_pro: string,
    des_pro: string,
    favorita: boolean,
    img_pro: string,
}

export type { PropuestaCorta, Propuesta }