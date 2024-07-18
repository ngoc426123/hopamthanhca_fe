const express = require('express');
const app = express();
const { src, staticPath } = require('../gulpsrc/config/directories.js');
const viewsSrc = `${src}/html`;
const { STATIC_PORT } = require('../gulpsrc/config/port');

// ROUTER
app.get('/', (req, res) => {
  res.redirect('index.html');
});
app.get('/*.html', (req, res) => {
  const { path: url } = req;
  const file = /[/]?(.+)\.html/.exec(url)

  res.render(file[1]);
});
app.post('/*.html', (req, res) => {
  const { path: url } = req;
  const file = /[/]?(.+)\.html/.exec(url)

  res.render(file[1]);
});

// SETTER
app.set('views', viewsSrc);
app.set('view engine', 'pug');
app.use(express.static(staticPath));

// LISTEN
app.listen(STATIC_PORT, console.log(`_____The Site run on: http://localhost:${STATIC_PORT}_____`));
