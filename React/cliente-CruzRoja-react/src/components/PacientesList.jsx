import React, { useEffect, useState } from "react";
import api from "../api/api";
import Modal from "react-modal"; // Importamos el componente Modal
import "./PacientesList.css"; // Asegúrate de tener este archivo CSS con los estilos.

Modal.setAppElement("#root"); // Configuración del modal para accesibilidad

const PacientesList = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentPaciente, setCurrentPaciente] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar el modal de agregar/editar

  useEffect(() => {
    api
      .get("/pacientes")
      .then((response) => {
        setPacientes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error al obtener pacientes. Intenta de nuevo más tarde.");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    api
      .delete(`/pacientes/${id}`)
      .then(() => {
        setPacientes(pacientes.filter((paciente) => paciente.id !== id));
        setSuccessMessage("Paciente eliminado con éxito");
      })
      .catch((error) => {
        console.error("Error al eliminar paciente:", error);
      });
  };

  const handleEdit = (paciente) => {
    setCurrentPaciente(paciente);
    setEditMode(true);
    setModalOpen(true); // Abrir el modal en modo edición
  };

  const handleAdd = () => {
    setCurrentPaciente({
      nombre: "",
      apellidopaterno: "",
      apellidomaterno: "",
      edad: "",
      sexo: "Masculino",
      tipo_sangre: "A+",
    });
    setEditMode(false);
    setModalOpen(true); // Abrir el modal en modo agregar
  };

  const handleSave = () => {
    if (editMode) {
      api
        .put(`/pacientes/${currentPaciente.id}`, currentPaciente)
        .then((response) => {
          setPacientes(
            pacientes.map((paciente) =>
              paciente.id === currentPaciente.id ? response.data : paciente
            )
          );
          setSuccessMessage("Paciente actualizado con éxito");
        })
        .catch((error) => {
          console.error("Error al guardar cambios:", error);
        });
    } else {
      api
        .post("/pacientes", currentPaciente)
        .then((response) => {
          setPacientes([...pacientes, response.data]);
          setSuccessMessage("Paciente agregado con éxito");
        })
        .catch((error) => {
          console.error("Error al agregar paciente:", error);
        });
    }
    setModalOpen(false);
    setCurrentPaciente(null); // Limpiar los valores
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPaciente({ ...currentPaciente, [name]: value });
  };

  if (loading) {
    return <p>Cargando pacientes...</p>;
  }

  return (
    <div className="dashboard">
      <div className="main-content">
        <div className="header">
          <h1>Gestión de Pacientes</h1>
        </div>

        {/* Notificación de éxito */}
        {successMessage && (
          <div className="notification alert alert-success">
            <strong>Éxito!</strong> {successMessage}
            <button className="btn-close" onClick={() => setSuccessMessage("")}>
              &times;
            </button>
          </div>
        )}

        {/* Botón para agregar un nuevo paciente */}
        <button onClick={handleAdd} className="btn-primary">
          Agregar Paciente
        </button>

        {/* Modal para agregar o editar paciente */}
        <Modal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          contentLabel={editMode ? "Editar Paciente" : "Agregar Paciente"}
        >
          <h3>{editMode ? "Editar Paciente" : "Agregar Paciente"}</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={currentPaciente?.nombre || ""}
              onChange={handleInputChange}
            />
            <label>Apellido Paterno:</label>
            <input
              type="text"
              name="apellidopaterno"
              value={currentPaciente?.apellidopaterno || ""}
              onChange={handleInputChange}
            />
            <label>Apellido Materno:</label>
            <input
              type="text"
              name="apellidomaterno"
              value={currentPaciente?.apellidomaterno || ""}
              onChange={handleInputChange}
            />
            <label>Edad:</label>
            <input
              type="number"
              name="edad"
              value={currentPaciente?.edad || ""}
              onChange={handleInputChange}
            />
            <label>Sexo:</label>
            <select
              name="sexo"
              value={currentPaciente?.sexo || "Masculino"}
              onChange={handleInputChange}
            >
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
            <label>Tipo de Sangre:</label>
            <select
              name="tipo_sangre"
              value={currentPaciente?.tipo_sangre || "A+"}
              onChange={handleInputChange}
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
            <button type="button" onClick={handleSave}>
              {editMode ? "Guardar Cambios" : "Agregar Paciente"}
            </button>
            <button type="button" onClick={() => setModalOpen(false)}>
              Cancelar
            </button>
          </form>
        </Modal>

        {/* Lista de pacientes */}
        <ul>
  {pacientes.length > 0 ? (
    <table className="pacientes-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Edad</th>
          <th>Sexo</th>
          <th>Tipo de Sangre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {pacientes.map((paciente) => (
          <tr key={paciente.id}>
            <td>{paciente.nombre} {paciente.apellidopaterno} {paciente.apellidomaterno}</td>
            <td>{paciente.edad} años</td>
            <td>{paciente.sexo}</td>
            <td>{paciente.tipo_sangre}</td>
            <td>
              <button onClick={() => handleEdit(paciente)} className="edit-btn">
                Editar
              </button>
              <button onClick={() => handleDelete(paciente.id)} className="delete-btn">
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <tr>
      <td colSpan="3">No hay pacientes disponibles</td>
    </tr>
  )}
</ul>

      </div>
    </div>
  );
};

export default PacientesList;
