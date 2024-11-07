const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');

let currentIndex = 0;
const itemWidth = items[0].getBoundingClientRect().width;

function moveCarouselTo(index) {
  track.style.transform = 'translateX(-' + itemWidth * index + 'px)';
  currentIndex = index;
}

nextButton.addEventListener('click', () => {
  if (currentIndex < items.length - 1) {
    moveCarouselTo(currentIndex + 1);
  } else {
    moveCarouselTo(0); // Loop back to start
  }
});

prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    moveCarouselTo(currentIndex - 1);
  } else {
    moveCarouselTo(items.length - 1); // Loop to end
  }
});
