type PropuestaCorta = {
    id: number;
    titulo: string;
}

type Propuesta = {
    id_not: number,
    titulo_not: string,
    des_not: string,
    favorita: boolean
}

export type { PropuestaCorta, Propuesta }