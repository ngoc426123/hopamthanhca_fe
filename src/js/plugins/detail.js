$(() => {
  let maxfontsize = 30;
	let fontsizecurrent = 16;
  let minfontsize = 10;
  let chordcurrent = $(`.chord_ipt`).val();

  transposeChord = (chord, amount) => {
		if (typeof chord == 'undefined') {
      return;
    }
    if (chord === "") {
      return;
    }
    chord = chord.toLowerCase();
    chord = chord.replace(/\/./, function(char) {
      return char.toUpperCase();
    });
    chord = chord.replace(/^./, function(char) {
      return char.toUpperCase();
    });
    var sameScale = ["Db", "C#", "Eb", "D#", "Gb", "F#", "Ab", "G#", "Bb", "A#"];
    var scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    chord = chord.replace(/[DEGAB]b/, function(match) {
      return sameScale[(sameScale.indexOf(match) + 1)];
    });
    var returnVal = chord.replace(/[CDEFGAB]#?/g,
      function(match) {
        var i = (scale.indexOf(match) + amount) % scale.length;
        return scale[i < 0 ? i + scale.length : i];
      });
    returnVal = returnVal.replace(/^A#/, 'Bb').replace(/^D#/, 'Eb');
    return returnVal;
	}

  get_list_chord_of_song = () => {
		var array_list_chord = [];
		$(".song-content .chord").each(function(){
			array_list_chord.push($(this).text());
		});
		var arrLength = array_list_chord.length;
		var arrR = [];
		for( var i = 0; i < arrLength; i++ ) {
			if( arrR.indexOf(array_list_chord[i] ) < 0) {
				arrR.push( array_list_chord[i] );
			}
		}
		var content_list_song="";
		var content_text="";
		for (i = 0 ; i < arrR.length - 1; i++) {
			content_text="<div class='chord'>"+arrR[i]+"</div>";
			content_list_song=content_list_song+content_text;
		}
		$(".song-list-chord").html(content_list_song);
		$(".song-list-chord").find(`.chord`).each(function(i,e) {
			jtab.render($(e)[0], $(e).text());
		});
  }

  chordTran = (keytran) => {
    chordcurrent = transposeChord(chordcurrent, keytran);
    $(`.chord_ipt`).val(chordcurrent);

		$(".song-content .chord").each(function(index) {
        var self = $(this);
        var chor = $(self).html();
        var chor_tran = transposeChord(chor, keytran);
        $(self).html(chor_tran);
    });
	}

  chordDown = () => {
		chordTran(-1);
    get_list_chord_of_song();
	}

	chordUp = () => {
		chordTran(+1);
    get_list_chord_of_song();
  }

  getfontsize = (i) => {
    fontsizecurrent+=i;
    if(fontsizecurrent>=maxfontsize){
      fontsizecurrent=maxfontsize;
    }
    else if(fontsizecurrent<=minfontsize){
      fontsizecurrent=minfontsize
    }
    $(".font_ipt").val(fontsizecurrent+"px");
    $(".song-content").css({"font-size":fontsizecurrent+"px"});
  }

  fontUp = () => {
    getfontsize(+1);
  }

  fontDown = () => {
    getfontsize(-1);
  }

  // EVENT

  $(`#chordDown`).on(`click`, () => {
    chordDown();
  });

  $(`#chordUp`).on(`click`, () => {
    chordUp();
  });

  $(`#fontDown`).on(`click`, () => {
    fontDown();
  });

  $(`#fontUp`).on(`click`, () => {
    fontUp();
  });

  $(`label[for='gopdong']`).on(`click`, () => {
    const element = $(`#gopdong`);
    if ( element.is(`:checked`) ) {
      $(".song-content").addClass(`song-content__lahubalahu`);
    } else {
      $(".song-content").removeClass(`song-content__lahubalahu`);
    }
  });

  $(`label[for='anhopam']`).on(`click`, () => {
    const element = $(`#anhopam`);
    if ( element.is(`:checked`) ) {
      $(".song-content").addClass(`song-content__hulabanahill`);
    } else {
      $(".song-content").removeClass(`song-content__hulabanahill`);
    }
  });

  $(`label[for='chiacot']`).on(`click`, () => {
    const element = $(`#chiacot`);
    if ( !element.is(`:checked`) ) {
      $(".song-content").addClass(`song-content__nuhanahinu`);
    } else {
      $(".song-content").removeClass(`song-content__nuhanahinu`);
    }
  });

  $(window)
  .on(`load`, () => {
    get_list_chord_of_song();
  })
  .on(`keyup`, (key) => {
    var evtobj = window.event ? event : key;
    if ( evtobj.ctrlKey ) {
      evtobj.keyCode === 37 && chordDown();
      evtobj.keyCode === 39 && chordUp();
      evtobj.keyCode === 38 && fontUp();
      evtobj.keyCode === 40 && fontDown();
    }
  });

  $(`.song-more__toggle`).on(`click`, () => {
    const isActive = $(`.song-more`).hasClass(`song-more--active`);
    if ( !isActive ) {
      $(`.song-more`).addClass(`song-more--active`);
      $(`.song-more__dropdown`).stop().slideDown();
    } else {
      $(`.song-more`).removeClass(`song-more--active`);
      $(`.song-more__dropdown`).stop().slideUp();
    }
  });

  // SONG LOVE
  const love = $(`.song-share .love`);
  love
    .off(`click.detail`)
    .on(`click.detail`, (event) => {
      event.preventDefault();

      const id = love.data(`post-id`);
      const url = love.data(`url`);
      const count = love.data(`love`);
      
      $.ajax({
        url: url,
        async: true,
        type: 'POST',
        data: {
          id: id,
          love: count
        },
        success: function(data) {
          const dat = JSON.parse(data);
          love.next(`span`).text(dat.love);
          love.attr(`data-love`, dat.love);
        }
      });
      ;
    })
});