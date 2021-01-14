import refs from "./refs";
import cardMarkup from "../templates/card.hbs";
import API from "./services/apiService.js";
import notify from "./components/notify.js";
import loadLightBox from "./components/lightbox.js";

refs.searchForm.addEventListener("submit", findCards);
refs.button.addEventListener("click", loadMoreCards);

// функція для відмальовки розмітки //

function renderCard(cardName) {
  const marcup = cardMarkup(cardName);
  refs.gallery.insertAdjacentHTML("beforeend", marcup);
  refs.button.classList.remove("is-hidden");
  refs.gallery.addEventListener("click", loadLightBox);
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
      console.log(data);
      API.incrementPage();
      refs.spinner.classList.add("is-hidden");
      if (data.length > 0 && data.length < 12) {
        refs.button.classList.add("is-hidden");
      } else if (data.length === 0) {
        notify();
        refs.button.classList.add("is-hidden");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  clearInput();
}

// функція для завантаження більшої к-ті картинок

function loadMoreCards() {
  refs.spinner.classList.remove("is-hidden");
  refs.button.classList.add("is-hidden");
  API.fetchCards().then((data) => {
    renderCard(data);

    API.incrementPage();

    refs.spinner.classList.add("is-hidden");
    refs.button.classList.remove("is-hidden");
    window.scrollBy({
      top: window.innerHeight - 40,
      behavior: "smooth",
    });
  });
}

// функція для очистки форми //

function clearInput() {
  refs.gallery.innerHTML = "";
  API.resetPage();
}
