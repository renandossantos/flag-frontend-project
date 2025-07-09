import { useState, useEffect } from "react";

import "./Footer.css";

function Footer() {
  const [contato, setContato] = useState(null);

  useEffect(() => {
    fetch("/data/contato.json")
      .then((res) => res.json())
      .then((data) => setContato(data[0]));
  }, []);

  if (!contato) return <p>Carregando...</p>;

  const { redes_sociais, selos, contatos } = contato;

  return (
    <footer>
      <section className="footer">
        <div className="footer-selos">
          <h3>Selos de Confiança</h3>
          <ul>
            {selos.map((selo, i) => (
              <li key={i}>{selo}</li>
            ))}
          </ul>
        </div>

        <div className="footer-redes">
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

        <div className="telefone">
          <h3>Telefone</h3>
          <p>{contatos.telefone.numero}</p>
          {contatos.telefone.whatsapp && <p>Disponível no Whatsapp</p>}
          <p>{contatos.telefone.horario}</p>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
