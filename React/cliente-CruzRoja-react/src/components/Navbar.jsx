import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar el menú en móvil

  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log("Cerrar sesión");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Cerrar el menú si se hace clic fuera de él
  const closeMenuOnClickOutside = (e) => {
    if (menuOpen && !e.target.closest(".navbar")) {
      setMenuOpen(false);
    }
  };

  // Añadir el event listener cuando el componente se monta
  React.useEffect(() => {
    document.addEventListener("click", closeMenuOnClickOutside);

    // Limpiar el event listener cuando el componente se desmonta
    return () => {
      document.removeEventListener("click", closeMenuOnClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo o título de la app */}
        <div className="navbar-logo">
          <h1>ADMINISTRADOR</h1>
        </div>

        {/* Menú hamburguesa para móvil */}
        <div className="hamburger-icon" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        {/* Menú de navegación */}
        <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <a href="/">Inicio</a>
          <a href="/pacientes">Pacientes</a>
          <a href="/medicamentos">Medicamentos</a>
          <a href="/servicios">Servicios</a>
        </div>

        {/* Menú de usuario */}
        <div className="navbar-user">
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
