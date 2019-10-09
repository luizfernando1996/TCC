//JavaScript exige que a função que será usada em uma função já tenha sido
//compilada antes da sua execução. Logo se houver uma função a que chama uma função b a função b deve estar
//declarada antes da função a para que seja compilada antes.  
function execut() {
    var ComentarioRepository = require('../Dados/ComentarioRepository.js')
    var objDadosComentario = new ComentarioRepository()
    BaseService = require('../Service/BaseService.js')
    var bs = new BaseService();
    var p1 = new Promise(function (resolve, reject) {
        var listBundes = objDadosComentario.recuperaArquivosDiretorio().then(listBundes => {
            resolve(listBundes);
        })
    })
    p1.then(array => {
        array.splice(0, 1)//retira o cabeçalho do arquivo lido
        //console.log(array)
        var cabecalhoArquivoExcel =
            "Bundle Id" + ";" +//"\t" -> divide em colunas
            "Número de estrelas do comentário" + ";" +
            "Texto do comentário" + ";" +
            "Id do comentário" + ";" +
            "Data do comentário" + ";" +
            "Numero de estrelas do aplicativo"
            + "\n";

        var conteudoArquivoExcel = []
        conteudoArquivoExcel.push(cabecalhoArquivoExcel);

        gplay = require('../../../dependencias/node_modules/google-play-scraper');
        modExcel = require('../Dados/BaseRepository.js');
        TaxaProgresso = require('../Service/TaxaProgresso.js')

        var bsServ = new BaseService();
        obterComentario()

        function obterComentario() {

            //Define a progressBar
            var tamanho = array.length * 5
            var a = new TaxaProgresso()
            a.apresentarTaxa(tamanho, 0)

            array.forEach((element, indice) => {
                bsServ.sleepVariado(element, indice)
                element = element.split(";")
                numeroEstrelasApp = element[1];
                element = element[0];
                for (let numeroPaginas = 0; numeroPaginas < 5; numeroPaginas++) {
                    gplay.reviews({
                        appId: element,
                        page: numeroPaginas,
                        throttle: 1
                    }).then(resposta_Comentarios => {
                        salvarComentarios(resposta_Comentarios, numeroPaginas, element, numeroEstrelasApp)

                        //Atualiza o valor da progressBar
                        a.apresentarTaxa(tamanho, 1)

                        //Debugger
                        //console.log("Aplicativo com bundle ", element, " de indice ", indice, " da página ", numeroPaginas, " coletado!")
                        //imprimirComentarioConsole(resposta_Comentarios, numeroPaginas, element)
                    }, (erro, element, numeroPaginas) => {
                        bsServ.sleep(180)
                        console.log()
                        console.log(erro)
                        console.log()
                        console.log(element, " ", numeroPaginas)
                        console.log()
                        a.apresentarTaxa(tamanho, 1)
                    })
                }
            })
        }
        function salvarComentarios(resposta_Comentarios, numeroPaginas, element, numeroEstrelasApp) {
            //listaComentariosPorApp.push(resposta_Comentarios);

            resposta_Comentarios.forEach(comentarioElemento => {

                var linhaExcel =
                    element + ";" +     //bundle id do aplicativo
                    comentarioElemento.score + ";" +     //numero de estrelas do comentário
                    retirarQuebraDeLinhaTexto(comentarioElemento.text) + ";" +     //texto do comentário
                    comentarioElemento.id + ";" +     //identificador do comentário
                    comentarioElemento.date + ";" +                //data do comentário
                    numeroEstrelasApp
                    + "\n";

                conteudoArquivoExcel.push(linhaExcel)
            });

            var objexcel = new modExcel()
            objexcel.salvar("ComentariosApps", conteudoArquivoExcel)

        }

        function retirarQuebraDeLinhaTexto(texto) {
            //var texto = "Its not even average. Just written text n nothing else.no coding space .no\ncompiling while learning. No interactive learning like solo learn or\nprogramming hub"

            texto = texto.replace(/\n/g, ' ')

            //console.log(retirarQuebraDeLinhaTexto(texto));

            return texto;
        }

        //Debugger
        function imprimirComentarioConsole(resposta_Comentarios, numeroPaginas, element) {
            gplay.app({ appId: element })
                .then(app => {

                    console.log("--------------------------------")

                    console.log(app.title)

                    //console.log(app.reviews)
                    //Esse número não informa o número de comentários real na loja do aplicativo na play store, acredito.
                    //Eu observei que essa ferramenta(google-play-scrapper)
                    //não coleta o mesmo número de comentários que é informado no atributo reviews (app.reviews).

                    console.log("Já foram coletados para esse app: " + resposta_Comentarios.length + " comentários")

                    console.dir(resposta_Comentarios)

                    console.log("Bundle id: " + element)

                    console.log("Página: " + numeroPaginas)

                    console.log("--------------------------------")

                }, console.log);
        }
    })
}
module.exports = execut
