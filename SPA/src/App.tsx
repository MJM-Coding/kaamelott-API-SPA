//! Application principale de gestion de la navigation et des routes

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Importe les composants nécessaires de react-router-dom
import Header from "./components/header/header"; // Importe le composant Header
import Footer from "./components/footer/footer"; // Importe le composant Footer
import HomePage from "./components/homePage/homePage"; // Importe la page d'accueil
import Characters from "./components/characters/characters"; // Importe la Page des personnages
import FilmsPage from "./components/films/films"; // Importe la Page films

const App: React.FC = () => {
  return (
    <BrowserRouter> {/* Entourer l'ensemble de l'application avec BrowserRouter */}
      <Header />
      <Routes> {/* Définir les différentes routes avec Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/personnages" element={<Characters />} />
        <Route path="/films" element={<FilmsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
