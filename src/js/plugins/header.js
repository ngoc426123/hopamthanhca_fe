$(() => {
  const dataSearch = $(`[data-search]`);
  const dataUrl = $(`[data-search]`).data(`url`);

  fetch(dataUrl)
    .then(response => response.text())
    .then(data => {
      const _data = JSON.parse(data);
      dataSearch
        .autocomplete({
          source: _data.data,
          select: (event, ui) => {
            window.location.href = ui.item.permalink;
          }
        })
        .autocomplete("instance")._renderItem = function( ul, item ) {
          return $(`<li><div><a href="${item.permalink}">${item.label}</a></div></li>`).appendTo(ul);
        };
    });
});