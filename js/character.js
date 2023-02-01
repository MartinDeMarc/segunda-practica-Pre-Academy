const containerCharacters = document.getElementById("chararcter-container");

const prev = document.getElementById("prev");
const next = document.getElementById("next");

const searchInput = document.getElementById("searchInput");
const search = document.getElementById("search");

const spinner = document.getElementById("spinner");

const urlApiRick = "https://rickandmortyapi.com/api/character/";

let templateHtml;

const getCharacters = async (url) => {
  try {
    const response = await fetch(url);
    const results = await response.json();
    console.log(results);
    dataCharacters(results.results);

    spinner.style.display = "none";
  } catch (error) {
    console.log("error");
  }
};

getCharacters(urlApiRick);

export const dataCharacters = async (data) => {
  containerCharacters.innerHTML = "";
  try {
    spinner.style.display = "block";

    for (let index of data) {
      const resp = await fetch(index.url);
      const resul = await resp.json();
      console.log(resul);
      templateHtml = `
    <section id="cardasd" class="character m-3 col">
    <div class="card"  style="width: 18rem;">
     <img id=${resul.id} src=${resul.image}  width="200px" class="charactersImg id card-img-top" alt="...">
      <div class="card-body bg-info bg-gradient">
       <h5 class="card-title">${resul.name}</h5>
       </div>
     </div>
  </section>
  `;

      containerCharacters.innerHTML += templateHtml;

      const characterImg = document.querySelectorAll(".charactersImg");
      redirectToCharacterData(characterImg);
    }
  } catch (error) {
    console.log("error");
  }
};

//function select character & redirect

const redirectToCharacterData = (characterImg) => {
  characterImg.forEach((element) => {
    element.addEventListener("click", () => {
      let characterId = element.id;
      localStorage.setItem("characterId", characterId);
      window.location.href = "/views/characterData.html";
    });
  });
};



// Next clicking
let counter = 1;
next.addEventListener("click", () => {
  try {
    fetch(`https://rickandmortyapi.com/api/character/?page=${++counter}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        containerCharacters.innerHTML = data.results
          .map(
            (item) => `
            
                 <section class="character m-3 col">
    <div class="card" id="maincontainer" style="width: 18rem;">
      <img id=${item.id} src=${item.image} width="200px" class="charactersImg card-img-top" alt="...">
      <div class="card-body bg-info bg-gradient">
       <h5 class="card-title">${item.name}</h5>
       </div>
     </div>
  </section>
            
  `
          )
          .join("");
      });
  } catch (error) {
    console.log(error);
  }
});

// Prev clicking
prev.addEventListener("click", () => {
  try {
    fetch(`https://rickandmortyapi.com/api/character/?page=${--counter}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        containerCharacters.innerHTML = data.results
          .map(
            (item) => `
      
      <section class="character m-3 col">
      <div class="card" id="maincontainer" style="width: 18rem;">
      <img id=${item.id} src=${item.image} width="200px" class="charactersImg card-img-top" alt="...">
      <div class="card-body bg-info bg-gradient">
      <h5 class="card-title">${item.name}</h5>
      </div>
      </div>
      </section>
      
      `
          )
          .join("");
      });
  } catch (error) {
    console.log(error);
  }
});

let searchCounter = 1;

search.addEventListener("click", () => {
  getCharacters(
    `https://rickandmortyapi.com/api/character/?name=${searchInput.value}`
  );
  searchCounter = 1;
});

searchInput.addEventListener("keyup", () => {
  getCharacters(
    `https://rickandmortyapi.com/api/character/?name=${searchInput.value}`
  );
  searchCounter = 1;
});

const logout = document.getElementById("logout");

logout.addEventListener("click", () => {
  localStorage.removeItem("userLogin");
  window.location.href = "/index.html";
});

// export default listEpisodeDetail;
