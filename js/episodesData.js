const containerCharacters = document.getElementById("chararcter-container");

const searchInput = document.getElementById("searchInput");
const search = document.getElementById("search");

const episodeId = localStorage.getItem("episodeId");

let urlApiRick = `https://rickandmortyapi.com/api/episode/${episodeId}`;

let templateHtml;

const dataCharacters = async () => {
  containerCharacters.innerHTML = "";
  try {
    const resp = await fetch(urlApiRick);
    const resul = await resp.json();
    console.log(resul);
    templateHtml = `
    <section class="character m-3 col">
    <div class="card" style="width: 18rem;">
    <h3 class="card-title p-2">Episode: ${resul.id}</h3>
      <div class="card-body bg-info bg-gradient">
       <h5 class="card-title">Name: ${resul.name}</h5>
       <h5 class="card-title">Episode: ${resul.episode}</h5>
       <h5 class="card-title">Air date: ${resul.air_date}</h5>
       </div>
     </div>
  </section>

    <div class="card w-75 m-4 bg-info bg-gradient">
  <div class="card-body">
    <h5 class="card-title">Characters in this episode</h5>
    <p class="card-text"> ${resul.characters}</p>
    
  </div>
</div>
  `;

    containerCharacters.innerHTML += templateHtml;
  } catch (error) {
    console.log("error");
  }
};

dataCharacters();
