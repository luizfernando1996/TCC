//Nessa etapa são coletados os aplicativos que se analisaram

var gplay = require('TCC/bibliotecas/google-play-scraper');

var palavraChave = [ //um array que contêm todas as palavras chaves
    'programming',
    'programação',
    'learn programming',
    'ensino de programação',
    'learn code'
]

var indice2 = 0

for (indice = 0; indice < palavraChave.length; indice++) {//coleta uma lista de aplicativos para cada palavra chave
    gplay.search({       //O método search retorna um array de aplicativos
        term: palavraChave[indice],//palavra chave será o termo a ser pesquisado
        lang: "pt-br",
        num: 250 //número máximo de aplicativos aceitado pela ferramenta em cada lista de aplicativos
    }).then(aplicativosSelecionados, console.log).then(incrementarValorIndice);
}
function aplicativosSelecionados(values) {
    console.log("______________________________________________________________")
    console.log("Nessa pesquisa a palavra chave utilizada foi: " + palavraChave[indice2])
    for (x = 0; x < 250; x++) {
        console.log(values[x].title) //apresentando o titulo do aplicativo na lista dos aplicativos
    }
}
function incrementarValorIndice() {
    return indice2++;
}