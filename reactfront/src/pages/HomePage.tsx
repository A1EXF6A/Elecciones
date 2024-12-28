import { FC, useState, useEffect } from 'react';
import { NoticiaCorta } from '../util/models/newsType';
import { getNoticiasFavoritas } from '../util/news';
import { PropuestaCorta } from '../util/models/propuestaType';
import { getPropuestasFavoritas } from '../util/propuestas';

const Home: FC = () => {
    const [noticiasFav, setNoticiasFav] = useState<NoticiaCorta[]>([]);
    const [propuestasFav, setPropuestasFav] = useState<PropuestaCorta[]>([]);

    useEffect(() => {
        const getNoticias = async () => {
            const { noticias } = await getNoticiasFavoritas();

            if (noticias) {
                setNoticiasFav(noticias);
            }
        }

        const getPropuestas = async () => {
            const { propuestas } = await getPropuestasFavoritas();

            if (propuestas) {
                setPropuestasFav(propuestas)
            }
        }

        getNoticias();
        getPropuestas();
    }, [])

    return (
        <div>
            <h2>Noticias Favoritas</h2>
            <ul>
                {noticiasFav.length === 0 ?
                    <h1>No existen noticias favoritas</h1> :
                    noticiasFav.map((noticia) => (
                        <li key={noticia.id}>{noticia.titulo}</li>
                    ))
                }
            </ul>
            <h2>Propuestas favoritas</h2>
            <ul>
                {propuestasFav.length === 0 ?
                    <h1>No existen propuestas favoritas</h1> :
                    propuestasFav.map((propuesta) => (
                        <li key={propuesta.id}>{propuesta.titulo}</li>
                    ))
                }
            </ul>
        </div>

    );
};
export { Home };