@Plugin({
  options: {
    dataMenuToggle: '[data-menumobile-toggle]',
    dataMenuOverlay: '[data-menumobile-overlay]',
    dataMenuDropdown: '[data-menumobile-toggle]',
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
    } = this.options;

    this.$toggle = this.$element.find(dataMenuToggle);
    this.$overlay = this.$element.find(dataMenuOverlay);
    this.$dropdown = this.$element.find(dataMenuDropdown);
  }

  handleEvent () {
    const { PluginName } = this.options;

    this.addEvent(this.$toggle, 'click', this.handleEventToggleMenumobile, {
      nameSpace: PluginName,
    });

    this.addEvent(this.$overlay, 'click', this.handleEventOverlay, {
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
}
