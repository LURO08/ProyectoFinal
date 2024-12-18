import React from "react";
import MedicamentosList from "../components/MedicamentosList";
import NavBar from "../components/Navbar";

const PacientesPage = () => {
  return (
    <div>
      {/* Barra de navegación */}
      <NavBar />
      <div className="page-content">
        <br /><br />
        <MedicamentosList />
      </div>
    </div>
  );
};

export default PacientesPage;
