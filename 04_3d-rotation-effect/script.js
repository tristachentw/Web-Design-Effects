const CONTAINER_W = 414,
      CONTAINER_H = 315,
      FRUIT_SIZE = 75,
      MIN_RADIUS = 20,
      MAX_RADIUS = 75,
      RATIO_SPEED = 0.1,
      MAX_SPEED = 50;

const container = document.querySelector('.container_viewport'),
      items = document.querySelectorAll('.item'),
      containerL = container.getBoundingClientRect().left,
      containerW = container.getBoundingClientRect().width,
      middleX = containerL + containerW / 2;

const data = [];
let ds = MAX_SPEED;

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const rotate = (delta = 0) => {
  items.forEach((item, i) => {
    const value = data[i];
    const angle = (value.angle + delta) % 360,
          rad = angle * Math.PI / 180,
          sin = Math.sin(rad),
          cos = Math.cos(rad),
          x = value.x + cos * value.radius,
          y = value.y + value.sign * cos * value.radius,
          z = Math.round((sin + 1) * ((items.length - 1) / 2)); //sin: -1~1 > z: 0~lens-1
          alpha = sin * 0.9 + 1, //sin: -1~1 > alpha: 0.1~1.9
          scale = sin * 0.4 + 0.6; //sin: -1~1 > scale: 0.2~1
    value.angle = angle;
    item.style.setProperty('left', `${x}px`);
    item.style.setProperty('top', `${y}px`);
    item.style.setProperty('z-index', z);
    item.style.setProperty('opacity', alpha);
    item.style.setProperty('transform', `scale(${scale})`);
  });
};

const handleHover = e => {
  const { clientX } = e;
  ds += (clientX - middleX) * RATIO_SPEED;
  ds = Math.abs(ds) < MAX_SPEED ? ds : Math.sign(ds) * MAX_SPEED;
};

//initial
items.forEach((item, i) => {
  data[i] = {
    angle: random(0, 360),
    radius: random(MIN_RADIUS, MAX_RADIUS),
    x: random(MIN_RADIUS, CONTAINER_W - FRUIT_SIZE - MIN_RADIUS),
    y: random(MIN_RADIUS, CONTAINER_H - FRUIT_SIZE - MIN_RADIUS),
    sign: i % 2 === 0 ? 1 : -1
  };
});
rotate(0);

setInterval(() => rotate(ds), 100);
document.body.addEventListener('mousemove', handleHover);
