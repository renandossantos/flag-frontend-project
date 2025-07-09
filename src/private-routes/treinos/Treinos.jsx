import { useEffect, useState } from "react";
import Filtro from "./Filtro";
import MenuTreinos from "./MenuTreinos";
/* import CadastroExercicio from "./CadastroExercicios";
import CadastroTreino from "./CadastroTreino"; */
import "./Treinos.css";

function Treinos() {
  const [dadosTreinos, setDadosTreinos] = useState([]);
  const [categoriasUnicas, setCategoriasUnicas] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [termoBusca, setTermoBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        const response = await fetch("./data/treinos-renan.json");
        if (!response.ok) {
          throw new Error("Erro ao carregar JSON treinos");
        }
        const dados = await response.json();

        setDadosTreinos(dados);

        //Extrair categorias únicas
        const categorias = [...new Set(dados.map((t) => t.categoria))];
        setCategoriasUnicas(categorias);

        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar treinos", error);
        setErro("Erro ao carregar os treinos. Linha 33");
        setLoading(false);
      }
    };
    carregarDados();
  }, []);

  const treinosFiltrados = dadosTreinos.filter((treino) => {
    const correspondeCategoria =
      filtroCategoria === "" ||
      treino.categoria.toLowerCase() === filtroCategoria.toLowerCase();

    const algumExercicioVisivel = treino.exercicios.some(
      (exercicio) =>
        termoBusca === "" ||
        exercicio.nome.toLowerCase().includes(termoBusca.toLowerCase())
    );

    return correspondeCategoria && algumExercicioVisivel;
  });

  if (loading) {
    return <div className="loading">Carregando treinos...</div>;
  }

  if (erro) {
    return <div className="erro">{erro}</div>;
  }

  return (
    <div className="treinos-container">
      {/* <h1 treinos-titulo>Treinos</h1> */}

      {/*    <div className="cadastrar-exercicios">
        <h1>Cadastrar exercício</h1>
        <CadastroExercicio />
      </div> */}

      {/*   <div className="cadastrar-treinos">
        <h1>Criar Treinos</h1>
        <CadastroTreino />
      </div> */}

      <Filtro
        termoBusca={termoBusca}
        setTermoBusca={setTermoBusca}
        filtroCategoria={filtroCategoria}
        setFiltroCategoria={setFiltroCategoria}
        categoriasUnicas={categoriasUnicas}
      />

      <MenuTreinos
        treinosFiltrados={treinosFiltrados}
        termoBusca={termoBusca}
      />

      {treinosFiltrados.length === 0 && (
        <p className="sem-resultados">
          Nenhum treino encontrado com os filtros aplicados.
        </p>
      )}
    </div>
  );
}

export default Treinos;
