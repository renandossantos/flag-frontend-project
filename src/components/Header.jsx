import "./Header.css";

function Header() {
  return (
    <header className="site-header">
      <nav className="navbar">
        <div className="logo">
          <img src="/images/logo.png" />
        </div>

        <ul className="nav-links">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#planos">Planos</a>
          </li>
          <li>
            <a href="#perfil">Perfil Prof</a>
          </li>
          <li>
            <a href="#depoimentos">Depoimentos</a>
          </li>
          <li>
            <a href="#contatos">Contatos</a>
          </li>

          <li>
            <a href="#area-aluno" className="btn-aluno">
              Área do aluno
            </a>
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
