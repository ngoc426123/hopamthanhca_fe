export default function Plugin (Param) {
  function initPlugin (Class) {
    const pluginName = Class.name;
    const pluginOption = Param.options;
    const selectorName = pluginName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    const dataSelectorName = `[data-${selectorName}]`;
  
    // REGISTER PLUGIN TO FN
    $.fn[pluginName] = function () {
      this.each(function() {
        const self = this;
        const plugin = new Class();

        // ADD EVENT METHOD
        plugin.addEvent = ($ele, event, callback, opts) => {
          const { nameSpace, delegate } = opts;
          const eventName = `${event}.${nameSpace}`;
  
          $ele
            .off(eventName, delegate)
            .on(eventName, delegate, callback.bind(plugin));
        };

        plugin.$element = $(self);
        plugin.options = {
          PluginName: pluginName,
          ...pluginOption,
        };
        plugin.init();
      });
    }
  
    // INIT PLUGIN
    !!$(dataSelectorName).length && $(dataSelectorName)[pluginName]();
  }

  // RETURN
  return typeof Param === 'function' ? initPlugin(Param) : initPlugin;
}
