$(() => {
  const dataSearch = $(`[data-search]`);
  const dataUrl = $(`[data-search]`).data(`url`);
  const dataSuggess =  $(`[data-suggess]`);
  const dataSearchForm = $(`[data-search-form]`);
  const clsInputFocus = `input-focus`;
  const clsFormFocus = `form-focus`;
  const win = $(window);
  let dataJson = '';

  fetch(dataUrl)
    .then(response => response.text())
    .then(data => {
      dataJson = data;
    });

  const search_json = (json, keyword) => {
    const reg = new RegExp(`\{\"(title)\"\:\"(${keyword}).*?}`, `gi`);
    const result = json.match(reg);
    return ( result != null ) ? `[${result.join(`,`)}]` : `[{"title":"Kết quả không khớp","permalink":"#"}]`;
  }

  const render_item = (data) => {
    let list_item = '';
    data.forEach(element => {
      list_item += `<li><a href="${element.permalink}">${element.title}</a></li>`;
    });
    return list_item;
  }

  const empty_suggess = () => {
    dataSuggess.empty();
    dataSearch.removeClass(clsInputFocus);
    dataSearchForm.removeClass(clsFormFocus);
  }

  const auto_suggess = (keyword) => {
    const result = JSON.parse(search_json(dataJson, keyword));
    const data_html = render_item(result);
    empty_suggess();
    dataSuggess.html(data_html);
    dataSearch.addClass(clsInputFocus);
    dataSearchForm.addClass(clsFormFocus);
  }

  dataSearch
    .off(`keyup.search`)
    .on(`keyup.search`, (event) => {
      const keycode = parseInt(event.keyCode);
      if ( $.inArray(keycode, [37,38,39,40]) !== -1 ) { return false; }
      const keyword = dataSearch.val();
      ( keyword == '' ) ? empty_suggess() : auto_suggess(keyword);
    });

  win
    .off(`click.search`)
    .on(`click.search`, (event) => {
      const target = $(event.target);
      const isFocus = target.parents(dataSearchForm).hasClass(clsFormFocus);

      if ( !isFocus ) {
        dataSearch.removeClass(clsInputFocus);
        empty_suggess();
      }
    });
});