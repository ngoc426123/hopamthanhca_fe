import Swiper from 'swiper'
import { Autoplay, Navigation } from 'swiper/modules';

$(() => {
  const $slideCategory = $('.comp-slide-category .swiper');
  const $prev = $('.comp-slide-category__arrow.--prev');
  const $next = $('.comp-slide-category__arrow.--next');
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