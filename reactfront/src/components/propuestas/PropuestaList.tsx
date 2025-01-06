import React from 'react';
import './PropuestaList.css';

interface Propuesta {
    id_pro: number;
    nom_cand: string;
    des_pro: string;
    pub_pro: string;
    nom_pro: string;
}

interface PropuestaListProps {
    propuestas: Propuesta[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onEdit: (propuesta: Propuesta) => void;
    onDelete: (propuestaId: number) => void;
}

const PropuestaList: React.FC<PropuestaListProps> = ({
    propuestas,
    currentPage,
    totalPages,
    onPageChange,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="propuesta-list">
            {propuestas.map((propuesta) => (
                <div key={propuesta.id_pro} className="propuesta-item">
                    <h3>{propuesta.nom_pro}</h3>
                    <p>{propuesta.des_pro}</p>
                    <div className="propuesta-actions">
                        <button
                            className="btn btn-warning"
                            onClick={() => onEdit(propuesta)}
                        >
                            Editar
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => onDelete(propuesta.id_pro)}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            ))}

            <div className="pagination">
                {[...Array(totalPages)].map((_, pageIndex) => (
                    <button
                        key={pageIndex}
                        className={`btn ${pageIndex + 1 === currentPage ? "btn-primary" : "btn-secondary"}`}
                        onClick={() => onPageChange(pageIndex + 1)}
                    >
                        {pageIndex + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PropuestaList;
