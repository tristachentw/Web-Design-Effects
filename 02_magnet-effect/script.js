const DELTA = 10;
const containers = document.querySelector('.container'),
      items = document.querySelectorAll('.item');

//store coordinate of item
const coords = [];

items.forEach((item, i) => {
  const { left, right, top, bottom, width, height } = item.getBoundingClientRect();
  coords[i] = {
    left: left - DELTA + window.scrollX,
    right: right + DELTA + window.scrollX,
    top: top - DELTA + window.scrollY,
    bottom: bottom + DELTA + window.scrollY,
    middleX: left + width / 2 + window.scrollX,
    middleY: top + height / 2 + window.scrollY
  };
});

const handleMove = e => {
  const { clientX, clientY } = e;
  const left = clientX + window.scrollX,
        top = clientY + window.scrollY;

  items.forEach((item, i) => {
    const isMatch = coords[i].left < left && left < coords[i].right &&
                    coords[i].top < top && top < coords[i].bottom;

    if (isMatch) {
      const dx = left - coords[i].middleX,
            dy = top - coords[i].middleY;
      item.style.setProperty('transform', `translate(${dx}px, ${dy}px`);
      item.style.setProperty('z-index', 1);
    } else {
      item.style.setProperty('transform', `translate(0, 0)`);
      item.style.setProperty('z-index', 0);
    }
  });
};

containers.addEventListener('mousemove', handleMove);
