class AnaliseSentimento {

    constructor() {
        this.Sentiment = require('../../../dependencias/node_modules/sentiment');
        this.ComentarioAnaliseRepository = require('../Repository/ComentarioAnaliseRepository.js')
        this.objDadosComentario = new this.ComentarioAnaliseRepository()

        this.sentiment = new this.Sentiment();
        this.map = new Map()

    }

    executarAnaliseSentimento() {

        var arrayArquivoLido = this.objDadosComentario.recuperaArquivosDiretorio().then(listaLida => {
            arrayArquivoLido = listaLida


            arrayArquivoLido.forEach((linhaArquivo, indice) => {

                var linha = linhaArquivo.split(';')

                //Bundle Id do aplicativo
                var bundleAplicativo = linha[0]
                //Texto do comentário do aplicativo
                var textoComentario = linha[1]

                //Analisa o comentario e identifica se o comentario é bom, ruim ou neutro
                var resultadoAvaliacao = this.avaliarComentario(textoComentario)

                //Altera o numero de comentario bons, ruins e neutros
                this.alterarQuantidadeDeVotos(bundleAplicativo, resultadoAvaliacao)
            })


            //Escreve o resultado do algoritmo
            this.escreverAnaliseDeSentimento()

        });
    }

    avaliarComentario(textoComentario) {
        var result = this.sentiment.analyze(textoComentario);
        var comentarioPositive = null;

        if (result.score > 0)
            comentarioPositive = true;
        else if (result.score < 0)
            comentarioPositive = false;

        return comentarioPositive

    }

    //Métodos de manipulação do map
    inicializarMap(bundleAplicativo) {
        //O dicionario não possui dados do aplicativo -- inicialização 
        if (this.map.get(bundleAplicativo) === undefined) {
            this.map.set(bundleAplicativo, { comentariosPositivos: 0, comentariosNegativos: 0, comentariosNeutros: 0, totalDeComentarios: 0 })
        }
    }
    alterarQuantidadeDeVotos(bundleAplicativo, comentarioPositive) {

        //Adiciona o aplicativo ao map
        this.inicializarMap(bundleAplicativo)

        //Incremento no numero de comentarios bons ou ruins
        if (comentarioPositive == false) {
            var comentNegativos = this.map.get(bundleAplicativo).comentariosNegativos + 1
            this.map.get(bundleAplicativo).comentariosNegativos = comentNegativos;
        }
        else if (comentarioPositive == true) {
            var comentPositivos = this.map.get(bundleAplicativo).comentariosPositivos + 1
            this.map.get(bundleAplicativo).comentariosPositivos = comentPositivos;
        }
        else {
            var comentNeutros = this.map.get(bundleAplicativo).comentariosNeutros + 1
            this.map.get(bundleAplicativo).comentariosNeutros = comentNeutros;
        }
        this.atualizaNumeroDeComentarios(bundleAplicativo)

    }
    atualizaNumeroDeComentarios(bundleAplicativo) {

        var comentPos = this.map.get(bundleAplicativo).comentariosPositivos
        var comentNeg = this.map.get(bundleAplicativo).comentariosNegativos
        var comentNeutros = this.map.get(bundleAplicativo).comentariosNeutros

        this.map.get(bundleAplicativo).totalDeComentarios = comentPos + comentNeg + comentNeutros
    }

    escreverAnaliseDeSentimento() {
        this.objDadosComentario.escreverResultadoExcel(this.map)
    }

}
module.exports = AnaliseSentimento;