import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PacientesPage from "./pages/PacientesPage";
import RecetasPage from "./pages/RecetasPage";
import Home from "./pages/homePaga";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pacientes" element={<PacientesPage />} />
        <Route path="/medicamentos" element={<PacientesPage />} />
        <Route path="/recetas" element={<RecetasPage />} />
      </Routes>
    </Router>
  );
};

export default App;
