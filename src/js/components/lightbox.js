// завантажуємо по кліку велику картинку //

import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";
import refs from "../refs";

function loadLightBox(event) {
  event.preventDefault();
  const img = event.target;
  const imgBigUrl = img.currentSrc;

  const instance = basicLightbox.create(
    `<img src= ${imgBigUrl} width="800" height="600">`,
  );
  instance.show();
}

export default loadLightBox;
