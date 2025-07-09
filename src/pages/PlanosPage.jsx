import { useState, useEffect } from "react";
import "./PlanosPage.css";

function Planos() {
  const [planos, setPlanos] = useState([]);

  useEffect(() => {
    fetch("/data/planos.json")
      .then((res) => res.json())
      .then((data) => setPlanos(data));
  }, []);

  if (!planos.length) return null;

  return (
    <section className="planos-page">
      <h2>Nossos Planos</h2>

      <div className="planos-page-container">
        {planos.map((plano) => (
          <div
            key={plano.categoria}
            className={`planos-page-card ${
              plano.destaque ? "planos-page-destaque" : ""
            }`}
          >
            <h3>{plano.categoria}</h3>
            <p className="planos-page-tipo">{plano.tipo}</p>

            <div className="planos-page-preco">
              <strong>{plano.valor}</strong>
              {plano.valor_avulso && <span>({plano.valor_avulso})</span>}
            </div>

            <ul className="planos-page-beneficios">
              {plano.beneficios.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <button className="planos-page-botao">
              {plano.destaque ? "Quero esse" : "Saiba mais"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Planos;
