$(() => {
  function listTable(){
    const result = $('.chord__result');
    const chord = $('.list-chord').val();
    const tail = $('.list-tail').val();
    const chordTail = chord + tail;
    const options = {
      showHands: true,
    }

    GuitarChord.render(result[0], chordTail, options)
  }
  listTable();
  $('.list-chord').add($('.list-tail')).on('change', listTable);
});