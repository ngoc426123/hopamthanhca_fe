$(() => {
  const btnMore = $(`.load-more-song`).find(`a`);
  const render_item_more_song = (prop) => {
    return `<div class="item">
              <div class="item__top">
                <div class="item__att"><span class="fa-eye">${prop.meta.luotxem}</span></div>
                <div class="item__att"><span class="fa-heart">${prop.meta.lovesong}</span></div>
              </div>
              <div class="item__info">
                <div class="item__title"><a href="${prop.permalink}">${prop.title}</a></div>
                <div class="item__desc">${prop.excerpt}</div>
              </div>
            </div>`;
  }

  btnMore.off(`click`).on(`click`, (event) => {
    event.preventDefault();
    const offset = $(event.currentTarget).data(`offset`);
    const limit  = $(event.currentTarget).data(`limit`);
    const url = $(event.currentTarget).data(`url`);

    new Promise(() => {
      fetch(url, {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          offset: offset,
          limit: limit
        })
      })
      .then(response => response.json())
      .then(data => {
        data = data.data;
        data.forEach(element => {
          $(`#render-more`).append(`<div class="col">${render_item_more_song(element)}</div>`)
        });
        data.more && btnMore.remove();
      })
    })
  })
});