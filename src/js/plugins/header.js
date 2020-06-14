$(() => {
  $(`.header__notification__slide`).slick({
    row: 0,
    autoplay: true,
    autoplaySpeed: 6000,
    vertical: true,
    verticalSwiping: true,
    pauseOnFocus: false,
    pauseOnHover: false,
    arrows: false,
  });
});