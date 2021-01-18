import button from "../components/button";
import notify from "../components/notify";

export default {
  cardName: "",
  page: 1,
  perPage: 12,
  totalPages: 0,
  isLastPage: false,

  fetchCards() {
    const BASE_URL =
      "https://pixabay.com/api/?image_type=photo&orientation=horizontal";
    const key = "19832746-997e34a134530cdc6ae578e43";
    return fetch(
      `${BASE_URL}&q=${this.query}&page=${this.page}&per_page=${this.perPage}&key=${key}`,
    )
      .then((response) => response.json())
      .then(({ hits, totalHits }) => {
        this.totalPages = Math.ceil(totalHits / this.perPage);

        //   перевіряємо умови на останню сторінку

        if (this.totalPages === this.page) {
          this.isLastPage = true;
        } else {
          this.isLastPage = false;
        }
        if (this.totalPages === 0) {
          console.log(this.totalPages);
          button.hide();
          notify();
          return;
        }
        return hits;
      });
  },
  resetPage() {
    this.page = 1;
  },
  incrementPage() {
    this.page += 1;
  },
  get query() {
    return this.cardName;
  },
  set query(value) {
    this.cardName = value;
  },
};
