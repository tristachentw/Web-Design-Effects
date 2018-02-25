const RADIUS = 320,
      RATIO_AXIS = 0.2,
      RATIO_SPEED = 0.1,
      MAX_SPEED = 30;

const container = document.querySelector('.container'),
      items = document.querySelectorAll('.item');
      middleX = container.getBoundingClientRect().width / 2;
      middleY = container.getBoundingClientRect().height / 2;

const data = [];
let ds = MAX_SPEED;

const rotate = (delta = 0) => {
  items.forEach((item, i) => {
    if (data[i].angle >= 360 || data[i].angle <= 0) {
      const da = data[i].angle % 360;
      const dy = da - 90;
      data[i].angle = da;
      item.classList.add('stop-effect');
      item.style.setProperty('transform', `rotateY(${dy}deg)`);
      item.innerText; //trigger a reflow
      item.classList.remove('stop-effect');
    }
    const angle = data[i].angle + delta,
          rad = -angle * Math.PI / 180,
          sin = Math.sin(rad),
          cos = Math.cos(rad),
          x = middleX + cos * RADIUS - data[i].width / 2,
          y = middleY + sin * RADIUS * RATIO_AXIS - data[i].height / 2,
          z = Math.round((sin + 1) * ((items.length - 1) / 2)); //sin: -1~1 > z: 0~lens-1
          alpha = (sin + 1) * 0.9 + 0.1, //sin: -1~1 > alpha: 0.1~1.9
          rotateY = angle - 90, //angle: 0~360 > rotateY: -90~270
    data[i].angle = angle;
    item.style.setProperty('left', `${x}px`);
    item.style.setProperty('top', `${y}px`);
    item.style.setProperty('z-index', z);
    item.style.setProperty('opacity', alpha);
    item.style.setProperty('transform', `rotateY(${rotateY}deg)`);
  });
};

const handleHover = e => {
  const { clientX } = e;
  ds = (clientX - middleX) * RATIO_SPEED;
  ds = Math.abs(ds) < MAX_SPEED ? ds : Math.sign(ds) * MAX_SPEED;
};

//initial
items.forEach((item, i) => {
  data[i] = {
    angle: 360 / items.length * i,
    width: item.getBoundingClientRect().width,
    height: item.getBoundingClientRect().height
  };
});
rotate();

setInterval(() => rotate(ds), 350);
container.addEventListener('mousemove', handleHover);
