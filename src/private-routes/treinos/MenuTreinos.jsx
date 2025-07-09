import React, { useState } from "react";
import Treino from "./Treino";

function MenuTreinos({ treinosFiltrados, termoBusca }) {
  const [treinoAbertoId, setTreinoAbertoId] = useState(null);

  // Função para alternar treino aberto/fechado
  const toggleTreino = (index) => {
    setTreinoAbertoId(treinoAbertoId === index ? null : index);
  };

  return (
    <ul className="menu">
      {treinosFiltrados.map((treino, treinoIndex) => (
        <li key={treinoIndex}>
          <button className="dia" onClick={() => toggleTreino(treinoIndex)}>
            {treino.dia} - {treino.categoria}
          </button>
          {(treinoAbertoId === treinoIndex || termoBusca !== "") && (
            <Treino
              treino={treino}
              treinoIndex={treinoIndex}
              termoBusca={termoBusca}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export default MenuTreinos;
