import { useState, useEffect } from "react";

import "./Contato.css";

function Contato() {
  const [contato, setContato] = useState(null);

  useEffect(() => {
    fetch("/data/contato.json")
      .then((res) => res.json())
      .then((data) => setContato(data[0]));
  }, []);

  if (!contato) return <p>Carregando...</p>;

  const { titulo, subtitulo, contatos, redes_sociais, agendamento, selos } =
    contato;

  return (
    <section className="contato">
      <h2 className="contato-titulo">{titulo}</h2>
      <p>{subtitulo}</p>

      <div className="contato-infos">
        <div>
          <h3>Telefone</h3>
          <p>{contatos.telefone.numero}</p>
          {contatos.telefone.whatsapp && <p>Disponível no Whatsapp</p>}
          <p>{contatos.telefone.horario}</p>
        </div>

        <div>
          <h3>Email</h3>
          <a
            href={`mailto:${contatos.email.endereco}?subject=@{encodeULIComponent(contatos.email.assunto_padrao)}`}
          >
            {contatos.email.endereco}
          </a>
        </div>
      </div>

      <div className="contato-redes">
        <h3>Redes Sociais</h3>
        <ul>
          <li>
            <a href={redes_sociais.instagram.url} target="_blank">
              Instagram {redes_sociais.instagram.handle}
            </a>
          </li>

          <li>
            <a href={redes_sociais.linkedin.url} target="_blank">
              LinkedIn {redes_sociais.linkedin.badge}
            </a>
          </li>
        </ul>
      </div>

      <div className="contato-agendamento">
        <h3>{agendamento.cta}</h3>
        <ul>
          <li>
            <a href={agendamento.forms} target="_blank">
              Formulário
            </a>
          </li>

          <li>
            <a href={agendamento.calendly} target="_blank">
              Calendly
            </a>
          </li>
        </ul>
      </div>

      <div className="contato-selos">
        <h3>Selos de Confiança</h3>
        <ul>
          {selos.map((selo, i) => (
            <li key={i}>{selo}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Contato;
