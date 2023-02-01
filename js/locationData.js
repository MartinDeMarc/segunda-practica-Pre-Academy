const containerCharacters = document.getElementById("chararcter-container");

const searchInput = document.getElementById("searchInput");
const search = document.getElementById("search");

const locationId = localStorage.getItem("locationId");

let urlApiRick = `https://rickandmortyapi.com/api/location/${locationId}`;

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
    <h3 class="card-title p-2">Episode ${resul.name}</h3>
      <div class="card-body bg-info bg-gradient">
       <h5 class="card-title">Type: ${resul.type}</h5>
       <h5 class="card-title">Dimension: ${resul.dimension}</h5>
       </div>
     </div>
  </section>
  
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
