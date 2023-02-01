// import listEpisodeDetail from "/js/character";

const containerCharacters = document.getElementById("chararcter-container");

const searchInput = document.getElementById("searchInput");
const search = document.getElementById("search");

const characterId = localStorage.getItem("characterId");

let urlApiRick = `https://rickandmortyapi.com/api/character/${characterId}`;

let templateHtml;

const dataCharacters = async () => {
  containerCharacters.innerHTML = "";
  try {
    const resp = await fetch(urlApiRick);
    const resul = await resp.json();
    console.log(resul);
    templateHtml = `
    <section class="character m-3 col">
    <div class="card" id="maincontainer" style="width: 18rem;">
    <img src=${resul.image} width="200px" class="card-img-top" alt="...">
    <div class="card-body bg-info bg-gradient">
    <h3 class="card-title">Character info</h3>
    <h5 class="card-title">Name: ${resul.name}</h5>
    <h5 class="card-title">Status: ${resul.status}</h5>
    <h5 class="card-title">Species: ${resul.species}</h5>
    <h5 class="card-title">Gender: ${resul.gender}</h5>
    <h5 class="card-title">Origin: ${resul.origin.name}</h5>
    <h5 class="card-title">Location: ${resul.location.name}</h5>
    </div>
    </div>
    </section>


    <div class="card w-75 m-3 bg-info bg-gradient">
  <div class="cardData card-body">
    <h5 class="card-title">List of Episodes apperances</h5>
    <p class="card-text">${resul.episode}</p

    
  </div>
</div>
      `;

  

    containerCharacters.innerHTML += templateHtml;
  } catch (error) {
    console.log("error");
  }
};

dataCharacters();

const logout = document.getElementById("logout");

logout.addEventListener("click", () => {
  localStorage.removeItem("userLogin");
  window.location.href = "/index.html";
});
