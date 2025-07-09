import React from "react";

function Filtro({
  termoBusca,
  setTermoBusca,
  filtroCategoria,
  setFiltroCategoria,
  categoriasUnicas,
}) {
  return (
    <div className="filtros">
      <input
        type="text"
        className="campo-busca"
        placeholder="Buscar exercício..."
        value={termoBusca}
        onChange={(e) => setTermoBusca(e.target.value)}
      />

      <select
        className="filtro-categoria"
        value={filtroCategoria}
        onChange={(e) => setFiltroCategoria(e.target.value)}
      >
        <option value="">Todas as categorias</option>
        {categoriasUnicas.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filtro;
