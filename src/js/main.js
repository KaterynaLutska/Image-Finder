import refs from "./refs";
import cardMarkup from "../templates/card.hbs";
import API from "./services/apiService.js";

refs.searchForm.addEventListener("submit", findCards);
refs.button.addEventListener("click", loadMoreCards);

// функція для відмальовки розмітки //
function renderCard(cardName) {
  const marcup = cardMarkup(cardName);
  refs.gallery.insertAdjacentHTML("beforeend", marcup);
  refs.button.classList.remove("is-hidden");
}

// функція пошуку картинок //
function findCards(event) {
  event.preventDefault();

  refs.spinner.classList.remove("is-hidden");
  refs.button.classList.add("is-hidden");

  const input = refs.searchForm;
  API.query = input.elements.query.value;

  API.fetchCards()
    .then((data) => {
      renderCard(data);
      API.incrementPage();
      refs.spinner.classList.add("is-hidden");
    })
    .catch((error) => {
      console.log(error);
    });
  clearInput();
}

// функція для завантаження більшої к-ті картинок

function loadMoreCards() {
  API.fetchCards().then((data) => {
    renderCard(data);
    API.incrementPage();
    window.scrollBy({
      top: window.innerHeight - 60,
      behavior: "smooth",
    });
  });
}

// функція для очистки форми //

function clearInput() {
  refs.gallery.innerHTML = "";
}
