// filtro.js

// Seleciona os botões de filtro
const btnFiltrarTodos = document.getElementById("btnFiltrarTodos");
const btnFiltrarProdutosTapetes = document.getElementById(
  "btnFiltrarProdutosTapetes"
);
const btnFiltrarProdutosBolsas = document.getElementById(
  "btnFiltrarProdutosBolsas"
);
const btnFiltrarProdutosCasacos = document.getElementById(
  "btnFiltrarProdutosCasacos"
);
const btnFiltrarProdutosCalcados = document.getElementById(
  "btnFiltrarProdutosCalcados"
);
const btnFiltrarProdutosKits = document.getElementById(
  "btnFiltrarProdutosKits"
);
const btnFiltrarProdutosFestas = document.getElementById(
  "btnFiltrarProdutosFestas"
);

// Função de filtro
function filtrarProdutos(tipo) {
  const produtosFiltrados = listaProdutos.filter(
    (produto) => produto.tipo.toLowerCase() === tipo.toLowerCase()
  );
  // Chama a função do produtos.js para renderizar cards + modais
  renderizarProdutos(produtosFiltrados);
}

// Eventos de clique
btnFiltrarTodos.addEventListener("click", () => {
  renderizarProdutos(listaProdutos);
});

btnFiltrarProdutosTapetes.addEventListener("click", () =>
  filtrarProdutos("tapetes")
);
btnFiltrarProdutosBolsas.addEventListener("click", () =>
  filtrarProdutos("Bolsas")
);
btnFiltrarProdutosCasacos.addEventListener("click", () =>
  filtrarProdutos("Casacos")
);
btnFiltrarProdutosCalcados.addEventListener("click", () =>
  filtrarProdutos("Calçados")
);
btnFiltrarProdutosKits.addEventListener("click", () => filtrarProdutos("Kits"));
btnFiltrarProdutosFestas.addEventListener("click", () =>
  filtrarProdutos("Festas")
);
