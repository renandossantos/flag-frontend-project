import { useState, useEffect, useRef } from "react";
import "./Planos_pagina.css";

function Planos_pagina() {
  const [planos, setPlanos] = useState([]);
  const carrosselRef = useRef(null);

  useEffect(() => {
    fetch("/data/planos.json")
      .then((res) => res.json())
      .then((data) => setPlanos(data));
  }, []);

  if (!planos.length) return null;

  return (
    <section className="planos">
      <h2 className="planos-titulo">Nossos Planos</h2>

      <div className="carrossel-container">
        <div className="carrossel" ref={carrosselRef}>
          {planos.map((plano) => {
            const {
              id,
              categoria,
              tipo,
              destaque,
              beneficios,
              frequencia,
              duracao,
              valor,
              valor_avulso,
              diferencial,
            } = plano;

            return (
              <div
                className={`carrossel-item ${destaque ? "item-destaque" : ""}`}
                key={id}
              >
                <div className="item-conteudo">
                  <h3 className="item-categoria">{categoria}</h3>
                  <p className="item-tipo">Tipo: {tipo}</p>
                  <ul className="item-beneficios">
                    {beneficios.map((b, index) => (
                      <li key={index}>{b}</li>
                    ))}
                  </ul>
                  <p className="item-frequencia">Frequência: {frequencia}</p>
                  <p className="item-duracao">Duração: {duracao}</p>
                  <p className="item-preco">Valor: {valor}</p>
                  {valor_avulso && (
                    <p className="item-valor-avulso">Avulso: {valor_avulso}</p>
                  )}
                  {diferencial && (
                    <p className="item-diferencial">
                      Diferencial: {diferencial}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Planos_pagina;
