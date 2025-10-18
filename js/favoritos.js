const containerFav = document.getElementById("favoritosContainer");

function getFavoritos() {
  return JSON.parse(localStorage.getItem("favoritos")) || [];
}

// Atualiza coração no favoritos (para permitir desfavoritar)
function atualizarFavoritosUI() {
  const favs = getFavoritos();
  document.querySelectorAll(".btn-favorito").forEach((btn) => {
    const id = btn.dataset.id;
    const icone = btn.querySelector("i");
    if (favs.includes(id)) {
      btn.classList.add("ativo");
      icone.classList.replace("bi-heart", "bi-heart-fill");
      icone.style.color = "red";
    } else {
      btn.classList.remove("ativo");
      icone.classList.replace("bi-heart-fill", "bi-heart");
      icone.style.color = "";
    }
  });
}

// Carrega produtos do JSON e filtra os favoritos
fetch("./produtos.json")
  .then((res) => res.json())
  .then((produtos) => {
    const favIds = getFavoritos();
    const favoritos = produtos.filter((p, i) => favIds.includes(i.toString()));

    if (favoritos.length === 0) {
      containerFav.innerHTML = `
        <div class="text-center py-5">
          <h4>Nenhum produto favoritado ainda 💔</h4>
          <a href="./index.html" class="btn botao-claro mt-3">Ver produtos</a>
        </div>
      `;
      return;
    }

    favoritos.forEach((produto, i) => {
      const modalId = `modalFav${i}`;
      const carrosselId = `carouselFav${i}`;

      // Card
      const card = document.createElement("div");
      card.className = "col-12 col-md-6 col-xxl-4 pb-4";
      card.innerHTML = `
        <div class="card">
          <img src="${produto.imagens[0]}" class="d-block w-100" alt="${
        produto.nome
      }" data-bs-toggle="modal" data-bs-target="#${modalId}">
          <div class="card-body d-flex flex-column justify-content-between">
            <div>
              <h5 class="card-title">${produto.nome}</h5>
              <p>${produto.preco}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <button class="btn botao-claro btn-favorito ativo" data-id="${i}">
                <i class="bi bi-heart-fill" style="color:red"></i>
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
      containerFav.appendChild(card);

      // Modal
      const modal = document.createElement("div");
      modal.className = "modal fade";
      modal.id = modalId;
      modal.innerHTML = `
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${produto.nome}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
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
                    </div>`
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
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    });

    // Permite remover favorito direto da aba favoritos
    document.querySelectorAll(".btn-favorito").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        let favs = getFavoritos();
        favs = favs.filter((f) => f !== id);
        localStorage.setItem("favoritos", JSON.stringify(favs));
        btn.closest(".col-12").remove(); // remove o card da tela
      });
    });

    atualizarFavoritosUI();
  });
