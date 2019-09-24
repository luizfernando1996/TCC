var Sentiment = require('sentiment');
var sentiment = new Sentiment();
var map = {}

function dicionarioAvaliacaoComentAplicativos(bundleAplicativo, comentarioPositive) {

    //O dicionario de avaliação é da seguinte forma:
    //map['com.whatsapp'].comentariosPositivos = 0
    //map['com.whatsapp'].comentariosNegativos = 0

    //O dicionario não possui dados do aplicativo -- inicialização 
    if (map[bundleAplicativo] === undefined) {
        map[bundleAplicativo] = { comentariosPositivos: 0, comentariosNegativos: 0 }
    }
    //Incremento no numero de comentarios bons ou ruins
    if (comentarioPositive == false) {
        var comentNegativos = map[bundleAplicativo].comentariosNegativos+ 1
        map[bundleAplicativo].comentariosNegativos = comentNegativos;
    }
    else {
        var comentPositivos = map[bundleAplicativo].comentariosPositivos + 1
        map[bundleAplicativo].comentariosPositivos = comentPositivos;
    }

}
var ComentarioAnaliseRepository = require('../main/ComentarioAnaliseRepository.js')

var objDadosComentario = new ComentarioAnaliseRepository()

objDadosComentario.recuperaArquivosDiretorio().then(listaLida => {
    var array = listaLida
    array.forEach((element, indice) => {

        linha = element.split(';')

        //Bundle Id do aplicativo
        var bundleAplicativo = linha[0]
        //Texto do comentário do aplicativo
        var textoComentario = linha[1]

        var result = sentiment.analyze(textoComentario);
        //console.dir(result);
        var comentarioPositive = false;

        if (result.score > 0)
            comentarioPositive = true;

        dicionarioAvaliacaoComentAplicativos(bundleAplicativo, comentarioPositive)

        //escrever em um documento
        if (indice == array.length-1) {
            console.dir(map)
        }
    })
});