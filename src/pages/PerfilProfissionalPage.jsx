import { useEffect, useState } from "react";

import "../components/sections/Depoimentos/Depoimentos.css";
import "../components/sections/PerfilProfissional/PerfilProfissional.css";
import "../components/sections/Contato/Contato.css";

function PerfilProfissional() {
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    fetch("/data/perfil-profissional.json")
      .then((res) => res.json())
      .then((data) => setPerfil(data[0]));
    /* .catch((error) => console.error("Erro ao carregar perfil:", error)); */
  }, []);

  // Adicionar loading state
  if (!perfil) {
    return <div className="perfil-loading">Carregando perfil...</div>;
  }

  return (
    <section className="perfil">
      <h2 className="perfil-titulo">Perfil do Profissional</h2>

      <div className="perfil-header">
        <img
          src={`/images/${perfil.midia.foto_perfil}`}
          alt={perfil.nome || "Perfil"}
        />

        <div className="letras">
          <h2 className="nome">{perfil.nome}</h2>
          <p className="titulo">{perfil.titulo}</p>
        </div>
      </div>

      {perfil.especialidades && (
        <div className="perfil-section">
          <h3>Especialidades</h3>
          <ul>
            {perfil.especialidades.map((esp, i) => (
              <li key={i}>{esp}</li>
            ))}
          </ul>
        </div>
      )}

      {perfil.historico && (
        <div className="perfil-section">
          <h3>Histórico</h3>
          <p>{perfil.historico}</p>
        </div>
      )}

      {perfil.certificacoes && (
        <div className="perfil-section">
          <h3>Certificações</h3>
          <ul>
            {perfil.certificacoes.map((cert, i) => (
              <li key={i}>
                <strong>{cert.instituicao}</strong>: {cert.curso}
              </li>
            ))}
          </ul>
        </div>
      )}

      {perfil.premios && (
        <div className="perfil-section">
          <h3>Prêmios</h3>
          <ul>
            {perfil.premios.map((premio, i) => (
              <li key={i}>{premio}</li>
            ))}
          </ul>
        </div>
      )}

      {perfil.abordagem && (
        <div className="perfil-section">
          <h3>Abordagem</h3>
          <p>{perfil.abordagem}</p>
        </div>
      )}

      {perfil.diferenciais && (
        <div className="perfil-section">
          <h3>Diferenciais</h3>
          <ul>
            {perfil.diferenciais.map((dif, i) => (
              <li key={i}>{dif}</li>
            ))}
          </ul>
        </div>
      )}

      {perfil.estatisticas && (
        <div className="perfil-estatisticas">
          <h3>Estatísticas</h3>
          <ul>
            <li>Alunos Atendidos: {perfil.estatisticas.alunos_atendidos}</li>
            <li>Taxa de Sucesso: {perfil.estatisticas.taxa_sucesso}</li>
            <li>
              Artigos Publicados: {perfil.estatisticas.artigos_publicados}
            </li>
            <li>
              Palestras Internacionais:{" "}
              {perfil.estatisticas.palestras_internacionais}
            </li>
          </ul>
        </div>
      )}

      {perfil.midia &&
        (perfil.midia.foto_treinando || perfil.midia.foto_palestra) && (
          <div className="perfil-galeria">
            <h3>Galeria</h3>
            <div className="galeria">
              {perfil.midia.foto_treinando && (
                <img
                  src={`/images/${perfil.midia.foto_treinando}`}
                  alt="Treinando"
                />
              )}
              {perfil.midia.foto_palestra && (
                <img
                  src={`/images/${perfil.midia.foto_palestra}`}
                  alt="Palestra"
                />
              )}
            </div>
          </div>
        )}
    </section>
  );
}

export default PerfilProfissional;
