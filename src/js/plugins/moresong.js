$(() => {
  const btnMore = $(`.load-more-song`).find(`a`);

  const render_item_more_song = (prop) => {
    return `<div class="item">
              <div class="item__top">
                <div class="item__att"><span class="fa-eye">${prop.view}</span></div>
                <div class="item__att"><span class="fa-heart">${prop.love}</span></div>
              </div>
              <div class="item__info">
                <div class="item__title"><a href="${prop.link}">${prop.title}</a></div>
                <div class="item__desc">${prop.desc}</div>
              </div>
              <div class="item__attribute">
                <div class="item__attitem"><span>Tác giả</span><span>${prop.author}</span></div>
                <div class="item__attitem"><span>Chuyên mục</span><span>${prop.category}</span></div>
              </div>
            </div>`;
  }

  btnMore.off(`click`).on(`click`, (event) => {
    event.preventDefault();

    new Promise(() => {
      fetch(`/data/moresong.js`)
      .then(response => response.json())
      .then(data => {
        data = data.data;
        data.forEach(element => {
          $(`#render-more`).append(`<div class="col">${render_item_more_song(element)}</div>`)
        });
      })
    })
  })
});