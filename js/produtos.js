let listaProdutos = [];
const container = document.getElementById("produtos");

// ---- FAVORITOS UTILITÁRIOS ----
function getFavoritos() {
  return JSON.parse(localStorage.getItem("favoritos")) || [];
}
function salvarFavoritos(favs) {
  localStorage.setItem("favoritos", JSON.stringify(favs));
}

// ---- CARREGAR PRODUTOS ----
fetch("./produtos.json")
  .then((res) => res.json())
  .then((produtos) => {
    listaProdutos = produtos;
    renderizarProdutos(produtos);
  })
  .catch((err) => console.error(err));

function renderizarProdutos(produtos) {
  container.innerHTML = "";
  const favoritos = getFavoritos();

  produtos.forEach((produto, i) => {
    const produtoId = produto.id || i;
    const modalId = `modal${produtoId}`;
    const carrosselId = `carousel${produtoId}`;
    const isFav = favoritos.includes(produtoId);

    const card = document.createElement("div");
    card.className = "col-12 col-md-6 col-xxl-4 pb-4";
    card.innerHTML = `
      <div class="card">
        <img src="${produto.imagens[0]}" 
             class="d-block w-100 carousel-img" 
             alt="${produto.nome}" 
             data-bs-toggle="modal" 
             data-bs-target="#${modalId}">
        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 class="card-title">${produto.nome}</h5>
            <p class="card-text">${produto.descricao}</p>
            <p>${produto.preco}</p>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <button class="btn botao-claro btn-favorito ${
              isFav ? "ativo" : ""
            }" data-id="${produtoId}">
              <i class="bi ${isFav ? "bi-heart-fill" : "bi-heart"}"></i>
            </button>
            <a href="https://wa.me/5511985658280?text=${encodeURIComponent(
              produto.whatsappMsg
            )}" 
               target="_blank" 
               class="btn botao-claro">
              <i class="bi bi-basket2"></i>
            </a>
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);

    // Modal
    const modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = modalId;
    modal.tabIndex = -1;
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title modal-titulo">${produto.nome}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
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
                <span class="carousel-control-prev-icon"></span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#${carrosselId}" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span>
              </button>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn botao-claro btn-secondary" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  });

  // ---- EVENTOS FAVORITAR ----
  document.querySelectorAll(".btn-favorito").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      let favs = getFavoritos();

      if (favs.includes(id)) {
        favs = favs.filter((f) => f !== id);
      } else {
        favs.push(id);
      }

      salvarFavoritos(favs);
      atualizarFavoritosUI();
    });
  });

  atualizarFavoritosUI();
}

// ---- Atualiza cor do coração ----
function atualizarFavoritosUI() {
  const favs = getFavoritos();
  document.querySelectorAll(".btn-favorito").forEach((btn) => {
    const id = btn.dataset.id;
    const icone = btn.querySelector("i");
    if (favs.includes(id)) {
      btn.classList.add("ativo");
      icone.classList.replace("bi-heart", "bi-heart-fill");
    } else {
      btn.classList.remove("ativo");
      icone.classList.replace("bi-heart-fill", "bi-heart");
    }
  });
}
