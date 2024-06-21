const $personajesContainer = document.getElementById("personajes");
const $noResults = document.getElementById("no-results");

function createCardPersonaje(personaje) {
  let srcImage;
  if (personaje.image) {
    srcImage = personaje.image;
  } else {
    srcImage = "./img/No_Image_Available.jpg";
   
  }

  $personajesContainer.innerHTML += `
    <div id="card-personaje">   
      <img src="${srcImage}" alt="imagen de ${personaje.name}">
      <h4>${personaje.name}</h4>
      <p><strong>Género:</strong> ${personaje.gender}</p>
      <p><strong>Fecha de Nacimiento:</strong> ${personaje.yearOfBirth}</p>
      <p><strong>Raza:</strong> ${personaje.ancestry}</p>
      <p><strong>Casa:</strong> ${personaje.house}</p>
      <p><strong>Patronus:</strong> ${personaje.patronus}</p>
    </div>
  `;
}

function includeName(personaje, name) {
  const str = personaje.name.toLowerCase();
  if (str.includes(name.toLowerCase())) {
    return personaje;
  }
}

function fetching(name) {
  $personajesContainer.innerHTML = "#";
  fetch("https://hp-api.onrender.com/api/characters")
    .then((respuesta) => respuesta.json())
    .then((data) => {
      let personajes;
      if (name) {
        personajes = data.filter((personaje) => includeName(personaje, name));
      } else {
        personajes = data;
      }

      if (personajes.length > 0) {
        personajes.forEach(createCardPersonaje);
        $noResults.innerHTML = ``;
      } else {
        $personajesContainer.innerHTML = ``;
        $noResults.innerHTML = `<h1>Nor found.</h1>`;
      }
    });
}

function refresh() {
  const searchInput = document.getElementById('buscador');
  searchInput.value = "";
  fetching();
}

function search() {
  const searchInput = document.getElementById('buscador');
  if (searchInput.value) {
    const searched = searchInput.value.toLowerCase();
    fetching(searched);
  }
}

fetching();
