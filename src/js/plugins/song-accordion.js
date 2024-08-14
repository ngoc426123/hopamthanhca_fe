@Plugin({
  options: {
    dataToggle: '[data-toggle]',
    dataDropdown: '[data-dropdown]',
    clsActive: '--active',
  }
})
export default class SongAccordion {
  init () {
    this.initDOM();
    this.handleEvent();
  }

  initDOM () {
    const {
      dataToggle,
      dataDropdown,
    } = this.options;

    this.$toggle = this.$element.find(dataToggle);
    this.$dropdown = this.$element.find(dataDropdown);
  }

  handleEvent () {
    const { PluginName } = this.options;

    this.addEvent(this.$toggle, 'click', this.handleEventToggle, {
      nameSpace: PluginName,
    });
  }

  handleEventToggle() {
    const { clsActive } = this.options;
    const isActive = this.$element.hasClass(clsActive);

    this.$element[isActive ? 'removeClass': 'addClass'](clsActive);
    this.$dropdown.stop()[isActive ? 'slideUp': 'slideDown']();
  }
}
