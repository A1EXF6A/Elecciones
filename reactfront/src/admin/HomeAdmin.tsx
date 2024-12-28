import { useState } from "react";
import { Link } from "react-router-dom";

import AgregarPropuestas from "./AgregarPropuestas";
import AgregarCandidato from "./AgregarCandidato";
import AgregarEvento from "./AgregarEvento";
import CompShowPropuestas from "../pages/propuestas/Propuestas";
import ConfigPage from "../pages/ConfigPage";
import ResultadosPage from "../pages/ResultadosPage";

interface Funcionalidad {
    id: number;
    nombre: string;
    descripcion: string;
}

const AdminPanel: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>("Configuración de la página");

    const funcionalidades: Funcionalidad[] = [
        { id: 1, nombre: "Agregar candidatos", descripcion: "Permite agregar candidatos a una lista y asignarles un cargo específico." },
        { id: 2, nombre: "Agregar propuestas", descripcion: "Permite asignar propuestas a los candidatos." },
        { id: 3, nombre: "Ver propuestas", descripcion: "Permite desactivar propuestas cambiando su estado a 'Inactiva'." },
        { id: 4, nombre: "Ver resultados de los votos", descripcion: "Permite ver los resultados de votos por lista." },
        { id: 5, nombre: "Agregar evento", descripcion: "Permite añadir un nuevo evento al sistema." },
        { id: 6, nombre: "Agregar noticia", descripcion: "Permite añadir un nuevo evento al sistema." },
        { id: 7, nombre: "Administrar sugerencias", descripcion: "Permite administrar las sugerencias." },
        { id: 8, nombre: "Configuración de la página", descripcion: "Permite añadir un nuevo evento al sistema." },
    ];

    const handleMenuClick = (nombre: string) => {
        setSelectedOption(nombre);
        console.log(nombre);
    };

    const handleLogout = () => {
        localStorage.removeItem('adminId')
        console.log('Sesión cerrada')
    }

    return (
        <div style={styles.container}>
            <div style={styles.menuContainer}>
                <div style={styles.menu}>
                    <h2 style={styles.menuTitle}>Menú Administrador</h2>
                    <ul style={styles.menuList}>
                        {funcionalidades.map((funcionalidad) => (
                            <li
                                key={funcionalidad.id}
                                style={styles.menuItem}
                                onClick={() => handleMenuClick(funcionalidad.nombre)}
                            >
                                <Link to="" style={styles.link}>
                                    {funcionalidad.nombre}
                                </Link>
                            </li>
                        ))}
                        <li
                            style={styles.menuItem}
                            onClick={() => handleLogout()}
                        >
                            <Link to="/login/new" style={styles.linkLogout}>
                                Cerrar Sesión
                            </Link>
                        </li>
                    </ul>
                </div>

                <div style={styles.mainContent}>
                    <div style={styles.content}>
                        <h2>Panel de Administración</h2>
                        {selectedOption === "Agregar candidatos" && (
                            <div>
                                <AgregarCandidato />
                            </div>
                        )}
                        {selectedOption === "Agregar propuestas" && (
                            <div>
                                <AgregarPropuestas />
                            </div>
                        )}
                        {selectedOption === "Ver propuestas" && (
                            <div>
                                <CompShowPropuestas />
                            </div>
                        )}
                        {selectedOption === "Ver resultados de los votos" && (
                            <ResultadosPage />
                        )}
                        {selectedOption === "Agregar evento" && (
                            <div>
                                <AgregarEvento />
                            </div>
                        )}
                        {selectedOption === "Administrar sugerencias" && (
                            <div>
                                <CompShowPropuestas />
                            </div>
                        )}
                        {selectedOption === "Configuración de la página" && (
                            <div>
                                <ConfigPage />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
    },
    menuContainer: {
        display: "flex",
        width: "100%",
    },
    menu: {
        backgroundColor: "#2c3e50",
        width: "250px",
        padding: "20px",
        height: "100%",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
    },
    menuTitle: {
        color: "#fff",
        marginBottom: "20px",
        fontSize: "22px",
        textAlign: "center",
    },
    menuList: {
        listStyleType: "none",
        padding: 0,
        marginTop: "20px",
    },
    menuItem: {
        marginBottom: "10px",
    },
    link: {
        color: "#fff",
        textDecoration: "none",
        fontSize: "16px",
        display: "block",
        padding: "10px",
        borderRadius: "5px",
        backgroundColor: "#34495e",
        transition: "background-color 0.3s",
    },
    linkLogout: {
        color: "#fff",
        textDecoration: "none",
        fontSize: "16px",
        display: "block",
        padding: "10px",
        borderRadius: "5px",
        backgroundColor: "#e74c3c",
        transition: "background-color 0.3s",
    },
    mainContent: {
        flex: 1,
        padding: "20px",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
    },
    content: {
        marginTop: "20px",
    },
};

export default AdminPanel;
