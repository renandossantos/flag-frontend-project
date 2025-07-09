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

  const { titulo, subtitulo, agendamento, contatos } = contato;

  const embedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6223.70870452102!2d-9.15088062361541!3d38.744104355733924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19339ff3d2e003%3A0x30801d02c31fc003!2sFLAG%20LISBOA!5e0!3m2!1spt-PT!2spt!4v1751882407939!5m2!1spt-PT!2spt";

  return (
    <section className="contato">
      <h2 className="contato-titulo">{titulo}</h2>
      <p>{subtitulo}</p>
      <div className="mapa-container">
        <div className="contato-agendamento">
          <h3>{agendamento.cta}</h3>
          <ul>
            <li>
              <a
                href={agendamento.forms}
                target="_blank"
                rel="noopener noreferrer"
              >
                Formulário
              </a>
            </li>

            <li>
              <a
                href={agendamento.calendly}
                target="_blank"
                rel="noopener noreferrer"
              >
                Calendly
              </a>
            </li>
          </ul>
        </div>

        <iframe
          src={embedUrl}
          width="90%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localização LISBOA"
        />
      </div>

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
    </section>
  );
}

export default Contato;

/* 
<a href="https://www.google.pt/maps/place/Flag/@38.7331483,-9.1468265,17z/data=!3m1!4b1!4m5!3m4!1s0xd19339ff3d2e003:0x30801d02c31fc003!8m2!3d38.7331441!4d-9.1446378" target="_blank" class="btn btn-primary-inverted">Abrir no Google Maps</a>
*/
