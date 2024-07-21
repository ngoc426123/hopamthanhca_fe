@Plugin({
  options: {
    dataMenuToggle: '[data-menumobile-toggle]',
    dataMenuOverlay: '[data-menumobile-overlay]',
    dataMenuDropdown: '[data-menumobile-dropdown]',
    dataMenuBoxover: '[data-menumobile-boxover]',
    clsOpen: '--openmenu',
    clsFreeze: '--freeze',
  }
})
export default class Menumobile {
  init () {
    this.initDOM();
    this.handleEvent();
  }

  initDOM () {
    const {
      dataMenuToggle,
      dataMenuOverlay,
      dataMenuDropdown,
      dataMenuBoxover,
    } = this.options;

    this.$toggle = this.$element.find(dataMenuToggle);
    this.$overlay = this.$element.find(dataMenuOverlay);
    this.$dropdown = this.$element.find(dataMenuDropdown);
    this.$dropdownItemMenu = this.$dropdown.find('>ul>li');
    this.$boxover = this.$element.find(dataMenuBoxover);
  }

  handleEvent () {
    const { PluginName } = this.options;

    this.addEvent(this.$toggle, 'click', this.handleEventToggleMenumobile, {
      nameSpace: PluginName,
    });

    this.addEvent(this.$overlay, 'click', this.handleEventOverlay, {
      nameSpace: PluginName,
    });

    this.addEvent(this.$dropdownItemMenu, 'mouseenter', this.handleEventMouseEnter, {
      nameSpace: PluginName,
    });
  }

  handleEventToggleMenumobile() {
    const { clsOpen, clsFreeze } = this.options;
    const isOpen = this.$element.hasClass(clsOpen);

    $('html')[isOpen ? 'removeClass': 'addClass'](clsFreeze);
    this.$element[isOpen ? 'removeClass': 'addClass'](clsOpen);
  }

  handleEventOverlay(e) {
    const { clsOpen, clsFreeze } = this.options;
    e.stopPropagation();

    $('html')['removeClass'](clsFreeze);
    this.$element['removeClass'](clsOpen);
  }

  handleEventMouseEnter(e) {
    const $target = $(e.currentTarget);
    const offsetDropdown = this.$dropdown.offset().left;
    const offsetEle = $target.offset().left;
    const width = $target.outerWidth();
    const left = offsetEle - offsetDropdown;

    this.$boxover.css({width, left});
  }
}
