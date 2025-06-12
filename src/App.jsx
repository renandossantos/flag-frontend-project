import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import Footer from "./components/Footer/Footer";
import PerfilProfissional from "./components/sections/PerfilProfissional/PerfilProfissional";

import Planos_home from "./components/sections/Planos/Planos_home";
import Planos_pagina from "./components/sections/Planos/Planos_pagina";

import Depoimentos from "./components/sections/Depoimentos/Depoimentos2";
import Contato from "./components/sections/Contato/Contato";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainContent />} />

          <Route path="/planos_home" element={<Planos_home />} />
          <Route path="/planos_pagina" element={<Planos_pagina />} />

          <Route path="/perfil-profissional" element={<PerfilProfissional />} />
          <Route path="/depoimentos" element={<Depoimentos />} />
          <Route path="/contato" element={<Contato />} />
          {/* <Route path="/area-aluno" element={<AreaAluno />} /> */}
          <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
