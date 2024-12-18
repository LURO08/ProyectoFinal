import React, { useEffect, useState } from "react";
import api from "../api/api";
import Modal from "react-modal";
import "./ServiciosList.css";

Modal.setAppElement("#root");

const ServiciosList = () => {
  const [servicios, setServicios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentServicio, setCurrentServicio] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchServicios(currentPage);
  }, [currentPage]);

  const fetchServicios = (page) => {
    setLoading(true);
    api
      .get(`/servicios?page=${page}`)
      .then((response) => {
        setServicios(response.data.data);
        setLastPage(response.data.last_page);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al obtener servicios. Intenta de nuevo más tarde.");
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    api
      .delete(`/servicios/delete/${id}`)
      .then(() => {
        setServicios(servicios.filter((servicio) => servicio.id !== id));
        setSuccessMessage("Servicio eliminado con éxito");
      })
      .catch((error) => {
        console.error("Error al eliminar servicio:", error);
        setError("Hubo un problema al eliminar el servicio");
      });
  };

  const handleEdit = (servicio) => {
    setCurrentServicio(servicio);
    setEditMode(true);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setCurrentServicio({
      nombre: "",
      descripcion: "",
      costo: 0,
      icono: "",
    });
    setEditMode(false);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!currentServicio) return; // Evitar acción si no hay servicio
    if (editMode) {
      // Edición de un servicio
      api
        .put(`/servicios/${currentServicio.id}`, currentServicio)
        .then((response) => {
          setServicios(
            servicios.map((servicio) =>
              servicio.id === currentServicio.id ? response.data : servicio
            )
          );
          setSuccessMessage("Servicio actualizado con éxito");
        })
        .catch((error) => {
          console.error("Error al guardar cambios:", error);
          setError("Hubo un error al actualizar el servicio.");
        });
    } else {
      // Agregar nuevo servicio
      api
        .post("/servicios/store", currentServicio)
        .then((response) => {
          setServicios([...servicios, response.data]);
          setSuccessMessage("Servicio agregado con éxito");
        })
        .catch((error) => {
          console.error("Error al agregar servicio:", error);
          setError("Hubo un error al agregar el servicio.");
        });
    }
    setModalOpen(false);
    setCurrentServicio(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentServicio({ ...currentServicio, [name]: value });
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
          <h1>Gestión de Servicios</h1>
        </div>
        {successMessage && (
          <div className="notification alert alert-success">
            <strong>Éxito!</strong> {successMessage}
            <button
              className="btn-close"
              onClick={() => setSuccessMessage("")}
            >
              &times;
            </button>
          </div>
        )}
        {error && (
          <div className="notification alert alert-danger">
            <strong>Error!</strong> {error}
            <button
              className="btn-close"
              onClick={() => setError(null)}
            >
              &times;
            </button>
          </div>
        )}

        <button onClick={handleAdd} className="btn-primary">
          Agregar Servicio
        </button>

        <Modal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          contentLabel={editMode ? "Editar Servicio" : "Agregar Servicio"}
        >
          <h3>{editMode ? "Editar Servicio" : "Agregar Servicio"}</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={currentServicio?.nombre || ""}
              onChange={handleInputChange}
            />
            <label>Descripción:</label>
            <textarea
              name="descripcion"
              value={currentServicio?.descripcion || ""}
              onChange={handleInputChange}
            />
            <label>Costo:</label>
            <input
              type="number"
              step="0.01"
              name="costo"
              value={currentServicio?.costo || ""}
              onChange={handleInputChange}
            />
            <label>Ícono:</label>
            <input
              type="text"
              name="icono"
              value={currentServicio?.icono || ""}
              onChange={handleInputChange}
            />
            <button type="button" onClick={handleSave}>
              {editMode ? "Guardar Cambios" : "Agregar Servicio"}
            </button>
            <button type="button" onClick={() => setModalOpen(false)}>
              Cancelar
            </button>
          </form>
        </Modal>

        {loading ? (
          <p>Cargando servicios...</p>
        ) : (
          <table className="servicios-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Costo</th>
                <th>Ícono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {servicios.map((servicio) => (
                <tr key={servicio.id}>
                  <td>{servicio.nombre}</td>
                  <td>{servicio.descripcion}</td>
                  <td>${servicio.costo}</td>
                  <td>{servicio.icono}</td>
                  <td style={{ display: 'flex' }}>
                    <button
                      onClick={() => handleEdit(servicio)}
                      className="edit-btn"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(servicio.id)}
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

        <div className="pagination-controls">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
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

export default ServiciosList;
