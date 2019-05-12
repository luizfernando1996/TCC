//Ferramentas requeridas - ""importadas""
var gplay = require('TCC/bibliotecas/google-play-scraper');
var escritaEmArquivo = require('TCC/base/escreverExcel.js');

//var arquivoExcel = require('TCC/base/escreverExcel.js')

//Variaveis que se manipula
var numeroMaximoAplicativos = 2

//Um array que contêm todas as palavras chaves
var palavraChave = [
    'programming',
    'programação',
    'learn programming',
    'ensino de programação',
    'learn code'
]

language = [
    "pt-br"
]

var numeroDaRequisicao = 0

for (var indice = 0; indice < palavraChave.length; indice++) {//coleta uma lista de aplicativos para cada palavra chave
    gplay.search({       //O método search retorna um array de aplicativos
        term: palavraChave[indice],//palavra chave será o termo a ser pesquisado
        lang: language[0],
        num: numeroMaximoAplicativos //número máximo de aplicativos obtido pela ferramenta em cada pesquisa de aplicativos
    }).then(escreverExcelAplicativosSelecionados, console.log).then(incrementarNumeroDaRequisicao);
}
var conteudoArquivoExcel = [];

function escreverExcelAplicativosSelecionados(values) {

    //Adiciona o cabeçalho apenas na primeira requisição no documento do excel
    if (numeroDaRequisicao == 0) {
        var cabecalhoArquivoExcel = "Palavra Chave" + "\t" + "Titulo do aplicativo" + "\n";         //"\t" -> divisão de colunas
        conteudoArquivoExcel.push(cabecalhoArquivoExcel)
    }

    //Insere as outras linhas no documento do excel
    for (var numeroDoAplicativo = 0; numeroDoAplicativo < numeroMaximoAplicativos; numeroDoAplicativo++) {
        //Insere o titulo do aplicativo da lista dos aplicativos
        conteudoArquivoExcel.push(palavraChave[numeroDaRequisicao] + "\t" + values[numeroDoAplicativo].title + "\n");
    }

    //Após todas as requisições encerrarem se escreve no excel
    if (numeroDaRequisicao == palavraChave.length - 1)
        escritaEmArquivo("aplicativosSelecionado", conteudoArquivoExcel)

}
function incrementarNumeroDaRequisicao() {
    return numeroDaRequisicao++;
}