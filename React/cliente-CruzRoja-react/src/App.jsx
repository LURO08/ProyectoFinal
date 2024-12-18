import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PacientesPage from "./pages/PacientesPage";
import MedicamentosPage from "./pages/MedicamentosPage";
import Login from "./pages/LoginPage";
import RecetasPage from "./pages/RecetasPage";
import ServiciosList from "./pages/ServiciosList";
import Home from "./pages/homePage";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pacientes" element={<PacientesPage />} />
        <Route path="/medicamentos" element={<MedicamentosPage />} />
        <Route path="/servicios" element={<ServiciosList />} />
      </Routes>
    </Router>
  );
};

export default App;
