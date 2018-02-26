const images = document.querySelectorAll('.image-space');

const handleEnter = e => {
  const img = e.target;
  const { offsetX, offsetY } = e,
        { width, height } = img.getBoundingClientRect();

  const dLeft   = offsetX,
        dTop    = offsetY,
        dRight  = width - offsetX,
        dBottom = height - offsetY,
        distance = [dLeft, dTop, dRight, dBottom],
        nearest = distance.indexOf(Math.min(...distance));

  let axis, deg;
  switch (nearest) {
    case 0:
      axis = 'Y';
      deg = [-90, 0, 90];
      break;
    case 1:
      axis = 'X';
      deg = [90, 0, -90];
      break;
    case 2:
      axis = 'Y';
      deg = [90, 0, -90];
      break;
    case 3:
      axis = 'X';
      deg = [-90, 0, 90];
      break;
    default:
      break;
  }
  document.documentElement.style.setProperty('--start', `rotate${axis}(${deg[0]}deg)`);
  document.documentElement.style.setProperty('--mid', `rotate${axis}(${deg[1]}deg)`);
  document.documentElement.style.setProperty('--end', `rotate${axis}(${deg[2]}deg)`);

  img.classList.remove('rotation');
  img.innerText;
  img.classList.add('rotation');
};

images.forEach(img => img.addEventListener('mouseenter', handleEnter));
