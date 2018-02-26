const items = document.querySelectorAll('.item'),
      playerImage = document.querySelector('.player-image');

const order = ['1st', '2nd', '3th'];

const changePreviewer = (fn, idx) => {
  order.forEach((name, i) => {
    if (items[idx - i]) {
      items[idx - i].classList[fn](`largest-${name}`);
    }
    if (items[idx + i]) {
      items[idx + i].classList[fn](`largest-${name}`);
    }
  });
};

const handleEnter = e => {
  changePreviewer('add', parseInt(e.target.dataset.i, 10));
};

const handleLeave = e => {
  changePreviewer('remove', parseInt(e.target.dataset.i, 10));
};

const handleClick = e => {
  playerImage.classList.remove('load');
  setTimeout(() => {
    playerImage.src = e.target.src;
    playerImage.classList.add('load');
  }, 200);
};

items.forEach(item => {
  item.addEventListener('mouseenter', handleEnter);
  item.addEventListener('mouseleave', handleLeave);
  item.addEventListener('click', handleClick);
});
