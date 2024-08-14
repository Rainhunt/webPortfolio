import { countries, search, reset } from "./countries.js";

const searchInput = document.querySelector("#search");

searchInput.addEventListener("keyup", (event) => {
  reset();
  cardsDiv.innerHTML = "";
  search(event.target.value.trim());
  createCardList();

  //   if (event.target.value == "") {
  //     createCardList();
  //     console.log("im here!");
  //   } else {
  //     search(event.target.value);
  //     createCardList();
  //   }
});
const cardsDiv = document.getElementById("cards");

export const createCard = (country) => {
  const card = document.createElement("div");
  card.className = "card shadow-lg m-2 col-md-3 col-sm-12";

  const cardImg = document.createElement("img");
  cardImg.className = "card-img-top mt-2 border-rounded";
  cardImg.src = country.flags.png;

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = country.name.common;

  const population = document.createElement("p");
  population.className = "card-text";
  population.textContent = `Population: ${country.population.toLocaleString()}`;

  const cardFooter = document.createElement("div");
  cardFooter.className = "card-footer d-flex justify-content-center mb-2";

  const countryLog = JSON.parse(localStorage.getItem("countryLog")) || {};
  const heart = document.createElement("i");
  heart.className = countryLog[country.cca2] === "liked" ? "bi bi-heart-fill" : "bi bi-heart";

  heart.addEventListener("click", () => {
    const countryLog = JSON.parse(localStorage.getItem("countryLog")) || {};
    if (heart.className === "bi bi-heart") {
      heart.className = "bi bi-heart-fill";
      countryLog[country.cca2] = "liked";
    } else {
      heart.className = "bi bi-heart";
      delete countryLog[country.cca2];
    }
    localStorage.setItem("countryLog", JSON.stringify(countryLog));
  });

  card.appendChild(cardImg);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(population);
  cardFooter.appendChild(heart);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);
  cardsDiv.appendChild(card);
};

export const createCardList = () => {
  for (const country of countries) {
    createCard(country);
  }
};
