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
    this.checkQueryParams();
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
    this.$noResult = $();
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

    this.setQueryParams(value);

    if (!Object.keys(value).length) return;

    $('window').trigger('open-loading');
    try {
      const response = await fetch(url, options);
      const { data } = await response.json();
      const $result = $(this.renderResult(data));
      const count = this.renderCounter(data);

      this.$result.html('');
      this.$noResult.remove();

      if (!data.length) {
        this.$noResult = $(this.renderNoResult());
        this.$result.append(this.$noResult);
        this.$counter.addClass('d-none');
        return;
      }

      this.$counter.removeClass('d-none').find('span').text(count);
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

        return { ...cum, [name]: [value.trim()] }
      }, {});

    return inputData;
  }

  renderResult(data) {
    return data.map(({ title, cat, excerpt, date, meta: { hopamchinh }, permalink }) => {
      const $author = cat['tac-gia'].reduce((cum, cur, idx) => cum + `${idx > 0 ? ',' : ''}` + cur.cat_name, '');

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

  renderNoResult() {
    return `
      <div class="comp-filter__no-result">
        <div class="comp-filter__no-result-text">Không có kết quả chính xác</div>
        <div class="comp-filter__no-result-img">
          <img src="images/no-result.png" alt="Không có kết quả chính xác">
        </div>
        <div class="comp-filter__no-result-desc">
          <p>Có thể hệ thống vẫn chưa có bài hát nào phù hợp với mong muốn của bạn, xin thông cảm vì thiếu sốt này của đội ngũ chúng tôi.</p>
          <p>Nếu được, bạn hãy đóng góp bài hát theo mong muốn của bạn vô địa chỉ email này: <a href="mailto: minhngoc.ith@gmail.com" title="Email liên hệ">minhngoc.ith@gmail.com</a>, chúng tôi sẽ cập nhật bài hát sớm nhất có thể.</p><p>Xin cảm ơn.</p>
        </div>
      </div>`;
  }

  renderCounter(data) {
    return `Tìm thấy ${data.length} kết quả phù hợp với bộ lọc bạn chọn`
  }

  setQueryParams(data) {
    const { pathname } = window.location;
    const queryParam = Object.keys(data).reduce((cumulative, current, index) => {
      const valueQuery = data[current]?.reduce((cum, cur, idx) => cum + `${idx > 0 ? ',' : ''}` + cur, '') || data[current];
      
      return`${cumulative}${index > 0 ? '&' : ''}${current}=${valueQuery}`;
    }, '');
    const url = pathname + '?' + queryParam;

    history.pushState(null, '', url);
  }

  checkQueryParams() {
    const { search } = window.location;
    const params = new URLSearchParams(search);

    if (!search) return;

    for (const [key, value] of params.entries()) {
      if (key === 'TenBaiHat') {
        this.$box.find(':input').filter('[name="TenBaiHat"]').val(value);
      } else {
        value.split(',').map(item => {
          this.$box.find(':input').filter(`[name="${key}"][value="${item}"]`).prop('checked', 'checked');
        });
      }
    }
    this.handleEventFilter();
  }
}
