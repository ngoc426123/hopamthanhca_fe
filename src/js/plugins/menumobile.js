$(() => {
  const clsHtmlOpenmenu = `openmenu`;
  const clsOpenMenuToggle = `header__menuToggle--openmenu`;
  const clsOpenMenuOverlay = `header__menuOverlay--openmenu`;
  const clsOpenMenuDropdown = `header__menuDropdown--openmenu`;

  const html = $(`html`);
  const toggle = $(`.header__menuToggle`);
  const overlay = $(`.header__menuOverlay`);
  const dropdrown = $(`.header__menuDropdown`);

  const openMenu = () => {
    html.addClass(clsHtmlOpenmenu);
    toggle.addClass(clsOpenMenuToggle);
    overlay.addClass(clsOpenMenuOverlay);
    dropdrown.addClass(clsOpenMenuDropdown);
  }

  const closeMenu = () => {
    html.removeClass(clsHtmlOpenmenu);
    toggle.removeClass(clsOpenMenuToggle);
    overlay.removeClass(clsOpenMenuOverlay);
    dropdrown.removeClass(clsOpenMenuDropdown);
  }

  toggle.off(`click`).on(`click`, (event) => {
    const isOpenmenu = $(event.target).hasClass(clsOpenMenuToggle);
    if ( !isOpenmenu ) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  overlay.off(`click`).on(`click`, () => {
    closeMenu();
  });
});