var gplay = require('google-play-scraper');

var palavraChave = [
    'programming',
    'programação',
    'learn programming',
    'ensino de programação',
    'learn code'
]
var indice = 0
var indice2 = 0

for (; indice < palavraChave.length; indice++) {
    gplay.search({       //search retorna um array de aplicativos
        term: palavraChave[indice],
        lang: "pt-br",
        num: 250 //número máximo aceitado
    }).then(aplicativosSelecionados, console.log).then(incrementarValorIndice);
}
function aplicativosSelecionados(values) {
    console.log("______________________________________________________________")
    console.log("Nessa pesquisa a palavra chave utilizada foi: " + palavraChave[indice2])
    for (x = 0; x < 250; x++) {
        console.log(values[x].title) //acessando o array de aplicativos
    }
}
function incrementarValorIndice() {
    return indice2++;
}