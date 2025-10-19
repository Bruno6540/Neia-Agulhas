let listaProdutos = [];
const container = document.getElementById("produtos");

// Funções de favoritos
function getFavoritos() {
  return JSON.parse(localStorage.getItem("favoritos")) || [];
}

function salvarFavoritos(favs) {
  localStorage.setItem("favoritos", JSON.stringify(favs));
}

// Carregar produtos do JSON
fetch("./produtos.json")
  .then((res) => res.json())
  .then((produtos) => {
    listaProdutos = produtos;
    renderizarProdutos(produtos);
  })
  .catch((err) => console.error(err));

// Renderizar produtos
function renderizarProdutos(produtos) {
  container.innerHTML = "";
  const favoritos = getFavoritos();

  produtos.forEach((produto, i) => {
    const produtoId = produto.nome;
    const modalId = `modal${i}`;
    const carrosselId = `carousel${i}`;
    const isFav = favoritos.includes(produtoId);

    // Card do produto
    const card = document.createElement("div");
    card.className = "col-12 col-md-6 col-xxl-4 pb-4";
    card.innerHTML = `
      <div class="card">
        <img src="${
          produto.imagens[0]
        }" class="d-block w-100 carousel-img" alt="${
      produto.nome
    }" data-bs-toggle="modal" data-bs-target="#${modalId}">
        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 class="card-title">${produto.nome}</h5>
            <p class="card-text">${produto.descricao}</p>
            <p>${produto.preco}</p>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <button class="btn botao-claro btn-favorito" data-nome="${produtoId}">
              <i class="bi ${isFav ? "bi-heart-fill" : "bi-heart"}" style="${
      isFav ? "color:red" : ""
    }"></i>
            </button>
            <a href="https://wa.me/5511985658280?text=${encodeURIComponent(
              produto.whatsappMsg
            )}" target="_blank" class="btn botao-claro">
              <i class="bi bi-basket2"></i>
            </a>
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);

    // Modal do produto
    const modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = modalId;
    modal.tabIndex = -1;
    modal.setAttribute("aria-hidden", "true");

    const descricaoModal = produto.descricaoCompleta || produto.descricao;

    modal.innerHTML = `
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header justify-content-center position-relative">
            <h5 class="modal-title modal-titulo">${produto.nome}</h5>
            <button type="button" class="btn-close btn-basket-style position-absolute top-0 end-0 m-3" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div class="modal-body">
            <div id="${carrosselId}" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                ${produto.imagens
                  .map(
                    (img, idx) => `
                  <div class="carousel-item ${idx === 0 ? "active" : ""}">
                    ${
                      img.endsWith(".mp4")
                        ? `<video class="d-block w-100" controls><source src="${img}" type="video/mp4"></video>`
                        : `<img src="${img}" class="d-block w-100" alt="${produto.nome}">`
                    }
                  </div>
                `
                  )
                  .join("")}
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#${carrosselId}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Anterior</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#${carrosselId}" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Próximo</span>
              </button>
            </div>
            <p class="mt-3">${descricaoModal}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn botao-claro" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Inicializa o modal com Bootstrap
    new bootstrap.Modal(modal);
  });

  // Evento de favoritos
  document.querySelectorAll(".btn-favorito").forEach((btn) => {
    btn.addEventListener("click", () => {
      const nome = btn.getAttribute("data-nome");
      let favs = getFavoritos();
      if (favs.includes(nome)) {
        favs = favs.filter((f) => f !== nome);
      } else {
        favs.push(nome);
      }
      salvarFavoritos(favs);
      renderizarProdutos(produtos);
    });
  });
}
