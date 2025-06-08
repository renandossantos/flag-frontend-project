import { useState, useEffect } from "react";
import "./Planos.css";

function Planos() {
  const [planos, setPlanos] = useState([]);

  useEffect(() => {
    fetch("/data/planos.json")
      .then((res) => res.json())
      .then((data) => setPlanos(data));
  }, []);

  return (
    <section className="planos">
      <h2>Nossos Planos</h2>

      <div className="planos-cards">
        {planos.map((plano) => (
          <div
            key={plano.categoria}
            className={`card ${plano.destaque ? "destaque" : ""}`}
          >
            <h3>{plano.categoria}</h3>
            <p className="tipo">{plano.tipo}</p>

            <div className="preco">
              <strong>{plano.valor}</strong>
              {plano.valor_avulso && <span>({plano.valor_avulso})</span>}
            </div>

            <ul className="beneficios">
              {plano.beneficios.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <button className="botao">
              {plano.destaque ? "Quero esse" : "Saiba mais"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Planos;
