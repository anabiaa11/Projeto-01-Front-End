window.onload = function () {
  const apiKey = "10afc860284718cf8503d9b103142b63";
  const baseImgUrl = "https://image.tmdb.org/t/p/w500";

  // 1. FILMES POPULARES - DESTAQUES
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`)
    .then(res => res.json())
    .then(data => {
      const grid = document.querySelector("#destaques .grid");
      grid.innerHTML = "";

      data.results.slice(0, 6).forEach(filme => {
        const card = document.createElement("div");
        card.className = "card destaque";

        card.innerHTML = `
          <img src="${baseImgUrl + filme.poster_path}" alt="${filme.title}" />
          <h3>${filme.title}</h3>
          <p>${filme.release_date.split("-")[0]} • Filme</p>
        `;

        grid.appendChild(card);
      });
    });

  // 2. FILMES EM DESTAQUE - CARROSSEL
  fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=pt-BR`)
    .then(res => res.json())
    .then(data => {
      const carrossel = document.querySelector("#carrossel-filmes .carrossel");
      carrossel.innerHTML = "";

      data.results.slice(0, 3).forEach(filme => {
        const card = document.createElement("div");
        card.className = "filme-card";

        card.innerHTML = `
          <img src="${baseImgUrl + filme.poster_path}" alt="${filme.title}"  height="400px"/>
          <h3>${filme.title}</h3>
          <p>${filme.release_date.split("-")[0]} • FILME</p>
        `;

        carrossel.appendChild(card);
      });
    });

  // 3. SÉRIES POPULARES
  fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=pt-BR`)
    .then(res => res.json())
    .then(data => {
      const container = document.querySelector("#series .card-container");
      if (!container) return;

      data.results.slice(0, 6).forEach(serie => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <img src="${baseImgUrl + serie.poster_path}" alt="${serie.name}" />
          <h3>${serie.name}</h3>
          <p>${serie.first_air_date ? new Date(serie.first_air_date).toLocaleDateString("pt-BR") : "Data desconhecida"}</p>
        `;

        container.appendChild(card);
      });
    })
    .catch(error => console.error("Erro ao carregar séries populares:", error));
};
