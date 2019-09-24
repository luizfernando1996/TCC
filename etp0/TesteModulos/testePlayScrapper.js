function testeMetodoApp() {
  var gplay = require('../../etp1/code/Bibliotecas/google-play-scraper');

  gplay.app({ appId: 'com.whatsapp' })
    .then(console.log, console.log);

}

function testeMetodoReviews() {
  var gplay = require('../../etp1/code/Bibliotecas/google-play-scraper');

  gplay.reviews({
    appId: 'com.whatsapp',
    sort: gplay.sort.RATING
  }).then(console.log, console.log);

}

function testeSearch() {
  var gplay = require('../../etp1/code/Bibliotecas/google-play-scraper');

  gplay.search({
    term: "panda",
    num: 2
  }).then(console.log, console.log);
}

//testeMetodoApp()
//testeMetodoReviews()
//testeSearch()