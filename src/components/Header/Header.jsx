import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="site-header">
      <nav className="navbar">
        <div className="logo">
          <img src="/images/logo.png" alt="Logo" />
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/planos">Planos</Link>
          </li>
          <li>
            <Link to="/perfil-profissional">Perfil do Profissional</Link>
          </li>
          <li>
            <Link to="/depoimentos">Depoimentos</Link>
          </li>
          <li>
            <Link to="/contato">Contatos</Link>
          </li>
          <li>
            <Link to="/area-aluno" className="btn-aluno">
              Área do aluno
            </Link>
          </li>
        </ul>
      </nav>
      <div className="hero">
        <div className="hero-image">
          <img src="/images/hero-image.png" alt="Imagem de capa" />
        </div>
      </div>
    </header>
  );
}

export default Header;
