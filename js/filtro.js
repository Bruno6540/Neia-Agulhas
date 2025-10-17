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

// ===== BUSCA DE PRODUTOS =====
function buscarProdutos(termo) {
  termo = termo.toLowerCase();
  const filtrados = listaProdutos.filter(
    (produto) =>
      produto.nome.toLowerCase().includes(termo) ||
      produto.descricao.toLowerCase().includes(termo) ||
      produto.tipo.toLowerCase().includes(termo)
  );
  renderizarProdutos(filtrados);
}

// eventos para busca desktop e mobile
const inputBusca = document.getElementById("buscaProduto");
const inputBuscaMobile = document.getElementById("buscaProdutoMobile");

if (inputBusca) {
  inputBusca.addEventListener("input", (e) => buscarProdutos(e.target.value));
}
if (inputBuscaMobile) {
  inputBuscaMobile.addEventListener("input", (e) =>
    buscarProdutos(e.target.value)
  );
}

// ===== ORDENAR PRODUTOS =====
const selectOrdenar = document.getElementById("ordenarProdutos");

if (selectOrdenar) {
  selectOrdenar.addEventListener("change", (e) => {
    const criterio = e.target.value;
    let produtosAtuais = Array.from(container.children).map(
      (el, index) => listaProdutos[index]
    );
    let ordenados = [...listaProdutos];

    if (criterio === "nome") {
      ordenados.sort((a, b) => a.nome.localeCompare(b.nome));
    } else if (criterio === "preco") {
      ordenados.sort((a, b) => a.preco - b.preco);
    }

    renderizarProdutos(ordenados);
  });
}
