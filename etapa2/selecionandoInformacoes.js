//Ferramentas requeridas - ""importadas""
var gplay = require('TCC/bibliotecas/google-play-scraper');
var escritaEmArquivo = require('TCC/base/escreverExcel.js');

//Variaveis que se manipula

var cabecalhoArquivoExcel =
  "Nome do aplicativo" + "\t" + //"\t" -> divide em colunas
  "Número de avaliações" + "\t" +
  "Comentário desse aplicativo" + "\t" +
  "Número de estrelas do aplicativo" + "\t" +
  "Gratuidade do aplicativo" + "\t" +
  "Descrição do aplicativo" + "\t" +
  "Versão atual do aplicativo" + "\t" +
  "Número de instalações" + "\t" +
  "Tamanho do aplicativo" + "\t" +
  "Versão requerida" + "\t" +
  "Permissões" + "\t" +
  "Oferecido por" + "\t" +
  "Classificação de conteúdo" + "\t"+
  "\n";

//Variaveis locais
var numeroDaRequisicao = 0
var conteudoArquivoExcel = [];


gplay.app({
  appId: 'com.area120.grasshopper',//bundleIdsAplicativos[x] 
  lang: "pt-br"
}).then(escreverExcelResultados, apresentarErro);

function escreverExcelResultados(values) {

  //Adiciona o cabeçalho apenas na primeira requisição no documento do excel
  // if (numeroDaRequisicao == 0)
  conteudoArquivoExcel.push(cabecalhoArquivoExcel)
  console.log("chegamosAqui")

  //Insere as outras linhas no documento do excel
  // for (var numeroDoAplicativo = 0; numeroDoAplicativo < numeroMaximoAplicativos; numeroDoAplicativo++) {

  //Para cada aplicativo é inserido uma linha no excel com as seguintes informações
  conteudoArquivoExcel.push(
    values.title + "\t" +//categoria do aplicativo
    values.reviews + "\t" +//nome do aplicativo
    "valorVazio" + "\t" +//nome do aplicativo
    values.scoreText + "\t" +//app id do aplicativo
    values.free + "\t" + //número de estrelas do aplicativo
    "Valor com muitas quebras de linha" + "\t" + //número de estrelas do aplicativo
    values.version + "\t" + //número de estrelas do aplicativo
    values.installs + "\t" + //número de estrelas do aplicativo
    values.size + "\t" + //número de estrelas do aplicativo
    values.androidVersionText + "\t" + //número de estrelas do aplicativo
    "valorVazio" + "\t" + //número de estrelas do aplicativo
    values.developer + "\t" + //número de estrelas do aplicativo
    values.contentRating + "\t" + //número de estrelas do aplicativo
    "\n");
  // }

    //Após todas as requisições encerrarem se escreve no excel
    //if (numeroDaRequisicao == palavraChave.length - 1)
        escritaEmArquivo("informacoesSelecionadas", conteudoArquivoExcel)

}



function apresentarErro() {
  console.log("A requisição não foi bem sucedida!")
}