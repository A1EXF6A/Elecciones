import { useState, useEffect } from 'react';
import { NoticiaCorta } from '../util/models/newsType';
import { PropuestaCorta } from '../util/models/propuestaType';
import { getNoticiasFavoritas } from '../util/news';
import { getPropuestasFavoritas } from '../util/propuestas';

interface Item {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const eventos: Item[] = [
  { id: 1, title: 'Evento 1', description: 'Descripción de evento 1', imageUrl: 'https://fisei.uta.edu.ec/v4.0/images/Noticias/congreso.jpg' },
  { id: 2, title: 'Evento 2', description: 'Descripción de evento 2', imageUrl: 'https://fisei.uta.edu.ec/v4.0/images/Noticias/OfertaAcademicaPregrado2024/OfertaAcademicaPregrado.png' },
  { id: 3, title: 'Evento 3', description: 'Descripción de evento 3', imageUrl: 'https://fisei.uta.edu.ec/v4.0/images/Noticias/Aranceles2024/BannerAranceles2024.png' },
];

const Home: React.FC = () => {
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
    <div className="home-container">
      <h1 className="custom-header">Descubre más sobre nuestras actividades</h1>

      <section className="favorites-section">
        <h2>Noticias Favoritas</h2>
        <div className="items-container">
          {noticiasFav.map((noticia) => (
            <div key={noticia.id} className="item-card">
              <img src={noticia.imgUrl} alt={noticia.titulo} className="item-image" />
              <h3>{noticia.titulo}</h3>
              <p>{noticia.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="favorites-section">
        <h2>Eventos Favoritos</h2>
        <div className="items-container">
          {eventos.map((evento) => (
            <div key={evento.id} className="item-card">
              <img src={evento.imageUrl} alt={evento.title} className="item-image" />
              <h3>{evento.title}</h3>
              <p>{evento.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="favorites-section">
        <h2>Propuestas Favoritas</h2>
        <div className="items-container">
          {propuestasFav.map((propuesta) => (
            <div key={propuesta.id} className="item-card">
              <img src={propuesta.imgUrl} alt={propuesta.titulo} className="item-image" />
              <h3>{propuesta.titulo}</h3>
              <p>{propuesta.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export { Home };