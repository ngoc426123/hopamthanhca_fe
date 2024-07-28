import autocomplete from "autocompleter";
import { fetchAPI } from "../utils/http";

@Plugin({
  options: {
    dataSearchForm: '[data-search-form]',
    dataSearchInput: '[data-search-input]',
    clsLoading: '--loading',
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

  initAutoComplete() {
    const { clsLoading } = this.options;
    const that = this;

    autocomplete({
      input: this.$searchInput[0],
      minLength: 2,
      disableAutoSelect: true,
      debounceWaitMs: 300,
      fetch: async (text, update) => {
        const keywork = text.toLowerCase();
        const url = this.$searchInput.data('url');

        that.$element.addClass(clsLoading);

        const response = await fetchAPI(url, { keywork }, 'post');
        const data = await response.json();

        that.$element.removeClass(clsLoading);
  
        update(data.slice(0, 6));
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
