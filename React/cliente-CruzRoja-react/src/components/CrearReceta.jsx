import React, { useState } from "react";
import api from "../api/api";

const CrearReceta = () => {
  const [formData, setFormData] = useState({
    selectedPatientId: "",
    selectedPatient: "",
    presion_arterial: "",
    temperatura: "",
    talla: "",
    peso: "",
    frecuencia_cardiaca: "",
    frecuencia_respiratoria: "",
    saturacion_oxigeno: "",
    diagnostico: "",
    tratamiento: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("/recetas", formData)
      .then((response) => {
        alert("Receta creada exitosamente!");
        console.log(response.data);
      })
      .catch((error) => console.error("Error al crear receta:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Receta Médica</h2>
      <div>
        <label>Nombre del Paciente:</label>
        <input
          type="text"
          name="selectedPatient"
          value={formData.selectedPatient}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Presión Arterial:</label>
        <input
          type="text"
          name="presion_arterial"
          value={formData.presion_arterial}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Temperatura:</label>
        <input
          type="number"
          name="temperatura"
          value={formData.temperatura}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Guardar Receta</button>
    </form>
  );
};

export default CrearReceta;
