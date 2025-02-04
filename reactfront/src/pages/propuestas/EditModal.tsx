import React, { useState } from "react";

interface Propuesta {
    id_pro: number;
    nom_cand: string;
    des_pro: string;
    pub_pro: string;
    nom_pro: string;
}

interface EditModalProps {
    propuesta: Propuesta;
    onUpdate: (updatedPropuesta: Propuesta) => void;
    onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ propuesta, onUpdate, onClose }) => {
    const [formState, setFormState] = useState(propuesta);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate(formState);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Editar Propuesta</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Nombre:
                        <input
                            type="text"
                            name="nom_pro"
                            value={formState.nom_pro}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Información:
                        <textarea
                            name="inf_pro"
                            value={formState.des_pro}
                            onChange={handleChange}
                        ></textarea>
                    </label>
                    <label>
                        Publicado:
                        <input
                            type="text"
                            name="pub_pro"
                            value={formState.pub_pro}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit" className="btn btn-primary">Guardar</button>
                    <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                </form>
            </div>
        </div>
    );
};

export default EditModal;