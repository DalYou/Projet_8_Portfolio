function portfolioModal (selector, portfolioItems) {
    document.body.innerHTML += `
    <div id="portfolio-item-modal-container">
        <div id="portfolio-item-modal">
            <div id="portfolio-item-modal__close-icon">
                <i class="bi bi-x"></i>
            </div>
            <h2>Titre</h2>
            <img src="" alt=""/>
            <p id="portfolio-item-modal__desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, aliquam!</p>
            <h3>Difficultés rencontrées / moyens de résolution</h3>
            <div class="accordion" id="accordionDifficulties"></div>
        </div>
    </div>
    `;

    const element = document.querySelector(selector);
    let innerHTML = `<div class="container-fluid p-0">
        <div class="row g-0">`;

    const portfolioItemModalContainer = document.getElementById("portfolio-item-modal-container");
    const closeIcon = document.getElementById("portfolio-item-modal__close-icon");

    const title = portfolioItemModalContainer.querySelector("h2");
    const img = portfolioItemModalContainer.querySelector("img");
    const desc = portfolioItemModalContainer.querySelector("p#portfolio-item-modal__desc");
    const difficulitesList = portfolioItemModalContainer.querySelector("#accordionDifficulties");


    for(let i=0;i<portfolioItems.length;i++){
        const portfolioItem = portfolioItems[i];
        const index = i;
        innerHTML += `
        <div class="col-lg-4 col-sm-6">
            <div class="portfolio-item" data-index='${index}'>
                <div class="card" style="width: 18rem;">
                    <img src="${portfolioItem.img}" class="card-dalila-img-top" alt="...">
                    <div class="card-body">
                        <div class="project-category">${portfolioItem.category}</div>
                        <a href="${portfolioItem.link}" target="_blank">Lien GitHub</a>
                        <h5 class="card-title">${portfolioItem.title}</h5>
                        <p class="card-text">${portfolioItem.desc}</p>
                        <button class="btn btn-primary">En savoir plus</button>
                    </div>
                </div>
            </div>
        </div>`;
    }

    innerHTML += `</div></div>`;
    element.innerHTML = innerHTML;

    const portfolioItemElts = document.querySelectorAll(".portfolio-item");
    for(let i = 0; i < portfolioItemElts.length; i++) {
        const portfolioItem = portfolioItems[i];
        portfolioItemElts[i].querySelector("button").addEventListener("click", () => {
            document.body.style.overflow = 'hidden';
            portfolioItemModalContainer.style.left = "0";
            portfolioItemModalContainer.style.top = "0";
            title.innerText = portfolioItem.title;
            img.src = portfolioItem.img;
            desc.innerText = portfolioItem.desc;
            let innerHTMLCollapse = ``;
            portfolioItem.difficulties.forEach((difficulty, index) => {
                innerHTMLCollapse += `
                <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${index}" aria-controls="collapseOne">
                    ${difficulty}
                  </button>
                </h2>
                <div id="collapse-${index}" class="accordion-collapse collapse" data-bs-parent="#accordionDifficulties">
                  <div class="accordion-body">
                   ${portfolioItem.solutions[index]}
                  </div>
                </div>
              </div>`;
            });
            difficulitesList.innerHTML = innerHTMLCollapse;

        });
    }

    closeIcon.addEventListener("click", e => {
        portfolioItemModalContainer.style.left = null;
        portfolioItemModalContainer.style.top = null;
        document.body.style.overflow = null;
    });
}