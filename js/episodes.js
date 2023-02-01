const containerCharacters = document.getElementById("chararcter-container");

const prev = document.getElementById("prev");
const next = document.getElementById("next");

const searchInput = document.getElementById("searchInput");
const search = document.getElementById("search");

let urlApiRick = "https://rickandmortyapi.com/api/episode";

let templateHtml;

const getEpisodes = async (url) => {
  try {
    const response = await fetch(url);
    const results = await response.json();
    console.log(results);
    dataEpisodes(results.results);
    spinner.style.display = "none";
  } catch (error) {
    console.log("error");
  }
};

getEpisodes(urlApiRick);

const dataEpisodes = async (data) => {
  containerCharacters.innerHTML = "";
  try {
    spinner.style.display = "block";
    for (let index of data) {
      const resp = await fetch(index.url);
      const resul = await resp.json();
      console.log(resul);
      templateHtml = `
    <section class="character m-3 col">
    <div class="card" style="width: 18rem;">
    <h3 class="card-title p-2">Episode: ${resul.id}</h3>
      <div id=${resul.id} class="episodeCard card-body bg-info bg-gradient">
       <h5 class="card-title">${resul.name}</h5>
       <h5 class="card-title">${resul.episode}</h5>
       <h5 class="card-title">${resul.air_date}</h5>
       </div>
     </div>
  </section>
  `;
      containerCharacters.innerHTML += templateHtml;

      const episodeCard = document.querySelectorAll(".episodeCard");
      redirectToEpisodeData(episodeCard);
    }
  } catch (error) {
    console.log("error");
  }
};

const redirectToEpisodeData = (episodeCard) => {
  episodeCard.forEach((element) => {
    element.addEventListener("click", () => {
      let episodeId = element.id;
      localStorage.setItem("episodeId", episodeId);
      window.location.href = "/views/episodesData.html";
    });
  });
};

// Next clicking

let counter = 1;
next.addEventListener("click", () => {
  fetch(`https://rickandmortyapi.com/api/episode/?page=${++counter}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      containerCharacters.innerHTML = data.results
        .map(
          (item) => `
            
    <section class="character m-3 col">
    <div class="card" style="width: 18rem;">
    <h3 class="card-title p-2">Episode: ${item.id}</h3>
      <div ${item.id} class="episodeCardp card-body bg-info bg-gradient">
       <h5 class="card-title">${item.name}</h5>
       <h5 class="card-title">${item.episode}</h5>
       <h5 class="card-title">${item.air_date}</h5>
       </div>
     </div>
  </section>
            
            `
        )
        .join("");
    });
});

// Prev clicking
prev.addEventListener("click", () => {
  fetch(`https://rickandmortyapi.com/api/episode/?page=${--counter}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      containerCharacters.innerHTML = data.results
        .map(
          (item) => `
            
   <section class="character m-3 col">
    <div class="card" style="width: 18rem;">
    <h3 class="card-title p-2">Episode: ${item.id}</h3>
      <div ${item.id} class="episodeCardp card-body bg-info bg-gradient">
       <h5 class="card-title">${item.name}</h5>
       <h5 class="card-title">${item.episode}</h5>
       <h5 class="card-title">${item.air_date}</h5>
       </div>
     </div>
  </section>
            
            `
        )
        .join("");
    });
});

let searchCounter = 1;

search.addEventListener("click", () => {
  getEpisodes(
    `https://rickandmortyapi.com/api/episode/?episode=${searchInput.value}`
  );
  searchCounter = 1;
});

searchInput.addEventListener("keyup", () => {
  getEpisodes(
    `https://rickandmortyapi.com/api/episode/?episode=${searchInput.value}`
  );
  searchCounter = 1;
});

const logout = document.getElementById("logout");

logout.addEventListener("click", () => {
  localStorage.removeItem("userLogin");
  window.location.href = "/index.html";
});
