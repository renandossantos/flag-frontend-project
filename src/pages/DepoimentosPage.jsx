import { useEffect, useState } from "react";
import "./DepoimentosPage.css";

function Depoimentos() {
  const [depoimentos, setDepoimentos] = useState([]);

  useEffect(() => {
    fetch("/data/depoimentos.json")
      .then((res) => res.json())
      .then((data) => setDepoimentos(data));
  }, []);

  if (!depoimentos.length) return null;

  return (
    <section className="depoimentos-page">
      <h2 className="depoimentos-page-titulo">Depoimentos</h2>

      <div className="depoimentos-page-container">
        {depoimentos.map((depoimento) => (
          <div key={depoimento.id} className="depoimentos-page-card">
            <div className="depoimentos-page-perfil">
              <img
                src={`/images/${depoimento.foto_perfil}`}
                alt={depoimento.nome || "depoimentos-page-foto-perfil"}
                className="foto-perfil"
              />
              <div className="depoimentos-page-info-perfil">
                <h3>{depoimento.nome}</h3>
                <p>{depoimento.idade} anos</p>
                <p>{depoimento.categoria}</p>
              </div>
            </div>

            <p className="depoimentos-page-texto-depoimento">
              {depoimento.depoimento}
            </p>

            <div className="depoimentos-page-antes-depois">
              <img
                src={`/images/${depoimento.foto_antes}`}
                alt={`Antes de ${depoimento.nome}`}
              />
              <img
                src={`/images/${depoimento.foto_depois}`}
                alt={`Depois de ${depoimento.nome}`}
              />
            </div>

            <p className="depoimentos-page-data-depoimento">
              {depoimento.data}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Depoimentos;
