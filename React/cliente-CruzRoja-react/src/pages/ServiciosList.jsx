import React from "react";
import ServiciosList from "../components/ServiciosList";
import NavBar from "../components/Navbar";

const PacientesPage = () => {
  return (
    <div>
      {/* Barra de navegación */}
      <NavBar />
      <div className="page-content">
        <br /><br />
        <ServiciosList />
      </div>
    </div>
  );
};

export default PacientesPage;
