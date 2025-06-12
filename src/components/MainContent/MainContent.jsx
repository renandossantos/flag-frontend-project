import Depoimentos from "../sections/Depoimentos/Depoimentos2";
import PerfilProfissional from "../sections/PerfilProfissional/PerfilProfissional";
import Planos_home from "../sections/Planos/Planos_home";
import Contato from "../sections/Contato/Contato";

import "./MainContent.css";

function MainContent() {
  return (
    <main>
      <Planos_home />
      <PerfilProfissional />
      <Depoimentos />
      <Contato />
    </main>
  );
}

export default MainContent;
