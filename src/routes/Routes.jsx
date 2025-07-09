import { Routes, Route } from "react-router-dom";

import MainContent from "../components/MainContent/MainContent";

import PlanosPage from "../pages/PlanosPage";
import ContatoPage from "../pages/ContatoPage";
import DepoimentosPage from "../pages/DepoimentosPage";
import PerfilProfissionalPage from "../pages/PerfilProfissionalPage";
import NotFoundPage from "../pages/NotFoundPage";
import Login from "../private-routes/Login";
import Dashboard from "../private-routes/Dashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainContent />} />
      <Route path="/planos" element={<PlanosPage />} />
      <Route path="/contato" element={<ContatoPage />} />
      <Route path="/depoimentos" element={<DepoimentosPage />} />
      <Route path="/perfil-profissional" element={<PerfilProfissionalPage />} />
      <Route path="/*" element={<NotFoundPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
