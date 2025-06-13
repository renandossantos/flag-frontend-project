import { useEffect, useState, useRef } from "react";
import "../components/sections/Depoimentos/Depoimentos.css";
import "../components/sections/PerfilProfissional/PerfilProfissional.css";

import SetaCarrossel from "../../utils/SetaCarrossel";
import { scrollCarrossel } from "../../utils/scrollCarrossel";

function Depoimentos() {
  const [depoimentos, setDepoimentos] = useState([]);
  const carrosselRef = useRef(null);

  useEffect(() => {
    fetch("/data/depoimentos.json")
      .then((res) => res.json())
      .then((data) => setDepoimentos(data));
  }, []);

  if (!depoimentos.length) return null;

  return (
    <section className="depoimentos">
      <h2 className="depoimentos-titulo">Depoimentos</h2>

      <div className="carrossel-container">
        <SetaCarrossel
          direcao="esquerda"
          onClick={() => scrollCarrossel(carrosselRef, -1)}
        />

        <div className="carrossel" ref={carrosselRef}>
          {depoimentos.map((depoimento) => (
            <div key={depoimento.id} className="depoimento-card">
              <div className="perfil-depoimento">
                <img
                  src={`/images/${depoimento.foto_perfil}`}
                  alt={depoimento.nome || "foto-perfil"}
                  className="foto-perfil"
                />
                <div className="info-perfil">
                  <h3>{depoimento.nome}</h3>
                  <p>{depoimento.idade} anos</p>
                  <p>{depoimento.categoria}</p>
                </div>
              </div>

              <p className="texto-depoimento">{depoimento.depoimento}</p>

              <div className="antes-depois">
                <img
                  src={`/images/${depoimento.foto_antes}`}
                  alt={`Antes de ${depoimento.nome}`}
                />
                <img
                  src={`/images/${depoimento.foto_depois}`}
                  alt={`Depois de ${depoimento.nome}`}
                />
              </div>

              <p className="data-depoimento">{depoimento.data}</p>
            </div>
          ))}
        </div>

        <SetaCarrossel
          direcao="direita"
          onClick={() => scrollCarrossel(carrosselRef, 1)}
        />
      </div>
    </section>
  );
}

export default Depoimentos;
