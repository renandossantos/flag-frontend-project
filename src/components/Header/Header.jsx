import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && !e.target.closest(".navbar")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);
  // Fechar menu ao redimensionar para desktop

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="site-header">
      <nav className="navbar">
        <div className="logo">
          <img src="/images/logo.png" alt="Logo" />
        </div>

        <button
          className="hamburguer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fechar Menu" : "Abrir Menu"}
          aria-expanded={menuOpen}
        >
          <span className={menuOpen ? "bar open" : "bar"}></span>
          <span className={menuOpen ? "bar open" : "bar"}></span>
          <span className={menuOpen ? "bar open" : "bar"}></span>
        </button>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/planos" onClick={() => setMenuOpen(false)}>
              Planos
            </Link>
          </li>
          <li>
            <Link to="/perfil-profissional" onClick={() => setMenuOpen(false)}>
              Perfil do Profissional
            </Link>
          </li>
          <li>
            <Link to="/depoimentos" onClick={() => setMenuOpen(false)}>
              Depoimentos
            </Link>
          </li>
          <li>
            <Link to="/contato" onClick={() => setMenuOpen(false)}>
              Contatos
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="btn-aluno"
              onClick={() => setMenuOpen(false)}
            >
              Área do aluno
            </Link>
          </li>
        </ul>
      </nav>

      <div className="hero-text">
        <h1>More than Muscles</h1>
      </div>
    </header>
  );
}

export default Header;
