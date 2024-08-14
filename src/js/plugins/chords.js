@Plugin({
  options: {
    dataListChords: '[data-list-chords]',
    dataListTail: '[data-list-tail]',
    dataChordsRender: '[data-chords-render]',
  }
})
export default class Chords {
  init () {
    this.initDOM();
    this.renderChords();
    this.handleEvents();
  }

  initDOM() {
    const {
      dataListChords,
      dataListTail,
      dataChordsRender,
    } = this.options;

    this.$listChords = this.$element.find(dataListChords);
    this.$listTail = this.$element.find(dataListTail);
    this.$chordsRender = this.$element.find(dataChordsRender);
  }

  handleEvents() {
    const { PluginName } = this.options;

    this.addEvent(this.$listChords, 'change', this.renderChords, {
      nameSpace: PluginName,
    });
  
    this.addEvent(this.$listTail, 'change', this.renderChords, {
      nameSpace: PluginName,
    });
  }

  renderChords() {
    const chord = this.$listChords.val();
    const tail = this.$listTail.val();
    const chordTail = chord + tail;
    const options = {
      showHands: true,
    }

    GuitarChord.render(this.$chordsRender[0], chordTail, options)
  }
}
