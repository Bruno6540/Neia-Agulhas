// Seleção de botões
const btnTodos = document.getElementById("btnFiltrarTodos");
const btnFavoritos = document.getElementById("btnFiltrarProdutosFavoritos");
const btnTapetes = document.getElementById("btnFiltrarProdutosTapetes");
const btnBolsas = document.getElementById("btnFiltrarProdutosBolsas");
const btnCasacos = document.getElementById("btnFiltrarProdutosCasacos");
const btnCalcados = document.getElementById("btnFiltrarProdutosCalcados");
const btnKits = document.getElementById("btnFiltrarProdutosKits");
const btnFestas = document.getElementById("btnFiltrarProdutosFestas");

// Função de filtragem
function filtrarCategoria(categoria) {
  let produtosFiltrados;

  if (categoria === "Favoritos") {
    const favs = JSON.parse(localStorage.getItem("favoritos")) || [];
    produtosFiltrados = listaProdutos.filter((p) => favs.includes(p.nome));
  } else if (categoria === "Todos") {
    produtosFiltrados = listaProdutos;
  } else {
    produtosFiltrados = listaProdutos.filter((p) => p.tipo === categoria);
  }

  if (produtosFiltrados.length === 0) {
    container.innerHTML = `<div class="text-center py-5"><h4>Nenhum produto encontrado 😢</h4></div>`;
    return;
  }

  renderizarProdutos(produtosFiltrados);
}

// Eventos
btnTodos.addEventListener("click", () => filtrarCategoria("Todos"));
btnFavoritos.addEventListener("click", () => filtrarCategoria("Favoritos"));
btnTapetes.addEventListener("click", () => filtrarCategoria("Tapetes"));
btnBolsas.addEventListener("click", () => filtrarCategoria("Bolsas"));
btnCasacos.addEventListener("click", () => filtrarCategoria("Casacos"));
btnCalcados.addEventListener("click", () => filtrarCategoria("Calçados"));
btnKits.addEventListener("click", () => filtrarCategoria("Kits"));
btnFestas.addEventListener("click", () => filtrarCategoria("Festas"));
