function testeMetodoApp() {
  var gplay = require('../node_modules/google-play-scraper');

  gplay.app({ appId: 'br.unip.unicluster.captureolixo' })
    .then(console.log, console.log);

}

function testeMetodoReviews() {
  var gplay = require('../node_modules/google-play-scraper');

  gplay.reviews({
    appId: 'com.makeinindia.preschool.portuguese',
    sort: gplay.sort.RATING,
    page:0
  }).then(console.log, console.log);

}

function testeSearch() {
  var gplay = require('../node_modules/google-play-scraper');

  gplay.search({
    term: "panda",
    num: 2
  }).then(console.log, console.log);
}

testeMetodoApp()
//testeMetodoReviews()
//testeSearch()