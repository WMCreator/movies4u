const bannerContainer = document.querySelector('.banner__container');
const movieWidth = document.querySelector('.movie').offsetWidth;
const dotsContainer = document.querySelector('.dots_container');
const dots = dotsContainer.querySelectorAll('.dot');

const interval = 5000; 

function scrollSlider() {
  const scrollPosition = bannerContainer.scrollLeft;

  const newPosition = scrollPosition + movieWidth;

  bannerContainer.scrollTo({
    left: newPosition,
    behavior: 'smooth'
  });

  if (newPosition >= bannerContainer.scrollWidth - bannerContainer.offsetWidth) {
    bannerContainer.scrollTo({
      left: 0,
      behavior: 'smooth'
    });
  }
}

let scrollTimer = null;

function identifyCurrentBanner() {
    clearTimeout(scrollTimer);
    
    scrollTimer = setTimeout(() => {
      currentBannerIndex = Math.floor(bannerContainer.scrollLeft / movieWidth);
      
      updateBannerDots();
    }, 200); 
  }
  
  function updateBannerDots() {
    dots.forEach((dot, index) => {
      if (index === currentBannerIndex) {
        dot.classList.add('dot--active');
      } else {
        dot.classList.remove('dot--active');
      }
    });
  }
  
bannerContainer.addEventListener('scroll', identifyCurrentBanner);

setInterval(scrollSlider, interval);