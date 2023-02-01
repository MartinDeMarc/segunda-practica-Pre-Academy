const containerCharacters = document.getElementById("chararcter-container");

const prev = document.getElementById("prev");
const next = document.getElementById("next");

const searchInput = document.getElementById("searchInput");
const search = document.getElementById("search");

let urlApiRick = "https://rickandmortyapi.com/api/location";

let templateHtml;

const getLocations = async (url) => {
  try {
    const response = await fetch(url);
    const results = await response.json();
    console.log(results);
    dataLocations(results.results);
    spinner.style.display = "none";
  } catch (error) {
    console.log("error");
  }
};

getLocations(urlApiRick);

const dataLocations = async (data) => {
  containerCharacters.innerHTML = "";
  try {
    spinner.style.display = "block";

    for (let index of data) {
      const resp = await fetch(index.url);
      const resul = await resp.json();
      console.log(resul);
      templateHtml = `
    <section id=${resul.id} class="locationCardp character m-3 col">
    <div class="card" style="width: 18rem;">
    <h3 class="card-title p-2">Episode ${resul.name}</h3>
      <div class="card-body bg-info bg-gradient">
       <h5 class="card-title">${resul.type}</h5>
       <h5 class="card-title">${resul.dimension}</h5>
       </div>
     </div>
  </section>
  `;
      containerCharacters.innerHTML += templateHtml;

      const locationCard = document.querySelectorAll(".episodeCard");
      redirectToLocationData(locationCard);
    }
  } catch (error) {
    console.log("error");
  }
};

const redirectToLocationData = (locationCard) => {
  locationCard.forEach((element) => {
    element.addEventListener("click", () => {
      let locationId = element.id;
      localStorage.setItem("locationId", locationId);
      window.location.href = "/views/locationData.html";
    });
  });
};

// Next clicking
let counter = 1;
next.addEventListener("click", () => {
  fetch(`https://rickandmortyapi.com/api/location/?page=${++counter}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      containerCharacters.innerHTML = data.results
        .map(
          (item) => `
            
     <section id=${item.id} class="locationCardp character m-3 col">
    <div class="card" style="width: 18rem;">
    <h3 class="card-title p-2">Episode ${item.name}</h3>
      <div class="card-body bg-info bg-gradient">
       <h5 class="card-title">${item.type}</h5>
       <h5 class="card-title">${item.dimension}</h5>
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
  fetch(`https://rickandmortyapi.com/api/location/?page=${--counter}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      containerCharacters.innerHTML = data.results
        .map(
          (item) => `
            
      <section id=${item.id} class="locationCardp character m-3 col">
    <div class="card" style="width: 18rem;">
    <h3 class="card-title p-2">Episode ${item.name}</h3>
      <div class="card-body bg-info bg-gradient">
       <h5 class="card-title">${item.type}</h5>
       <h5 class="card-title">${item.dimension}</h5>
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
  getLocations(
    `https://rickandmortyapi.com/api/location/?name=${searchInput.value}`
  );
  searchCounter = 1;
});

searchInput.addEventListener("keyup", () => {
  getLocations(
    `https://rickandmortyapi.com/api/location/?name=${searchInput.value}`
  );
  searchCounter = 1;
});

const logout = document.getElementById("logout");

logout.addEventListener("click", () => {
  localStorage.removeItem("userLogin");
  window.location.href = "/index.html";
});
