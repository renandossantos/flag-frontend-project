import { useEffect, useState } from "react";
import "./Depoimentos.css";
import { Link } from "react-router-dom";

function Depoimentos() {
  const [_depoimentos, setDepoimentos] = useState([]);
  const [depoimentosAleatorios, setDepoimentosAleatorios] = useState([]);

  // Função para selecionar 3 cards aleatórios
  const selecionarAleatorios = (dados) => {
    const shuffled = [...dados].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };

  useEffect(() => {
    fetch("/data/depoimentos.json")
      .then((res) => res.json())
      .then((data) => {
        setDepoimentos(data);
        setDepoimentosAleatorios(selecionarAleatorios(data));
      });
  }, []);

  if (!depoimentosAleatorios.length) return null;

  return (
    <section className="depoimentos">
      <h2 className="depoimentos-titulo">Depoimentos</h2>
      <div className="depoimentos-grid">
        {depoimentosAleatorios.map((depoimento) => (
          <div key={depoimento.id} className="depoimentos-card">
            <img
              src={`/images/${depoimento.foto_perfil}`}
              alt={depoimento.nome || "foto-perfil"}
              className="depoimentos-card-image"
            />

            <div className="depoimentos-card-content">
              <h2 className="depoimentos-nome">{depoimento.nome}</h2>
              <p className="depoimentos-idade">{depoimento.idade} anos</p>
              <p className="depoimentos-description">{depoimento.depoimento}</p>
              <p className="depoimentos-date">{depoimento.data}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="depoimentos-actions">
        <button className="btn-depoimentos">
          <Link to="/depoimentos">Ver Mais</Link>
        </button>
      </div>
    </section>
  );
}

export default Depoimentos;
