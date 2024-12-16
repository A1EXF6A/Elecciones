import React, { useState, useEffect } from "react";
import axios from "axios";
import CandidatoList from "../../components/propuestas/CandidatoList";
import PropuestaList from "../../components/propuestas/PropuestaList";
import PubProFilter from "../../components/propuestas/PubProFilter";
import EditModal from "./EditModal";
import './Propuestas.css';

const URI = "http://localhost:8000/api/propuestas/";

interface Propuesta {
    id: number;
    nom_cand: string;
    inf_pro: string;
    pub_pro: string;
    nom_pro: string;
}

const CompShowPropuestas = () => {
    const [propuestas, setPropuestas] = useState<Propuesta[]>([]);
    const [filteredPropuestas, setFilteredPropuestas] = useState<Propuesta[]>([]);
    const [error, setError] = useState<string>("");
    const [selectedCandidato, setSelectedCandidato] = useState<string | null>(null);
    const [pubProOptions, setPubProOptions] = useState<string[]>([]);
    const [selectedPubPro, setSelectedPubPro] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [editingPropuesta, setEditingPropuesta] = useState<Propuesta | null>(null); // Estado para editar

    const itemsPerPage = 5;

    useEffect(() => {
        getPropuestas();
    }, []);

    const getPropuestas = async () => {
        try {
            const res = await axios.get(URI + 'ver');
            setPropuestas(res.data);
            setFilteredPropuestas(res.data);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error desconocido");
        }
    };

    const handleCandidatoClick = (candidato: string) => {
        setSelectedCandidato(candidato);
        setSelectedPubPro("");

        const propuestasFiltradas = propuestas.filter(propuesta => propuesta.nom_cand === candidato);
        setFilteredPropuestas(propuestasFiltradas);
        setCurrentPage(1);

        const uniquePubProOptions = Array.from(
            new Set(propuestasFiltradas.flatMap(propuesta => propuesta.pub_pro.split(',').map(item => item.trim())))
        );
        setPubProOptions(uniquePubProOptions);
    };

    const handlePubProFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const pubPro = event.target.value;
        setSelectedPubPro(pubPro);

        const propuestasFiltradas = propuestas.filter(propuesta =>
            propuesta.nom_cand === selectedCandidato &&
            (pubPro === "" || propuesta.pub_pro.split(',').map(item => item.trim()).includes(pubPro))
        );
        setFilteredPropuestas(propuestasFiltradas);
        setCurrentPage(1);
    };

    const handleEditPropuesta = (propuesta: Propuesta) => {
        setEditingPropuesta(propuesta); // Establece la propuesta seleccionada para editar
    };

    const handleDeletePropuesta = async (propuestaId: number) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta propuesta?")) {
            try {
                await axios.delete(`${URI}${propuestaId}`);
                setPropuestas(propuestas.filter(propuesta => propuesta.id !== propuestaId));
                setFilteredPropuestas(filteredPropuestas.filter(propuesta => propuesta.id !== propuestaId));
            } catch (error) {
                console.error("Error al eliminar propuesta:", error);
            }
        }
    };

    const handleUpdatePropuesta = async (updatedPropuesta: Propuesta) => {
        try {
            await axios.put(`${URI}${updatedPropuesta.id}`, updatedPropuesta);
            // Actualizar el estado
            setPropuestas(propuestas.map(propuesta =>
                propuesta.id === updatedPropuesta.id ? updatedPropuesta : propuesta
            ));
            setFilteredPropuestas(filteredPropuestas.map(propuesta =>
                propuesta.id === updatedPropuesta.id ? updatedPropuesta : propuesta
            ));
            setEditingPropuesta(null); // Cerrar el modal
        } catch (error) {
            console.error("Error al actualizar propuesta:", error);
        }
    };

    const handleCloseEditModal = () => {
        setEditingPropuesta(null);
    };

    const uniqueCandidatos = Array.from(new Set(propuestas.map(propuesta => propuesta.nom_cand)));

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPropuestas = filteredPropuestas.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPropuestas.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container mt-5">
            <h1>Propuestas</h1>
            {error && <div className="alert alert-danger">{error}</div>}

            {!selectedCandidato ? (
                <CandidatoList
                    candidatos={uniqueCandidatos}
                    onCandidatoClick={handleCandidatoClick}
                />
            ) : (
                <>
                    <h2>{selectedCandidato}</h2>
                    <PubProFilter
                        pubProOptions={pubProOptions}
                        selectedPubPro={selectedPubPro}
                        onPubProChange={handlePubProFilterChange}
                    />
                    <button
                        className="btn btn-warning mb-3"
                        onClick={() => {
                            setSelectedCandidato(null);
                            setFilteredPropuestas(propuestas);
                            setCurrentPage(1);
                        }}
                    >
                        Regresar a la lista de candidatos
                    </button>
                </>
            )}

            <PropuestaList
                propuestas={currentPropuestas}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                onEdit={handleEditPropuesta}
                onDelete={handleDeletePropuesta}
            />

            {editingPropuesta && (
                <EditModal
                    propuesta={editingPropuesta}
                    onUpdate={handleUpdatePropuesta}
                    onClose={handleCloseEditModal}
                />
            )}
        </div>
    );
};

export default CompShowPropuestas;