export default {
  cardName: "",
  page: 1,

  fetchCards() {
    const BASE_URL =
      "https://pixabay.com/api/?image_type=photo&orientation=horizontal";
    const key = "19832746-997e34a134530cdc6ae578e43";
    return fetch(
      `${BASE_URL}&q=${this.query}&page=${this.page}&per_page=12&key=${key}`,
    )
      .then((response) => response.json())
      .then((data) => data.hits);
  },
  resetPage() {
    this.page = 0;
  },
  incrementPage() {
    this.page += 1;
    console.log(`pages:`, this.page);
  },
  get query() {
    return this.cardName;
  },
  set query(value) {
    this.cardName = value;
  },
};
