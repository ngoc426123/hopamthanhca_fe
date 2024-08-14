import Swiper from 'swiper'
import { Autoplay, Navigation, Grid } from 'swiper/modules';

@Plugin({
  options: {
    dataSlidePrev: '[data-slide-prev]',
    dataSlideNext: '[data-slide-next]',
    slideOptions: {
      modules: [Autoplay, Navigation, Grid],
      slidesPerView: 2,
      grid: {
        rows: 1,
      },
      autoplay: {
        pauseOnMouseEnter: true,
        delay: 5000,
      },
      breakpoints: {
        560: {
          slidesPerView: 3,
          grid: {
            rows: 1,
          },
        },
        768: {
          slidesPerView: 4,
          grid: {
            rows: 1,
          },
        },
        991: {
          slidesPerView: 5,
          grid: {
            rows: 2,
          },
        },
        1200: {
          slidesPerView: 6,
          grid: {
            rows: 2,
          },
        },
        1400: {
          slidesPerView: 7,
          grid: {
            rows: 2,
          },
        }
      }
    }
  }
})
export default class SlideAuthor {
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
