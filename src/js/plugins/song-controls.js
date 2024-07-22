@Plugin({
  options: {
    dataChordsUp: '[data-chords-up]',
    dataChordsDown: '[data-chords-down]',
    dataChordsInput: '[data-chords-input]',
    dataFontUp: '[data-font-up]',
    dataFontDown: '[data-font-down]',
    dataFontInput: '[data-font-input]',
    dataColumnSplitInput: '[data-column-split-input]',
    dataChordsInlineInput: '[data-chords-inline-input]',
    dataHideChordsInput: '[data-hide-chords-input]',
    dataLoveSong: '[data-love-song]',
    dataSongContent: '[data-song-content]',
    dataListChords: '[data-list-chords]',
    GuitarChordOptions: {
      canvasWidth: 110,
      canvasHeight: 150,
      padding: 7,
      offsetLimitHeight: 45,
      noteRadian: 7,
      nodeFont: '12px Arial',
      titleFont: '14px Arial',
      titleHeight: 20,
    },
    clsFlat: '--flat',
    clsChordsInline: '--inline',
    clsHideChords: '--hide-chords',
    clsActiveLove: '--active',
  },
})
export default class SongControls {
  init() {
    this.initDOM();
    this.initState();
    this.handleEvent();
    this.renderListChord();
  }

  initDOM() {
    const {
      dataChordsUp,
      dataChordsDown,
      dataChordsInput,
      dataFontUp,
      dataFontDown,
      dataFontInput,
      dataColumnSplitInput,
      dataChordsInlineInput,
      dataHideChordsInput,
      dataLoveSong,
      dataSongContent,
      dataListChords,
    } = this.options;

    this.$chordsUp = this.$element.find(dataChordsUp);
    this.$chordsDown = this.$element.find(dataChordsDown);
    this.$chordsInput = this.$element.find(dataChordsInput);
    this.$fontUp = this.$element.find(dataFontUp);
    this.$fontDown = this.$element.find(dataFontDown);
    this.$fontInput = this.$element.find(dataFontInput);
    this.$columnSplitInput = this.$element.find(dataColumnSplitInput);
    this.$chordsInlineInput = this.$element.find(dataChordsInlineInput);
    this.$hideChordsInput = this.$element.find(dataHideChordsInput);
    this.$loveSong = $('body').find(dataLoveSong);
    this.$songContent = $('body').find(dataSongContent);
    this.$listChords = $('body').find(dataListChords);
  }

  initState() {
    this.fontSizeCurrent = 15;
    this.minFontSize = 10;
    this.maxFontSize = 30;
    this.chordsCurrent = this.$chordsInput.val();
  }

  handleEvent () {
    const { PluginName } = this.options;

    // CHORD
    this.addEvent(this.$chordsUp, 'click', this.chordUp, {
      nameSpace: PluginName,
    });
  
    this.addEvent(this.$chordsDown, 'click', this.chordDown, {
      nameSpace: PluginName,
    });

    // FONT
    this.addEvent(this.$fontUp, 'click', this.fontUp, {
      nameSpace: PluginName,
    });
  
    this.addEvent(this.$fontDown, 'click', this.fontDown, {
      nameSpace: PluginName,
    });
    
    // COLUMN
    this.addEvent(this.$columnSplitInput, 'change', this.handleEventColumnSplit, {
      nameSpace: PluginName,
    });
    
    // CHORD INLINE
    this.addEvent(this.$chordsInlineInput, 'change', this.handleEventChordsInline, {
      nameSpace: PluginName,
    });
    
    // HIDE CHORDS
    this.addEvent(this.$hideChordsInput, 'change', this.handleEventHideChords, {
      nameSpace: PluginName,
    });
    
    // LOVE
    this.addEvent(this.$loveSong, 'click', this.handleEventLoveSong, {
      nameSpace: PluginName,
    });
    
    // KEYBROAD
    this.addEvent($(window), 'keyup', this.handleEventKeybroad, {
      nameSpace: PluginName,
    });
  }
  
  chordDown() {
		this.chordTran(-1);
    this.renderListChord();
	}

	chordUp() {
		this.chordTran(+1);
    this.renderListChord();
  }

  chordTran (keytran) {
    this.chordsCurrent = this.transposeChord(this.chordsCurrent, keytran);
    this.$chordsInput.val(this.chordsCurrent);
  
		this.$songContent.find('.chords').each((idx, item) => {
      const chords = $(item).html();
      const chordsTran = this.transposeChord(chords, keytran);

      $(item).html(chordsTran);
    });
	}

  transposeChord(chord, amount) {
		if (typeof chord == 'undefined') return;
    if (chord === "") return;

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

  renderListChord() {
    const { GuitarChordOptions } = this.options;
		const $arrayListChord = this.$songContent
      .find('.chords')
      .map((idx, item) => $(item).text());
    const arrayListChord = Object
      .keys($arrayListChord)
      .filter(key => Number.isInteger(+key))
      .map((idx, key) => $arrayListChord[key])
      .filter((item, idx, arr) => idx === arr.findIndex(it => item === it));
		const contentListChord = arrayListChord
      .map(item => `<div class='chord'>${item}</div>`)
      .join('');

		this.$listChords.html(contentListChord);
		this.$listChords.find('.chord').each(function(i, e) {
			GuitarChord.render($(e)[0], $(e).text(), GuitarChordOptions);
		});
  }

  fontUp() {
    this.setFontSize(+1);
  }

  fontDown() {
    this.setFontSize(-1);
  }

  setFontSize(i) {
    this.fontSizeCurrent += i;

    if (this.fontSizeCurrent >= this.maxFontZize){
      this.fontSizeCurrent = this.maxFontZize;
    }

    else if (this.fontSizeCurrent <= this.minFontSize){
      this.fontSizeCurrent = this.minFontSize
    }

    this.$fontInput.val(this.fontSizeCurrent + 'px');
    this.$songContent.css({'font-size': this.fontSizeCurrent + 'px'});
  }

  handleEventKeybroad(e) {
    const { ctrlKey, keyCode } = window.event ? event : e;

    if ( ctrlKey ) {
      keyCode === 37 && this.chordDown();
      keyCode === 39 && this.chordUp();
      keyCode === 38 && this.fontUp();
      keyCode === 40 && this.fontDown();
    }
  }

  handleEventColumnSplit() {
    const { clsFlat } = this.options;
    const isChecked = this.$columnSplitInput.is(':checked');

    this.$songContent[isChecked ? 'removeClass' : 'addClass'](clsFlat);
  }

  handleEventChordsInline() {
    const { clsChordsInline } = this.options;
    const isChecked = this.$chordsInlineInput.is(':checked');

    this.$songContent[isChecked ? 'addClass' : 'removeClass'](clsChordsInline);
  }

  handleEventHideChords() {
    const { clsHideChords } = this.options;
    const isChecked = this.$hideChordsInput.is(':checked');

    this.$songContent[isChecked ? 'addClass' : 'removeClass'](clsHideChords);
  }

  async handleEventLoveSong(e) {
    e.preventDefault();

    const { clsActiveLove } = this.options;
    const id = this.$loveSong.data('post-id');
    const url = this.$loveSong.data('url');
    const love = this.$loveSong.data('love');
    const value = { id, url };
    const jsonValue = JSON.stringify(value);
    const options = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: jsonValue,
    };

    $('window').trigger('open-loading');
    try {
      const response = await fetch(url, options);
      const { love } = await response.json();

      this.$loveSong
          .attr('data-love', love)
          .addClass(clsActiveLove)
          .next('span').text(love);
    } catch(error) {
      console.log(error);
    }
    $('window').trigger('close-loading');
  }
}
