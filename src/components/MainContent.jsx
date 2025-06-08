import Depoimentos from "./sections/Depoimentos";
import PerfilProfissional from "./sections/PerfilProfissional";
import Planos from "./sections/Planos";
import Contato from "./sections/contato";

import "./MainContent.css";

function MainContent() {
  return (
    <main>
      <h1>Corpo do meu site</h1>
      <Planos />
      <Depoimentos />
      <PerfilProfissional />
      <Contato />
    </main>
  );
}

export default MainContent;
