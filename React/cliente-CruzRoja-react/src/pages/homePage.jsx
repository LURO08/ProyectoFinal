import React from "react";
import Home from "../components/home";
import NavBar from "../components/Navbar";

const PacientesPage = () => {
  return (
    <div>
      {/* Barra de navegación */}
      <NavBar />
      <div className="page-content">
        <br /><br />
        <Home />
      </div>
    </div>
  );
};

export default PacientesPage;
