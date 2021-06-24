$(() => {
  const dataSearch = $(`[data-search]`);
  const dataUrl = $(`[data-search]`).data(`url`);

  fetch(dataUrl)
    .then(response => response.text())
    .then(data => {
      const _data = JSON.parse(data);
      dataSearch
        .autocomplete({
          source: (request, response) => {
            var results = $.ui.autocomplete.filter(_data.data, request.term);
            response(results.slice(0, 10));
          },
          select: (event, ui) => {
            window.location.href = ui.item.permalink;
          }
        })
        .autocomplete("instance")._renderItem = function( ul, item ) {
          return $(`<li><div><a href="${item.permalink}">${item.label} - <span>${item.author}</span></a></div></li>`).appendTo(ul);
        };
    });
});