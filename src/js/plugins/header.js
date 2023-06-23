import autocomplete from "autocompleter";

$(async () => {
  let _ITEMSEARCH = '';
  const dataSearch = $(`[data-search]`);
  const dataUrl = $(`[data-search]`).data(`url`);
  const callApi = (url) => {
    return new Promise((reslove, reject) => {
      $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: (data) => {
          reslove(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    })
  }
  const data = await callApi(dataUrl);

  console.log(data);

  autocomplete({
    input: dataSearch[0],
    minLength: 2,
    disableAutoSelect: true,
    fetch: (text, update) => {
      const _text = text.toLowerCase();
      const suggestion = data.filter(item => {
        const { title, excerpt } = item;
        const _title = title.toLowerCase();
        const _excerpt = excerpt.toLowerCase();
        const regex = new RegExp(`(${_text})`);
        const isTitle = regex.test(_title);
        const isExcerpt = regex.test(_excerpt);

        return isTitle || isExcerpt;
      });

      update(suggestion.slice(0, 6));
    },
    render: (item) => {
      return $(`<div class="autocomplete__item">
        <div class="autocomplete__song">${item.title} - <span>${item.cat['tac-gia'][0].cat_name}</span></div>
        <div class="autocomplete__excerpt">${item.excerpt}</<span></div>
      </div>`)[0];
    },
    onSelect: (item) => {
      _ITEMSEARCH = item;
      window.location.href = `${BASE_URL}/bai-hat/${item.slug}`;
    }
  });

  dataSearch
    .off('keyup')
    .on('keyup', (event) => {
      if ( event.key === 'Enter' ) {
        if (_ITEMSEARCH) return;

        const linkAction = dataSearch.data('action');
        const value = dataSearch.val();
        const linkSearch = `${linkAction}?query=${value}`;

        window.location.href = linkSearch;
      }
    });
});