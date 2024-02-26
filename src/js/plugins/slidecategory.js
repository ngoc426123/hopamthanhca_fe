import Swiper from 'swiper'
import { Autoplay, Navigation } from 'swiper/modules';

$(() => {
  const $slideCategory = $('.slide-category .swiper');
  const $prev = $('.slide-category .--prev');
  const $next = $('.slide-category .--next');
  new Swiper($slideCategory[0], {
    modules: [Autoplay, Navigation],
    slidesPerView: 1,
    autoplay: {
      pauseOnMouseEnter: true,
      delay: 5000,
    },
    navigation: {
      prevEl: $prev[0],
      nextEl: $next[0],
    },
    breakpoints: {
      560: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 5,
      },
      1400: {
        slidesPerView: 6,
      }
    }
  });
})