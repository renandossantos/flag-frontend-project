import "./App.css";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      {/*  -- HTML hardcoded para marcação -- 
      <header>
        <h1>Projeto FrontEnd - Fitness</h1>
      </header>

      <main>
        <p>Conteúdo principal do site.</p>
      </main>

      <footer>
        <p>&copy; 2025 - Todos os direitos reservados</p>
      </footer> */}
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
