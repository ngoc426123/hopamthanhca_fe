@Plugin({
  options: {
    dataMainPage: '[data-main-page]',
    dataFilterToggle: '[data-filter-toggle]',
    dataFilterBox: '[data-filter-box]',
    dataFilterResult: '[data-filter-result]',
    dataFilterOverlay: '[data-filter-overlay]',
    clsOpen: '--open',
    clsFreeze: '--freeze',
  }
})
export default class Filter {
  init () {
    this.initDOM();
    this.handleEvent();
  }

  initDOM () {
    const {
      dataMainPage,
      dataFilterToggle,
      dataFilterBox,
      dataFilterResult,
      dataFilterOverlay,
    } = this.options;

    this.$mainPage = $('body').find(dataMainPage);
    this.$toggle = $('body').find(dataFilterToggle);
    this.$filterBox = this.$element.find(dataFilterBox);
    this.$filterResult = this.$element.find(dataFilterResult);
    this.$overlay = this.$element.find(dataFilterOverlay);
  }

  handleEvent () {
    const { PluginName } = this.options;

    this.addEvent(this.$toggle, 'click', this.handleEventToggle, {
      nameSpace: PluginName,
    });

    this.addEvent(this.$overlay, 'click', this.handleEventOverlay, {
      nameSpace: PluginName,
    });
  }

  handleEventToggle() {
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
