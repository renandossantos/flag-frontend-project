import PerfilProfissional from "../sections/PerfilProfissional/PerfilProfissional";
import Planos from "../sections/Planos/Planos";
import Depoimentos from "../sections/Depoimentos/Depoimentos";
import Contato from "../sections/Contato/Contato";

import "./MainContent.css";

function MainContent() {
  return (
    <main className="main-content">
      <Planos contexto="home" />
      <PerfilProfissional contexto="home" />
      <Depoimentos contexto="home" />
      <Contato contexto="home" />
    </main>
  );
}

export default MainContent;
