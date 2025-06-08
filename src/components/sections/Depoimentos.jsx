import { useEffect, useState } from "react";
import "./Depoimentos.css";

function Depoimentos() {
  const [depoimentos, setDepoimentos] = useState([]);

  useEffect(() => {
    fetch("/data/depoimentos.json")
      .then((res) => res.json())
      .then((data) => setDepoimentos(data));
  }, []);

  return (
    <section className="depoimentos">
      <h2>Depoimentos</h2>

      <div className="planos-cards">
        {depoimentos.map((depoimento) => (
          <div key={depoimento.id} className="depoimento-card">
            <h3>{depoimento.nome}</h3>
            <h3>{depoimento.categoria}</h3>
            <p>{depoimento.depoimento}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Depoimentos;
