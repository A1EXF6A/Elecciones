import { useCallback, useEffect, useState } from 'react';
import NoticiasCard from '../components/noticiasCard/NoticiasCard';

const NewsPage = () => {
    const [isReadFirst, setIsReadFirst] = useState(false);
    const [isReadSecond, setIsReadSecond] = useState(false);

    const newsList = [
        {
            title: 'Elecciones en UTA 2024',
            date: 'Publicado el 29 de octubre de 2024',
            content: 'Las elecciones para las autoridades de la Universidad Técnica de Ambato son un evento fundamental en el calendario académico de la institución, ya que determinan quiénes serán los responsables de guiar y administrar la universidad en los próximos años. Este proceso electoral no solo involucra a los estudiantes, sino también a los docentes y al personal administrativo, quienes tienen la oportunidad de expresar su voz y elegir a sus representantes. En estas elecciones, se eligen diversas autoridades, entre las cuales se encuentran el rector, los vicerrectores, decanos de facultades y miembros del consejo universitario. Cada uno de estos cargos desempeña un papel crucial en la toma de decisiones, el desarrollo de políticas académicas y la gestión de recursos. Por lo tanto, es vital que los electores se informen sobre los candidatos, sus propuestas y su trayectoria académica y profesional. El proceso electoral se lleva a cabo siguiendo un marco normativo establecido por la ley de educación superior y los reglamentos internos de la universidad. La Comisión Electoral es la encargada de organizar y supervisar el proceso, garantizando que se realice de manera transparente y justa. Durante la campaña, los candidatos tienen la oportunidad de presentar sus propuestas y programas a través de debates, foros y otras actividades de divulgación. Además, se implementan mecanismos para asegurar que las elecciones se desarrollen en un ambiente de respeto y libertad, promoviendo la participación activa de toda la comunidad universitaria.',
            img: 'public/assets/news1.png',
        },
        {
            title: 'Cumbre de Innovación',
            date: 'Publicado el 24 de octubre de 2024',
            content: 'La "Cumbre de Innovación" es un evento destacado en el ámbito de la innovación y el emprendimiento que reúne a líderes, emprendedores, académicos y expertos de diversas industrias para compartir conocimientos, experiencias y nuevas ideas. Este año, la cumbre se llevará a cabo en un formato híbrido, permitiendo la participación tanto presencial como virtual, lo que facilita el acceso a un público más amplio. El evento se centrará en la exploración de tendencias emergentes, tecnologías disruptivas y modelos de negocio innovadores que están dando forma al futuro. Durante la cumbre, se llevarán a cabo paneles de discusión, talleres interactivos y sesiones de networking, donde los asistentes podrán conectar con profesionales de diferentes sectores, intercambiar ideas y fomentar colaboraciones. Entre los temas destacados de este año se encuentran la inteligencia artificial, la sostenibilidad, la digitalización de procesos y el impacto social del emprendimiento. Expertos de renombre ofrecerán charlas magistrales, compartiendo sus visiones sobre cómo la innovación puede ser un motor de cambio y desarrollo en nuestras comunidades. Además, la cumbre contará con una feria de emprendimiento, donde startups emergentes tendrán la oportunidad de presentar sus proyectos a inversores potenciales y recibir retroalimentación de un panel de expertos. Esta iniciativa no solo promueve el desarrollo de nuevas empresas, sino que también resalta la importancia de la innovación como un pilar fundamental para el crecimiento económico. El evento está diseñado para inspirar y empoderar a los asistentes, brindando herramientas y recursos para que puedan implementar ideas innovadoras en sus propios contextos.',
            img: 'public/assets/news2.png',
        },
        {
            title: 'La educación superior de la UTA y su impacto en la sociedad',
            date: 'Publicado el 13 de octubre de 2024',
            content: 'La educación superior es un pilar fundamental para el desarrollo individual y colectivo en las sociedades contemporáneas. Este nivel educativo, que abarca universidades, institutos técnicos y otros centros de formación avanzada, ofrece a los estudiantes no solo conocimientos especializados, sino también habilidades críticas que son esenciales para enfrentar los desafíos del mundo laboral actual. La importancia de la educación superior radica en su capacidad para promover la innovación, mejorar la calidad de vida y fomentar la cohesión social. Desde una perspectiva económica, los graduados de educación superior tienden a tener mayores oportunidades laborales y salarios más altos en comparación con aquellos que solo tienen educación secundaria. Este fenómeno no solo beneficia a los individuos, sino que también contribuye al crecimiento económico de los países, ya que una fuerza laboral educada puede impulsar la productividad y la competitividad. Además, las universidades y otras instituciones de educación superior juegan un papel crucial en la investigación y el desarrollo, generando nuevos conocimientos y tecnologías que pueden transformar sectores enteros, desde la salud hasta la ingeniería y las ciencias sociales. A nivel social, la educación superior fomenta la inclusión y la equidad. A través de programas de becas y apoyo, las universidades pueden ayudar a cerrar la brecha educativa entre diferentes grupos socioeconómicos. La diversidad en las aulas también enriquece el aprendizaje, permitiendo que los estudiantes interactúen con diferentes perspectivas y experiencias, lo que es esencial en un mundo globalizado.',
            img: 'public/assets/news3.png',
        },
        {
            title: 'Colecciones disenadas por estudiantes dela uta se mostraran a nivel nacional',
            date: 'Publicado el 21 de agosto de 2024',
            content: 'Las colecciones diseñadas por estudiantes de la Universidad Tecnológica de Aguascalientes (UTA) han sido reconocidas a nivel nacional, destacando su creatividad e innovación en el ámbito del diseño. Este reconocimiento se produce en el contexto de la Expo UTA 2024, un evento que reunió a más de 3,000 estudiantes de secundaria de la región, quienes tuvieron la oportunidad de conocer la oferta académica de la universidad y explorar diversas carreras​. Los proyectos destacados incluyen propuestas que abordan temas de seguridad y sostenibilidad. Entre ellos se encuentran "Always Safe" y "Safe Glass", que se enfocan en la seguridad personal y la detección de sustancias nocivas en bebidas, respectivamente. Estos proyectos fueron seleccionados entre los 25 mejores en el Concurso Nacional de Innovación y Emprendimiento para Universidades Tecnológicas y Politécnicas. El rector de la UTA, Armando López Campa, subrayó la importancia de estas iniciativas, no solo por su calidad, sino también porque brindan a los estudiantes la oportunidad de adquirir habilidades empresariales y de resiliencia emocional al competir en un contexto nacional. Los estudiantes que participaron en estos proyectos provienen de diversas carreras, lo que refleja el enfoque multidisciplinario de la UTA en la educación superior. Este tipo de exposiciones y concursos son fundamentales para fomentar el espíritu emprendedor entre los jóvenes y promover la innovación en el país​.',
            img: 'public/assets/news4.png',
        },
    ];

    useEffect(() => {
        // Marcar las noticias leídas desde el localStorage al iniciar
        const firstReadStatus = localStorage.getItem(newsList[0].title) === 'true';
        const secondReadStatus = localStorage.getItem(newsList[1].title) === 'true';
        setIsReadFirst(firstReadStatus);
        setIsReadSecond(secondReadStatus);
    }, []);

    const handleMarkAsRead = useCallback((title: string) => {
        if (title === newsList[0].title) {
            setIsReadFirst(true);
            localStorage.setItem(newsList[0].title, 'true');
        } else if (title === newsList[1].title) {
            setIsReadSecond(true);
            localStorage.setItem(newsList[1].title, 'true');
        }
    }, [newsList]);

    return (
        <div className="news-container">
            <h1>Noticias Recientes</h1>
            <div className="news-list">
                <NoticiasCard
                    newsItem={newsList[0]}
                    isRead={isReadFirst}
                    handleMarkAsRead={handleMarkAsRead}
                />
                <NoticiasCard
                    newsItem={newsList[1]}
                    isRead={isReadSecond}
                    handleMarkAsRead={handleMarkAsRead}
                />
                <NoticiasCard
                    newsItem={newsList[2]}
                    isRead={isReadSecond}
                    handleMarkAsRead={handleMarkAsRead}
                />
                <NoticiasCard
                    newsItem={newsList[3]}
                    isRead={isReadSecond}
                    handleMarkAsRead={handleMarkAsRead}
                />
            </div>
        </div>
    );
};

export { NewsPage };
