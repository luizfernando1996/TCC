//Ferramentas requeridas - ""importadas""
var gplay = require('TCC/Bibliotecas/google-play-scraper');
//Variaveis que se manipula

var cabecalhoArquivoComentariosExcel =
    "Bundle Id" + "\t" +
    "Id do comentário" + "\t" +
    "Comentário do aplicativo"
    + "\n";


var categorias = [
    "Educação",//pt-br
    "Education",//en-us
    "Livros e referências",//pt-br
    "Books & Reference"//en-us
]

//Variaveis globais
var numeroDaRequisicao = 0
var conteudoArquivoDadosExcel = [];
var conteudoArquivoComentarioExcel = []
var numeroDoAplicativo
var contagemDeAplicativosEscritos = 0
var chaveEscreverCabecalhoComentario = true
var contagemComentariosEscritos = 0

function pesquisarComentariosAplicativo() {
    gplay.reviews({
        appId: appIdGlobal,
        sort: gplay.sort.RATING
    }).then(escreverExcelComentariosAplicativo, console.log)
}

function escreverExcelComentariosAplicativo(values) {

    //Adiciona o cabeçalho apenas na primeira requisição no documento do excel
    if (chaveEscreverCabecalhoComentario == true) {
        conteudoArquivoComentarioExcel.push(cabecalhoArquivoComentariosExcel)
        chaveEscreverCabecalhoComentario = false
    }

    for (var indiceComentario = 0; indiceComentario < values.length; indiceComentario++) {
        //Para cada aplicativo é inserido uma linha no excel com as seguintes informações
        conteudoArquivoComentarioExcel.push(
            appIdGlobal + "\t" +//app id do aplicativo
            values[indiceComentario].id + "\t" +//id do comentário
            values[indiceComentario].text //comentário do aplicativo  
            + "\n");
        contagemComentariosEscritos++;
    }
    //Após 500 comentários se escreve no excel
    if (contagemComentariosEscritos >= 500) {

        var numero = parseInt(contagemComentariosEscritos / 500);
        var tituloArquivo = "comentariosDosAplicativos" + numero.toString();
        escritaEmArquivo(tituloArquivo, conteudoArquivoExcel)

        //reseta as variaveis
        conteudoArquivoExcel = null;
        contagemComentariosEscritos = null;
    }
}
//Debugar
function escreverDadosAplicativoNoConsole(values) {
    console.log("Bundle Id - " + values.appId);
    console.log("Titulo do aplicativo - " + values.title);
    console.log("Número de avaliações - " + values.ratings);
    console.log("Número de estrelas - " + values.scoreText);
    console.log("Número de instalações - " + values.installs);
    console.log("Tamanho do aplicativo - " + values.size);
    console.log("Versão do android exigida - " + values.androidVersionText);
    console.log('----------------------------------------------------------');
}


