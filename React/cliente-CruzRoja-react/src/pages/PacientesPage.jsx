import React from "react";
import PacientesList from "../components/PacientesList";
import NavBar from "../components/Navbar";
import "./PacientesPage.css";

const PacientesPage = () => {
  return (
    <div>
      {/* Barra de navegación */}
      <NavBar />
      <div className="page-content">
        <br /><br />
        <PacientesList />
      </div>
    </div>
  );
};

export default PacientesPage;
