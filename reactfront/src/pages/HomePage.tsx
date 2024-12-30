import React from 'react';

interface Item {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const noticias: Item[] = [
  { id: 1, title: 'Noticia 1', description: 'Descripción de noticia 1', imageUrl: 'https://via.placeholder.com/150' },
  { id: 2, title: 'Noticia 2', description: 'Descripción de noticia 2', imageUrl: 'https://via.placeholder.com/150' },
  { id: 3, title: 'Noticia 3', description: 'Descripción de noticia 3', imageUrl: 'https://via.placeholder.com/150' },
];

const eventos: Item[] = [
  { id: 1, title: 'Evento 1', description: 'Descripción de evento 1', imageUrl: 'https://via.placeholder.com/150' },
  { id: 2, title: 'Evento 2', description: 'Descripción de evento 2', imageUrl: 'https://via.placeholder.com/150' },
  { id: 3, title: 'Evento 3', description: 'Descripción de evento 3', imageUrl: 'https://via.placeholder.com/150' },
];

const propuestas: Item[] = [
  { id: 1, title: 'Propuesta 1', description: 'Descripción de propuesta 1', imageUrl: 'https://via.placeholder.com/150' },
  { id: 2, title: 'Propuesta 2', description: 'Descripción de propuesta 2', imageUrl: 'https://via.placeholder.com/150' },
  { id: 3, title: 'Propuesta 3', description: 'Descripción de propuesta 3', imageUrl: 'https://via.placeholder.com/150' },
];

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1 className="custom-header">Descubre más sobre nuestras actividades</h1>

      <section className="favorites-section">
        <h2>Noticias Favoritas</h2>
        <div className="items-container">
          {noticias.map((noticia) => (
            <div key={noticia.id} className="item-card">
              <img src={noticia.imageUrl} alt={noticia.title} className="item-image" />
              <h3>{noticia.title}</h3>
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
          {propuestas.map((propuesta) => (
            <div key={propuesta.id} className="item-card">
              <img src={propuesta.imageUrl} alt={propuesta.title} className="item-image" />
              <h3>{propuesta.title}</h3>
              <p>{propuesta.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export { Home };
