import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Evento {
    id_eve: number;
    nom_eve: string;
    desc_eve: string;
    fec_eve: string;
}

const EventosList: React.FC = () => {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [filteredEventos, setFilteredEventos] = useState<Evento[]>([]);
    const [error, setError] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [eventsPerPage] = useState<number>(4);

    const [nombreFiltro, setNombreFiltro] = useState<string>('');
    const [fechaFiltro, setFechaFiltro] = useState<string>('');
    const [mesFiltro, setMesFiltro] = useState<string>('');

    useEffect(() => {
        const obtenerEventos = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/eventos/eve');
                const eventosOrdenados = response.data.sort((a: Evento, b: Evento) => {
                    const fechaA = new Date(a.fec_eve);
                    const fechaB = new Date(b.fec_eve);
                    return fechaA.getTime() - fechaB.getTime();
                });
                setEventos(eventosOrdenados);
                setFilteredEventos(eventosOrdenados);
            } catch (error) {
                setError('Hubo un error al obtener los eventos.');
            }
        };

        obtenerEventos();
    }, []);

    useEffect(() => {
        let eventosFiltrados = [...eventos];

        if (nombreFiltro) {
            eventosFiltrados = eventosFiltrados.filter((evento) =>
                evento.nom_eve.toLowerCase().includes(nombreFiltro.toLowerCase())
            );
        }

        if (fechaFiltro) {
            eventosFiltrados = eventosFiltrados.filter(
                (evento) => evento.fec_eve === fechaFiltro
            );
        }

        if (mesFiltro) {
            eventosFiltrados = eventosFiltrados.filter((evento) => {
                const mesEvento = new Date(evento.fec_eve).getMonth() + 1;
                return mesEvento === parseInt(mesFiltro, 10);
            });
        }

        setFilteredEventos(eventosFiltrados);
        setCurrentPage(1);
    }, [nombreFiltro, fechaFiltro, mesFiltro, eventos]);

    const borrarFiltros = () => {
        setNombreFiltro('');
        setFechaFiltro('');
        setMesFiltro('');
        setFilteredEventos(eventos);
        setCurrentPage(1);
    };

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = filteredEventos.slice(indexOfFirstEvent, indexOfLastEvent);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredEventos.length / eventsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Eventos</h2>

            {error && <p style={styles.error}>{error}</p>}

            <div style={styles.filters}>
                <input
                    type="text"
                    placeholder="Filtrar por nombre"
                    value={nombreFiltro}
                    onChange={(e) => setNombreFiltro(e.target.value)}
                    style={styles.filterInput}
                />
                <input
                    type="date"
                    placeholder="Filtrar por fecha"
                    value={fechaFiltro}
                    onChange={(e) => setFechaFiltro(e.target.value)}
                    style={styles.filterInput}
                />
                <input
                    type="number"
                    placeholder="Filtrar por mes (1-12)"
                    min="1"
                    max="12"
                    value={mesFiltro}
                    onChange={(e) => setMesFiltro(e.target.value)}
                    style={styles.filterInput}
                />
                <button onClick={borrarFiltros} style={styles.clearButton}>
                    Borrar Filtros
                </button>
            </div>

            <div style={styles.grid}>
                {currentEvents.length === 0 ? (
                    <p>No se encontraron eventos.</p>
                ) : (
                    currentEvents.map((evento) => (
                        <div key={evento.id_eve} style={styles.eventItem}>
                            <h3 style={styles.eventTitle}>{evento.nom_eve}</h3>
                            <p style={styles.eventDescription}>{evento.desc_eve}</p>
                            <p style={styles.eventDate}>
                                <strong>Fecha:</strong> {evento.fec_eve}
                            </p>
                        </div>
                    ))
                )}
            </div>

            <div style={styles.pagination}>
                <button onClick={prevPage} disabled={currentPage === 1} style={styles.paginationButton}>
                    Anterior
                </button>
                <span style={styles.pageNumber}>Página {currentPage}</span>
                <button
                    onClick={nextPage}
                    disabled={currentPage === Math.ceil(filteredEventos.length / eventsPerPage)}
                    style={styles.paginationButton}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default EventosList;

const styles = {
    container: {
        padding: '20px',
        maxWidth: '100%',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        minHeight: '100vh',
    },
    title: {
        textAlign: 'center' as const,
        fontSize: '28px',
        color: '#2c3e50',
        marginBottom: '30px',
        fontWeight: '600',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)', // 2 columnas
        gap: '20px', // Espacio entre columnas y filas
        padding: '0',
        margin: '0',
    },
    eventItem: {
        backgroundColor: '#f9fafb',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'pointer',
    },
    eventTitle: {
        fontSize: '22px',
        color: '#34495e',
        fontWeight: '500',
        marginBottom: '10px',
    },
    eventDescription: {
        fontSize: '16px',
        color: '#7f8c8d',
        marginBottom: '10px',
    },
    eventDate: {
        fontSize: '14px',
        color: '#16a085',
        fontStyle: 'italic',
    },
    error: {
        color: '#e74c3c',
        textAlign: 'center' as const,
        marginBottom: '30px',
        fontSize: '18px',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30px',
    },
    paginationButton: {
        backgroundColor: '#2980b9',
        color: '#ffffff',
        border: 'none',
        padding: '12px 25px',
        margin: '0 10px',
        cursor: 'pointer',
        borderRadius: '30px',
        fontSize: '16px',
        fontWeight: '500',
        transition: 'background-color 0.3s, transform 0.3s',
    },
    paginationButtonDisabled: {
        backgroundColor: '#b0bec5',
        cursor: 'not-allowed',
    },
    paginationButtonHover: {
        backgroundColor: '#3498db',
        transform: 'scale(1.05)',
    },
    pageNumber: {
        fontSize: '18px',
        color: '#34495e',
        fontWeight: '400',
    },
    filters: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '20px',
    },
    filterInput: {
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '14px',
    },
    clearButton: {
        backgroundColor: '#2980b9',
        color: '#ffffff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        fontSize: '14px',
        cursor: 'pointer',
        fontWeight: '600',
        transition: 'background-color 0.3s',
    },

};
