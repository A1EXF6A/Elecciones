import React, { useState } from "react";
import { Link } from "react-router-dom";

// Definimos la interfaz para las funcionalidades
interface Funcionalidad {
    id: number;
    nombre: string;
    descripcion: string;
    ruta: string;
}

// Componente principal
const AdminPanel: React.FC = () => {
    // Estado para manejar la funcionalidad seleccionada
    const [selectedOption, setSelectedOption] = useState<string>("");

    // Lista de funcionalidades del administrador
    const funcionalidades: Funcionalidad[] = [
        { id: 1, nombre: "Crear listas de candidatos", descripcion: "Permite crear nuevas listas con nombre y descripción.", ruta: "/admin/candidatos" },
        { id: 2, nombre: "Agregar candidatos", descripcion: "Permite agregar candidatos a una lista y asignarles un cargo específico.", ruta: "/admin/agregar-candidatos" },
        { id: 3, nombre: "Agregar propuestas", descripcion: "Permite asignar propuestas a los candidatos.", ruta: "/admin/agregar-propuestas" },
        { id: 4, nombre: "Eliminar propuestas", descripcion: "Permite desactivar propuestas cambiando su estado a 'Inactiva'.", ruta: "/admin/eliminar-propuestas" },
        { id: 5, nombre: "Ver resultados de los votos", descripcion: "Permite ver los resultados de votos por lista.", ruta: "/admin/resultados" },
    ];

    // Manejar la selección de una opción del menú
    const handleMenuClick = (nombre: string) => {
        setSelectedOption(nombre);
    };

    return (
        <div style={styles.container}>
            <div style={styles.menuContainer}>
                {/* Menú Lateral */}
                <div style={styles.menu}>
                    <h2 style={styles.menuTitle}>Menú Administrador</h2>
                    <ul style={styles.menuList}>
                        {funcionalidades.map((funcionalidad) => (
                            <li
                                key={funcionalidad.id}
                                style={styles.menuItem}
                                onClick={() => handleMenuClick(funcionalidad.nombre)}
                            >
                                <Link to={funcionalidad.ruta} style={styles.link}>
                                    {funcionalidad.nombre}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contenido Principal */}
                <div style={styles.mainContent}>
                    <div style={styles.profile}>
                        <h3>Perfil Administrador</h3>
                        <p>Nombre: Administrador</p>
                        <p>Email: admin@dominio.com</p>
                    </div>
                    <div style={styles.content}>
                        <h2>Panel de Administración</h2>

                        {/* Mostrar contenido según la opción seleccionada */}
                        {selectedOption === "Crear listas de candidatos" && (
                            <div>
                                <h3>Crear listas de candidatos</h3>
                                <p>Aquí podrás crear nuevas listas con nombre y descripción.</p>
                            </div>
                        )}
                        {selectedOption === "Agregar candidatos" && (
                            <div>
                                <h3>Agregar candidatos</h3>
                                <p>Aquí podrás agregar candidatos a una lista y asignarles un cargo específico.</p>
                            </div>
                        )}
                        {selectedOption === "Agregar propuestas" && (
                            <div>
                                <h3>Agregar propuestas</h3>
                                <p>Aquí podrás asignar propuestas a los candidatos.</p>
                            </div>
                        )}
                        {selectedOption === "Eliminar propuestas" && (
                            <div>
                                <h3>Eliminar propuestas</h3>
                                <p>Aquí podrás desactivar propuestas cambiando su estado a 'Inactiva'.</p>
                            </div>
                        )}
                        {selectedOption === "Ver resultados de los votos" && (
                            <div>
                                <h3>Ver resultados de los votos</h3>
                                <p>Aquí podrás ver los resultados de votos por lista.</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

// Estilos en línea para la estructura
const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
        height: "100vh",
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
    linkHover: {
        backgroundColor: "#1abc9c",
    },
    mainContent: {
        flex: 1,
        padding: "20px",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
    },
    profile: {
        backgroundColor: "#ecf0f1",
        padding: "15px",
        borderRadius: "5px",
        marginBottom: "20px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    },
    content: {
        marginTop: "20px",
    },
    list: {
        listStyleType: "none",
        padding: 0,
    },
    listItem: {
        marginBottom: "15px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        backgroundColor: "#fff",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
    },
};

export default AdminPanel;
