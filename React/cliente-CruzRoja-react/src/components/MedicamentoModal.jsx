import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const MedicamentoModal = ({ 
  isOpen, 
  editMode, 
  currentMedicamento, 
  onClose, 
  onSave 
}) => {
  const [medicamento, setMedicamento] = React.useState(currentMedicamento || {
    nombre: "",
    descripcion: "",
    dosis: "",
    medida: "",
    cantidad: 0,
    caducidad: "",
    precio: 0,
    imagen: "",
  });

  React.useEffect(() => {
    if (currentMedicamento) {
      setMedicamento(currentMedicamento);
    }
  }, [currentMedicamento]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedicamento({ ...medicamento, [name]: value });
  };

  const handleSave = () => {
    onSave(medicamento);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={editMode ? "Editar Medicamento" : "Agregar Medicamento"}
      className="modal"
      overlayClassName="overlay"
    >
      <h3>{editMode ? "Editar Medicamento" : "Agregar Medicamento"}</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={medicamento.nombre}
          onChange={handleInputChange}
        />
        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={medicamento.descripcion}
          onChange={handleInputChange}
        />
        <label>Dosis:</label>
        <input
          type="text"
          name="dosis"
          value={medicamento.dosis}
          onChange={handleInputChange}
        />
        <label>Medida:</label>
        <input
          type="text"
          name="medida"
          value={medicamento.medida}
          onChange={handleInputChange}
        />
        <label>Cantidad:</label>
        <input
          type="number"
          name="cantidad"
          value={medicamento.cantidad}
          onChange={handleInputChange}
        />
        <label>Caducidad:</label>
        <input
          type="date"
          name="caducidad"
          value={medicamento.caducidad}
          onChange={handleInputChange}
        />
        <label>Precio:</label>
        <input
          type="number"
          step="0.01"
          name="precio"
          value={medicamento.precio}
          onChange={handleInputChange}
        />
        <label>Imagen URL:</label>
        <input
          type="text"
          name="imagen"
          value={medicamento.imagen}
          onChange={handleInputChange}
        />
        <div className="modal-actions">
          <button type="button" onClick={handleSave}>
            {editMode ? "Guardar Cambios" : "Agregar Medicamento"}
          </button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default MedicamentoModal;
