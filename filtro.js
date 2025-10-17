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

// Função para adicionar evento de clique
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

// Função de filtro
function filtrarProdutos(tipo) {
  const produtosFiltrados = listaProdutos.filter(
    (produto) => produto.tipo.toLowerCase() === tipo.toLowerCase()
  );
  renderizarProdutos(produtosFiltrados);
}

// Reutiliza a mesma função do produtos.js para renderizar
function renderizarProdutos(produtos) {
  const container = document.getElementById("produtos");
  container.innerHTML = ""; // limpa antes de renderizar
  produtos.forEach((produto, index) => {
    const idModal = `modal${index}`;
    const idCarousel = `carousel${index}`;

    const card = document.createElement("div");
    card.className = "col-12 col-md-6 col-xxl-4 pb-4";
    card.innerHTML = `
      <div class="card">
        <img src="${
          produto.imagens[0]
        }" class="d-block w-100 carousel-img" alt="${
      produto.nome
    }" data-bs-toggle="modal" data-bs-target="#${idModal}">
        <div class="card-body">
          <h5 class="card-title">${produto.nome}</h5>
          <p class="card-text">${produto.descricao}</p>
          <p>${produto.preco}</p>
          <a href="https://wa.me/5511985658280?text=${encodeURIComponent(
            produto.whatsappMsg
          )}" target="_blank" class="btn botao-claro"><i class="bi bi-basket2"></i></a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}
