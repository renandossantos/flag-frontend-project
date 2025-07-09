import React from "react";
import Exercicio from "./Exercicio";

function Treino({ treino, termoBusca }) {
  // Função para filtrar exercícios dentro de um treino

  const exerciciosFiltrados = treino.exercicios.filter((ex) => {
    if (termoBusca === "") return true;
    return ex.nome.toLowerCase().includes(termoBusca.toLowerCase());
  });

  return (
    <div className="treino">
      {exerciciosFiltrados.map((exercicio, exercicioIndex) => (
        <Exercicio key={exercicioIndex} exercicio={exercicio} />
      ))}
    </div>
  );
}

export default Treino;
