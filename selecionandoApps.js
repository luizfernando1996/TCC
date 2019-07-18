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


