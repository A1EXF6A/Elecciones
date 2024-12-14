import React from "react";

// Definimos la interfaz para las funcionalidades
interface Funcionalidad {
    id: number;
    nombre: string;
    descripcion: string;
}

// Componente principal
const AdminPanel: React.FC = () => {
    // Lista de funcionalidades del administrador
    const funcionalidades: Funcionalidad[] = [
        { id: 1, nombre: "Crear listas de candidatos", descripcion: "Permite crear nuevas listas con nombre y descripción." },
        { id: 2, nombre: "Agregar candidatos", descripcion: "Permite agregar candidatos a una lista y asignarles un cargo específico." },
        { id: 3, nombre: "Agregar propuestas", descripcion: "Permite asignar propuestas a los candidatos." },
        { id: 4, nombre: "Eliminar propuestas", descripcion: "Permite desactivar propuestas cambiando su estado a 'Inactiva'." },
        { id: 5, nombre: "Ver resultados de los votos", descripcion: "Permite ver los resultados de votos por lista." },
    ];

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Panel de Administrador</h2>
            <ul style={styles.list}>
                {funcionalidades.map((funcionalidad) => (
                    <li key={funcionalidad.id} style={styles.listItem}>
                        <h3>{funcionalidad.nombre}</h3>
                        <p>{funcionalidad.descripcion}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Estilos inline para el componente
const styles: { [key: string]: React.CSSProperties } = {
    container: {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
    },
    title: {
        textAlign: "center",
        marginBottom: "20px",
        fontSize: "24px",
        color: "#333",
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
