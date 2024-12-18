import React, { useEffect, useState } from "react";
import api from "../api/api";
import Modal from "react-modal"; // Importamos el componente Modal
import "./MedicamentosList.css";

Modal.setAppElement("#root");

const MedicamentosList = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentMedicamento, setCurrentMedicamento] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // Cargar medicamentos paginados
  useEffect(() => {
    fetchMedicamentos(currentPage);
  }, [currentPage]);

  const fetchMedicamentos = (page) => {
    setLoading(true);
    api
      .get(`/medicamentos?page=${page}`)
      .then((response) => {
        setMedicamentos(response.data.data); // `data` contiene los medicamentos
        setLastPage(response.data.last_page); // Última página
        setLoading(false);
      })
      .catch(() => {
        setError("Error al obtener medicamentos. Intenta de nuevo más tarde.");
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    api.delete(`/medicamentos/delete/${id}`)
    .then(() => {
      setMedicamentos(medicamentos.filter((med) => med.id !== id));
      setSuccessMessage("Medicamento eliminado con éxito");
    })
    .catch((error) => {
      console.error("Error al eliminar medicamento:", error);
    });
  };

  const handleEdit = (medicamento) => {
    setCurrentMedicamento(medicamento);
    setEditMode(true);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setCurrentMedicamento({
      nombre: "",
      descripcion: "",
      dosis: "",
      medida: "",
      cantidad: 0,
      caducidad: "",
      precio: 0,
      imagen: "",
    });
    setEditMode(false);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editMode) {
      api.
      put(`/medicamentos/${currentMedicamento.id}`, currentMedicamento)
      .then((response) => {
        setMedicamentos(
          medicamentos.map((med) =>
            med.id === currentMedicamento.id ? response.data : med
          )
        );
        setSuccessMessage("Medicamento actualizado con éxito");
      })
      .catch((error) => {
        console.error("Error al guardar cambios:", error);
      });
    } else {
      api.post("/medicamentos/store", currentMedicamento).then((response) => {
        setMedicamentos([...medicamentos, response.data]);
        setSuccessMessage("Medicamento agregado con éxito");
      });
    }
    setModalOpen(false);
    setCurrentMedicamento(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentMedicamento({ ...currentMedicamento, [name]: value });
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= lastPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="dashboard">
      <div className="main-content">
      <div className="header">
      <h1>Gestión de Medicamentos</h1>
      </div>
        {successMessage && (
          <div className="notification alert alert-success">
            <strong>Éxito!</strong> {successMessage}
            <button className="btn-close" onClick={() => setSuccessMessage("")}>
              &times;
            </button>
          </div>
        )}

        <button onClick={handleAdd} className="btn-primary">
          Agregar Medicamento
        </button>

        {/* Modal para agregar o editar medicamento */}
        <Modal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          contentLabel={editMode ? "Editar Medicamento" : "Agregar Medicamento"}
        >
          <h3>{editMode ? "Editar Medicamento" : "Agregar Medicamento"}</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={currentMedicamento?.nombre || ""}
              onChange={handleInputChange}
            />
            <label>Descripción:</label>
            <textarea
              name="descripcion"
              value={currentMedicamento?.descripcion || ""}
              onChange={handleInputChange}
            />
            <label>Dosis:</label>
            <input
              type="text"
              name="dosis"
              value={currentMedicamento?.dosis || ""}
              onChange={handleInputChange}
            />
            <label>Medida:</label>
            <input
              type="text"
              name="medida"
              value={currentMedicamento?.medida || ""}
              onChange={handleInputChange}
            />
            <label>Cantidad:</label>
            <input
              type="number"
              name="cantidad"
              value={currentMedicamento?.cantidad || ""}
              onChange={handleInputChange}
            />
            <label>Caducidad:</label>
            <input
              type="date"
              name="caducidad"
              value={currentMedicamento?.caducidad || ""}
              onChange={handleInputChange}
            />
            <label>Precio:</label>
            <input
              type="number"
              step="0.01"
              name="precio"
              value={currentMedicamento?.precio || ""}
              onChange={handleInputChange}
            />
            <label>Imagen URL:</label>
            <input
              type="text"
              name="imagen"
              value={currentMedicamento?.imagen || ""}
              onChange={handleInputChange}
            />
            <button type="button" onClick={handleSave}>
              {editMode ? "Guardar Cambios" : "Agregar Medicamento"}
            </button>
            <button type="button" onClick={() => setModalOpen(false)}>
              Cancelar
            </button>
          </form>
        </Modal>

        {/* Tabla de Medicamentos */}
        {loading ? (
          <p>Cargando medicamentos...</p>
        ) : (
          <table className="medicamentos-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {medicamentos.map((med) => (
                <tr key={med.id}>
                  <td>{med.nombre}</td>
                  <td>{med.descripcion}</td>
                  <td>{med.cantidad}</td>
                  <td>${med.precio}</td>
                  <td>
                  <button onClick={() => handleEdit(med)} className="edit-btn">
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(med.id)}
                      className="delete-btn"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Controles de Paginación */}
        <div className="pagination-controls">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Anterior
          </button>
          <span>
            Página {currentPage} de {lastPage}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === lastPage}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicamentosList;
