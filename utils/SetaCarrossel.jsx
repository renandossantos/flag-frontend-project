import "./SetaCarrossel.css";

function SetaCarrossel({ direcao = "direita", onClick }) {
  return (
    <button
      className={`seta ${direcao}`}
      onClick={onClick}
      aria-label={direcao === "direita" ? "Próximo" : "Anterior"}
    >
      <img
        src="/images/seta.png"
        alt="arrow"
        style={{
          transform: direcao === "esquerda" ? "rotate(180deg)" : "none",
        }}
      />
    </button>
  );
}

export default SetaCarrossel;
