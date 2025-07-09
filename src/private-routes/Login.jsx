import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function LoginForm() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  /* const [isLoggedIn, setIsLoggedIn] = useState(false); */

  useEffect(() => {
    fetch("/data/lista-alunos.json")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Erro ao carregar dados.", err));
  });

  const handleSubmit = () => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      navigate("/dashboard");
    } else {
      setError("Usúario ou senha incorretos");
    }
  };

  /*   if (isLoggedIn) {
    <alert>Logado!</alert>;
    // Criar a página de Dashboard para onde o usuário será enviado após login ok
  } */

  return (
    <section className="login">
      <h2 className="login-titulo">Login</h2>
      <p>Faça o login para acessar seus treinos</p>

      <div className="form-container">
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="error"> {error}</div>}

        <button onClick={handleSubmit}>Login</button>
      </div>
    </section>
  );
}
export default LoginForm;
