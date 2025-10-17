let listaProdutos = []; // array global para armazenar os produtos
const container = document.getElementById("produtos");

fetch("./produtos.json")
  .then((response) => response.json())
  .then((produtos) => {
    listaProdutos = produtos; // salva os produtos para usar nos filtros
    renderizarProdutos(produtos); // renderiza todos os produtos inicialmente
  })
  .catch((err) => console.error(err));

function renderizarProdutos(produtos) {
  container.innerHTML = ""; // limpa antes de renderizar
  produtos.forEach((produto, index) => {
    const idModal = `modal${index}`;
    const idCarousel = `carousel${index}`;

    // Card
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

    // Modal com carousel
    const modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = idModal;
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
            <div id="${idCarousel}" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                ${produto.imagens
                  .map((item, i) => {
                    const isActive = i === 0 ? "active" : "";
                    if (item.endsWith(".mp4")) {
                      return `
                        <div class="carousel-item ${isActive}">
                          <video class="d-block w-100" controls>
                            <source src="${item}" type="video/mp4">
                          </video>
                        </div>
                      `;
                    } else {
                      return `
                        <div class="carousel-item ${isActive}">
                          <img src="${item}" class="d-block w-100 carousel-img" alt="${produto.nome}">
                        </div>
                      `;
                    }
                  })
                  .join("")}
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#${idCarousel}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Anterior</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#${idCarousel}" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Próximo</span>
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
}
