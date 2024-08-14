import Swiper from 'swiper'
import { Autoplay, Navigation } from 'swiper/modules';

@Plugin({
  options: {
    dataSlidePrev: '[data-slide-prev]',
    dataSlideNext: '[data-slide-next]',
    slideOptions: {
      modules: [Autoplay, Navigation],
      slidesPerView: 1,
      autoplay: {
        pauseOnMouseEnter: true,
        delay: 5000,
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
    }
  }
})
export default class SlideCategory {
  init () {
    this.initDOM();
    this.initSlide();
  }

  initDOM() {
    const {
      dataSlidePrev,
      dataSlideNext,
    } = this.options;

    this.$slide = this.$element.find('.swiper');
    this.$prev = this.$element.find(dataSlidePrev);
    this.$next = this.$element.find(dataSlideNext);
  }

  initSlide() {
    const { slideOptions } = this.options;
    const navOptions = {
      navigation: {
        prevEl: this.$prev[0],
        nextEl: this.$next[0],
      },
    };
    const finalOptions = { ...slideOptions, ...navOptions };

    this.$swiper = new Swiper(this.$slide[0], finalOptions);
  }
}
