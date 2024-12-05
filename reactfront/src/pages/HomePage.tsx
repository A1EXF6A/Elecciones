import React, { useEffect } from 'react';

interface Candidates {
  id: number;
  name: string;
  description: string;
  imagenUrl: string;
}

const candidates: Candidates[] = [
  {
    id: 1,
    name: 'Mary Cruz',
    description: '""',
    imagenUrl: 'https://marycruzuta.com/assets/images/Mary.JPG',
  },
];

const candidates2: Candidates[] = [
  {
    id: 2,
    name: 'Sara Camac',
    description: '"Juntos por la UTA"',
    imagenUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiIoG11PZrPHsSn_ejJ5L6UbrD479KVL8AukumvaQoZZKaElbY9htIKKSGfht2MWFLPIkW9ugYva19sQ7wsnM_uZjkn-x6SXSQjH3pyySu_TMleLtTS_H_QB15Y279Xf9Tp8oU9WVmH30Q/s1600/agosto+16+del+011+230.jpg',
  }
];

const Home: React.FC = () => {
  useEffect(() => {
    // Script para TikTok
    const tiktokScript = document.createElement('script');
    tiktokScript.src = "https://www.tiktok.com/embed.js";
    tiktokScript.async = true;
    document.body.appendChild(tiktokScript);

    return () => {
      document.body.removeChild(tiktokScript);
    };
  }, []);

  return (
    <div className="home-container">
      <h1 className="custom-header">¿Conoces a los futuros representantes de la UTA?</h1>
      <h2 className="sub2">Entérate más sobre ellos</h2>
      <div className="split-container">

        {/* Columna izquierda */}
        <div className="column">
          <div className="image-row">
            <img src="https://marycruzuta.com/assets/images/logo.png" alt="Logo Mary Cruz" className="side-image" />

            <div className="candidate">
              <img src={candidates[0].imagenUrl} alt={candidates[0].name} className="candidate1-image central-image" />
              <h2>{candidates[0].name}</h2>
              <p><strong>Candidata a Rectora</strong> </p>
              <p>{candidates[0].description}</p>
            </div>

            <img src="https://gitlab.com/alexjavier/img_mc/-/raw/main/unidos.PNG" alt="Logo Unidos" className="side-image" />
          </div>

          <div className="video-container">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/3NnogU08nK4"
              title="Video de YouTube"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Facebook embed simplificado para Mary Cruz */}
          <div className="social-media">
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61565950187878&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
              width="340"
              height="500"
              style={{
                border: 'none',
                overflow: 'hidden',
                display: 'block',
                margin: '20px auto'
              }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            />
          </div>
        </div>

        {/* Columna derecha */}
        <div className="column">
          <div className="candidate">
            <img src={candidates2[0].imagenUrl} alt={candidates2[0].name} className="candidate-image" />
            <h2>{candidates2[0].name}</h2>
            <p><strong>Candidata a Rectora</strong> </p>
            <p>{candidates2[0].description}</p>
          </div>

          <div className="tiktok-container" dangerouslySetInnerHTML={{
            __html: `
            <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@saracamacho.estrada/video/7430528760941759750" data-video-id="7430528760941759750" style="max-width: 605px; min-width: 325px;">
              <section>
                <a target="_blank" title="@saracamacho.estrada" href="https://www.tiktok.com/@saracamacho.estrada?refer=embed">@saracamacho.estrada</a> ¡Vamos juntos por el cambio!
              </section>
            </blockquote>
          ` }}></div>

          {/* Facebook embed para Sara Camacho */}
          <div className="social-media">
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/saracamacho.estrada&tabs=timeline&width=340&height=500"
              width="340"
              height="500"
              style={{
                border: 'none',
                overflow: 'hidden',
                display: 'block',
                margin: '20px auto'
              }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export { Home };