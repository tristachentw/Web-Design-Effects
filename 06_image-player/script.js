const images = document.querySelectorAll('.img');

images.forEach(img => {
  img.addEventListener('mouseenter', () => {
    const { naturalWidth, naturalHeight, clientHeight} = img,
          basis = naturalWidth / naturalHeight * clientHeight;
    document.documentElement.style.setProperty('--basis', `${basis}px`);
  });
});
