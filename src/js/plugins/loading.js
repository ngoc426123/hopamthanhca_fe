@Plugin({
  options: {
    clsOpen: '--open',
    clsFreeze: '--freeze',
  }
})
export default class Loading {
  init () {
    this.handleEvent();
  }

  handleEvent () {
    const { PluginName } = this.options;

    this.addEvent($('window'), 'open-loading', this.handleEventOpenLoading, {
      nameSpace: PluginName,
    });

    this.addEvent($('window'), 'close-loading', this.handleEventCloseLoading, {
      nameSpace: PluginName,
    });

  }

  handleEventOpenLoading() {
    const { clsOpen, clsFreeze } = this.options;
    
    $('html')['addClass'](clsFreeze);
    this.$element['addClass'](clsOpen);
  }

  handleEventCloseLoading() {
    const { clsOpen, clsFreeze } = this.options;
    e.stopPropagation();

    $('html')['removeClass'](clsFreeze);
    this.$element['removeClass'](clsOpen);
  }
}
