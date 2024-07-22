@Plugin({
  options: {
    dataMainPage: '[data-main-page]',
    dataFilterToggle: '[data-filter-toggle]',
    dataFilterForm: '[data-filter-form]',
    dataFilterBox: '[data-filter-box]',
    dataFilterBtn: '[data-filter-btn]',
    dataFilterCounter: '[data-filter-counter]',
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
      dataFilterForm,
      dataFilterBox,
      dataFilterBtn,
      dataFilterCounter,
      dataFilterResult,
      dataFilterOverlay,
    } = this.options;

    this.$mainPage = $('body').find(dataMainPage);
    this.$toggle = $('body').find(dataFilterToggle);
    this.$form = $('body').find(dataFilterForm);
    this.$box = this.$element.find(dataFilterBox);
    this.$counter = $('body').find(dataFilterCounter);
    this.$btn = this.$element.find(dataFilterBtn);
    this.$result = $('body').find(dataFilterResult);
    this.$overlay = this.$element.find(dataFilterOverlay);
  }

  handleEvent () {
    const { PluginName } = this.options;

    // TOGGLE FILTER
    this.addEvent(this.$toggle, 'click', this.handleEventToggle, {
      nameSpace: PluginName,
    });

    this.addEvent(this.$overlay, 'click', this.handleEventOverlay, {
      nameSpace: PluginName,
    });

    // FILTER FUNCTION
    this.addEvent(this.$btn, 'click', this.handleEventFilter, {
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

  async handleEventFilter() {
    const value = this.getInput();
    const jsonValue = JSON.stringify(value);
    const url = this.$form.data('url');
    const options = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: jsonValue,
    };

    if (!Object.keys(value).length) return;

    $('window').trigger('open-loading');
    try {
      const response = await fetch(url, options);
      const { data } = await response.json();
      const $result = $(this.renderResult(data));
      const count = this.renderCounter(data);

      this.$counter.find('span').text(count);
      this.$result.html('').append($result);
    } catch(error) {
      console.log(error);
    }
    $('window').trigger('close-loading');
  }

  getInput() {
    const inputData = this.$box
      .find(':input')
      .serializeArray()
      .reduce((cum, cur) => {
        const { name, value } = cur;

        if (!cur.value) return cum;

        if (cum[name]) {
          cum[name] = [ ...cum[name], cur.value ];

          return cum;
        }

        return { ...cum, [name]: [value] }
      }, {});

    return inputData;
  }

  renderResult(data) {
    return data.map(({ title, cat, excerpt, date, meta: { hopamchinh }, permalink }) => {
      const $author = cat['tac-gia'].reduce((cum, cur, idx) => cum + `${idx > 0 ? ',' : ''}` + cur.cat_name ,'');

      return `<div class="comp-song-item">
                <div class="comp-song-item__title">
                  <h3 class="comp-song-item__title-text">${title}</h3>
                  <span class="comp-song-item__author">${$author}</span>
                </div>
                <div class="comp-song-item__desc">${excerpt}</div>
                <div class="comp-song-item__info">
                  <div class="comp-song-item__date">${date}</div>
                  <div class="comp-song-item__chord">${hopamchinh}</div>
                </div>
                <a class="comp-song-item__link" href="${permalink}" title="${title}"></a>
              </div>`
      })
      .join('');
  }

  renderCounter(data) {
    return `Tìm thấy ${data.length} kết quả phù hợp với bộ lọc bạn chọn`
  }
}
