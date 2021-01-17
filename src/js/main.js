import refs from "./refs";
import cardMarkup from "../templates/card.hbs";
import API from "./services/apiService.js";
import notify from "./components/notify.js";
import loadLightBox from "./components/lightbox.js";
import button from "./components/button.js";
import spinner from "./components/spinner.js";

refs.searchForm.addEventListener("submit", findCards);
refs.button.addEventListener("click", loadMoreCards);
console.dir(refs);

// функція для відмальовки розмітки галереї, приховує кнопку, яка довантажує фото //

function renderCard(cardName) {
  const marcup = cardMarkup(cardName);
  refs.gallery.insertAdjacentHTML("beforeend", marcup);
  button.show();

  refs.gallery.addEventListener("click", loadLightBox);
}

// функція пошуку картинок //
function findCards(event) {
  event.preventDefault();

  button.hide();
  spinner.show();

  const input = refs.searchForm;
  API.query = input.elements.query.value;
  clearInput();

  API.fetchCards()
    .then((data) => {
      renderCard(data);

      spinner.hide();
      button.show();

      console.log(API.isLastPage);
      console.log("загальна кількість", API.totalPages);
      console.log("теперішня", API.page);

      if (API.isLastPage) {
        button.hide();
        console.log("last page");
        console.log("загальна кількість", API.totalPages);
        console.log("теперішня", API.page);
      } else {
        button.show();
        spinner.hide();

        console.log("show page");
        console.log("загальна кількість", API.totalPages);
        console.log("теперішня", API.page);
      }
      if (!API.isLastPage) {
        button.hide();
      }
    })
    .catch((error) => {
      //refs.button.classList.add("is-hidden");
      console.log(error);
    });
}

// функція для завантаження більшої к-ті картинок

function loadMoreCards() {
  button.hide();
  spinner.show();
  API.incrementPage();

  API.fetchCards().then((data) => {
    renderCard(data);

    button.show();
    spinner.hide();

    console.log("загальна кількість", API.totalPages);
    console.log("теперішня", API.page);
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
