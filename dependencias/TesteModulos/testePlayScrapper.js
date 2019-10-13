function testeMetodoApp() {
  var gplay = require('../node_modules/google-play-scraper');

  gplay.app({ appId: 'br.unip.unicluster.captureolixo' })
    .then(console.log, console.log);

}

function testeMetodoReviews(bundleId = null) {
  var gplay = require('../node_modules/google-play-scraper');
  if (bundleId == null)
    gplay.reviews({
      appId: 'com.makeinindia.preschool.portuguese',
      sort: gplay.sort.RATING,
      page: 0
    }).then(console.log, console.log);
    else
    gplay.reviews({
      appId: bundleId,
      sort: gplay.sort.RATING,
      page: 0
    }).then(console.log, console.log);
}

function testeSearch(bundleId = null) {
  var gplay = require('../node_modules/google-play-scraper');
  if (bundleId == null)
    gplay.search({
      term: "panda",
      num: 2
    }).then(console.log, console.log);
  else
    gplay.search({
      term: bundleId,
      num: 2
    }).then(console.log, console.log);
}

function testeCargaReviews() {
  var arrayBundle = [
    'pe.diegoveloper.pseudocode',
    'com.learnprogramming.codecamp',
    'tursky.jan.nauc.sa.html5']
  arrayBundle.forEach(element => {
    testeMetodoReviews(element)
  })
}
testeCargaReviews()
//testeMetodoApp()
//testeMetodoReviews()
//testeSearch()