import React, { useState } from "react";

const Exercicio = ({ exercicio }) => {
  const [midiaVisivel, setMidiaVisivel] = useState(false);

  // Função para alternar mídia visível
  const toggleMidia = () => {
    setMidiaVisivel(!midiaVisivel);
  };

  // Função para renderizar mídia
  const renderMidia = () => {
    if (exercicio.midia.endsWith(".mp4")) {
      return <video src={exercicio.midia} controls className="midia-video" />;
    } else {
      return (
        <img src={exercicio.midia} alt={exercicio.nome} className="midia-img" />
      );
    }
  };

  return (
    <div className="exercicio">
      {/* Header do exercício */}
      <div className="exercicio-header">
        <span>{exercicio.nome}</span>
        <span>{exercicio.repeticoes}</span>
        <button className="toggle-midia" onClick={toggleMidia}>
          {midiaVisivel ? "Ocultar" : "Ver Execução"}
        </button>
      </div>

      {/* Mídia */}
      {midiaVisivel && <div className="midia">{renderMidia()}</div>}
    </div>
  );
};

export default Exercicio;
