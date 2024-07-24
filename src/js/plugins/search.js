import autocomplete from "autocompleter";

@Plugin({
  options: {
    dataSearchForm: '[data-search-form]',
    dataSearchInput: '[data-search-input]',
  }
})
export default class Search {
  init () {
    this.initDOM();
    this.initState();
    this.initAutoComplete();
    this.handleEvent();
  }

  initDOM () {
    const {
      dataSearchForm,
      dataSearchInput,
    } = this.options;

    this.$searchForm = this.$element.find(dataSearchForm);
    this.$searchInput = this.$element.find(dataSearchInput);
  }

  initState() {
    this._ITEMSEARCH = '';
  }

  async initAutoComplete() {
    try {
      const url = this.$searchInput.data('url');
      const options = {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();

      autocomplete({
        input: this.$searchInput[0],
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
          this._ITEMSEARCH = item;

          window.location.href = `${BASE_URL}/bai-hat/${item.slug}`;
        }
      });
    } catch(err) {
      console.log(err);
    }
  }

  handleEvent () {
    const { PluginName } = this.options;

    this.addEvent(this.$searchInput, 'keyup', this.handleEventInputSearch, {
      nameSpace: PluginName,
    });
  }

  handleEventInputSearch(e) {
    if ( e.key === 'Enter' ) {
      if (this._ITEMSEARCH) return;

      const value = this.$searchInput.val();
      const searchLink = this.$searchInput.data('action');
      const linkSearch = `${BASE_URL}${searchLink}?query=${value}`;

      window.location.href = linkSearch;
    }
  }
}
