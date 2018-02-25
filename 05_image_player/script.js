const TOTAL_IMAGES = 15,
      FILES = Array.from(Array(TOTAL_IMAGES)).map((d, i) => {
        return `images/photo${i < 10 ? '0' : ''}${i}.jpg`;
      });

      const player = document.querySelector('.player'),
      img = document.querySelector('.img'),
      bar = document.querySelector('.progress-bar'),
      prevButton = document.querySelector('.button[data-sign="-1"]'),
      nextButton = document.querySelector('.button[data-sign="1"]');

let currentIndex = 0, imgURL = '';

const handleResponse = (response, onload) => {
  const reader = response.body.getReader(),
        contentLength = response.headers.get('content-length'),
        total = parseInt(contentLength, 10);
  let received = 0;

  const stream = new ReadableStream({
    start(controller) {
      const push = () => reader.read().then(({ done, value }) => {
        if (done) {
          controller.close();
          return;
        }

        controller.enqueue(value);
        received += value.byteLength;
        onload && onload(received, total);
        return push();
      });
      push();
    }
  });

  return new Response(stream);
};

const loadImage = (url, callbacks) => {
  const { onstart, onload, oncomplete } = callbacks;

  onstart();
  fetch(url)
    .then(response => handleResponse(response, onload))
    .then(response => response.blob())
    .then(blob => URL.createObjectURL(blob))
    .then(url => oncomplete(url))
    .catch(error => console.error('error', error));
};

const onstart = () => {
  player.classList.add('load');
};

const onload = (received, total) => {
  const completed = Math.floor((received / total) * 100);
  bar.style.setProperty('width', `${completed}%`);
};

const oncomplete = url => setImage(url);

const setImage = url => imgURL = url;
const getImage = () => imgURL;

const handleClick = e => {
  const { sign } = e.target.dataset;
  currentIndex += parseInt(sign, 10);
  if (currentIndex < 0) {
    currentIndex = TOTAL_IMAGES - 1;
  } else if (currentIndex >= TOTAL_IMAGES) {
    currentIndex = 0;
  }
  loadImage(FILES[currentIndex], { onstart, onload, oncomplete });
};

bar.addEventListener('transitionend', e => {
  if (e.propertyName !== 'width' || !player.classList.contains('load')) {
    return;
  }
  setTimeout(() => {
    player.classList.remove('load');
    bar.style.setProperty('width', '0');
    img.src = getImage();
  }, 200);
});
prevButton.addEventListener('click', handleClick);
nextButton.addEventListener('click', handleClick);

loadImage(FILES[0], { onstart, onload, oncomplete });
