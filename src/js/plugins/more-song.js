@Plugin({
  options: {
    dataListSong: '[data-list-song]',
    dataCta: '[data-cta]',
  }
})
export default class MoreSong {
  init () {
    this.initDOM();
    this.handleEvent();
  }

  initDOM () {
    const {
      dataListSong,
      dataCta,
    } = this.options;

    this.$listSong = this.$element.find(dataListSong);
    this.$cta = this.$element.find(dataCta);
  }

  handleEvent () {
    const { PluginName } = this.options;

    this.addEvent(this.$cta, 'click', this.handleEventLoadMore, {
      nameSpace: PluginName,
    });
  }

  handleEventLoadMore(e) {
    e.preventDefault();

    const offset = parseInt(this.$cta.attr('data-offset'));
    const limit  = parseInt(this.$cta.attr('data-limit'));
    const url = this.$cta.attr('data-url');
    const new_offset = limit + offset;

    try {
      fetch(url, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          offset: offset,
          limit: limit,
        })
      })
      .then(response => response.json())
      .then(dataRet => {
        const { data, more } = dataRet;

        data.forEach(element => {
          const $dataMoreSong = this.renderItemMoreSong(element);
  
          this.$listSong.append(`<div class="col-md-4 col-lg-3">${$dataMoreSong}</div>`);
        });
        !more && this.$cta.remove();
        this.$cta.attr('data-offset', new_offset);
      })
    } catch (err) {
      console.error("Lỗi nè");
    }
  }

  renderItemMoreSong(data) {
    return `<div class="comp-song-more">
              <div class="comp-song-more__title">
                <h3 class="comp-song-more__title-text">${data.title}</h3>
              </div>
              <div class="comp-song-more__attr">
                <div class="comp-song-more__attr-item"><span class="fa-eye">${data.meta.luotxem}</span></div>
                <div class="comp-song-more__attr-item"><span class="fa-heart">${data.meta.lovesong}</span></div>
              </div>
              <div class="comp-song-more__info">
                
                <div class="comp-song-more__desc">${data.excerpt}</div>
              </div>
              <div class="comp-song-more__info">
                <div class="comp-song-more__info-item"><span>Tác giả</span><span>${data.cat["tac-gia"][0].cat_name}</span></div>
                <div class="comp-song-more__info-item"><span>Chuyên mục</span><span>${data.cat["chuyen-muc"][0].cat_name}</span></div>
              </div>
              <a class="comp-song-more__link" href="${data.permalink}"></a>
            </div>`;
  }
}
