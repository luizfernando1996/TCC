App = require('../Service/App.js')
TaxaProgresso = require('../Service/TaxaProgresso.js')
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
                //Número de estrelas do app
                //--var numeroEstrelas = linha[x]
                //Texto do comentário do aplicativo
                var textoComentario = linha[1]

                //Analisa o comentario e identifica se o comentario é bom, ruim ou neutro
                var resultadoAvaliacao = this.avaliarComentario(textoComentario)

                //Altera o numero de comentario bons, ruins, neutros, totais e a estatistica
                this.alterarQuantidadeDeVotos(bundleAplicativo, resultadoAvaliacao, numeroEstrelas)
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

    inicializarMap(bundleAplicativo, _numeroEstrelas) {
        //O dicionario não possui dados do aplicativo -- inicialização 
        if (this.map.get(bundleAplicativo) === undefined) {
            this.map.set(bundleAplicativo,
                {
                    comentariosPositivos: 0,
                    comentariosNegativos: 0,
                    comentariosNeutros: 0,
                    totalDeComentarios: 0,
                    estatisticaAplicativo: 0,
                    numeroDeEstrelasApp: _numeroEstrelas
                })
        }
    }
    alterarQuantidadeDeVotos(bundleAplicativo, comentarioPositive, _numeroEstrelas) {

        //Adiciona o aplicativo ao map
        this.inicializarMap(bundleAplicativo, _numeroEstrelas)

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
        this.atualizaNumeroTotalDeComentarios(bundleAplicativo)
        this.atualizaValorEstatistica(bundleAplicativo)

    }
    atualizaNumeroTotalDeComentarios(bundleAplicativo) {

        var comentPos = this.map.get(bundleAplicativo).comentariosPositivos
        var comentNeg = this.map.get(bundleAplicativo).comentariosNegativos
        var comentNeutros = this.map.get(bundleAplicativo).comentariosNeutros

        this.map.get(bundleAplicativo).totalDeComentarios = comentPos + comentNeg + comentNeutros
    }
    atualizaValorEstatistica(bundleAplicativo) {
        var comentPos = this.map.get(bundleAplicativo).comentariosPositivos
        var comentNeg = this.map.get(bundleAplicativo).comentariosNegativos

        var estatistica = comentPos / (comentPos + comentNeg)
        estatistica = estatistica.toFixed(2)
        this.map.get(bundleAplicativo).estatisticaAplicativo = estatistica
    }
    escreverAnaliseDeSentimento() {
        this.objDadosComentario.escreverResultadoExcel(this.map)
    }

}
module.exports = AnaliseSentimento;