//JavaScript exige que a função que será usada em uma função já tenha sido
//compilada antes da sua execução. Logo se houver uma função a que chama uma função b a função b deve estar
//declarada antes da função a para que seja compilada antes.  

ComentarioRepository = require('../Dados/ComentarioRepository.js')
BaseService = require('../Service/BaseService.js')
gplay = require('../../../dependencias/node_modules/google-play-scraper');
modExcel = require('../Dados/BaseRepository.js');
// TaxaProgresso = require('../Service/TaxaProgresso.js')

module.exports = class ComentarioService {

    constructor() {
        this.objDadosComentario = new ComentarioRepository()
        this.bs = new BaseService();
        this.array = [];
        this.conteudoArquivoExcel = [];
        this.cabecalhoArquivoExcel =
            "Bundle Id" + ";" +
            "Número de estrelas do comentário" + ";" +
            "Texto do comentário" + ";" +
            "Id do comentário" + ";" +
            "Data do comentário" + ";" +
            "Numero de estrelas do aplicativo"
            + "\n";
        this.bsServ = new BaseService();
        this.objexcel = new modExcel()
        // this.progressBar = new TaxaProgresso()
        this.contador = 0

    }


    execut() {
        this.objDadosComentario.recuperaArquivosDiretorio().then(listBundes => {
            this.array = listBundes;
            this.inicializarVariaveis()
            this.efetuarRequisicoes()
        })
    }

    inicializarVariaveis() {

        //Adiciona o cabeçalho no novo arquivo
        this.conteudoArquivoExcel.push(this.cabecalhoArquivoExcel);
        
        //Retira o cabeçalho do arquivo lido
        this.array.splice(0, 1)

        //Inicializa a progressBar
        // this.tamanhoProgressBar = this.array.length * 5
        //A linha abaixo foi construida devido um erro no cliprogress
        // this.tamanhoProgressBarFalso = this.tamanhoProgressBar * 2
        // this.progressBar.apresentarTaxa(this.tamanhoProgressBarFalso, 0, true, this.tamanhoProgressBar)

    }

    efetuarRequisicoes() {
        this.array.forEach((linhaArquivo, indice) => {

            //Delay
            this.bsServ.sleepVariado(indice);

            this.efetuarRequisicao(linhaArquivo);
        })
    }

    efetuarRequisicao(linhaArquivo) {

        var elementos = linhaArquivo.split(";")
        var numeroEstrelasApp = elementos[1];
        var bundleId = elementos[0];

        for (let numeroPaginas = 0; numeroPaginas < 4; numeroPaginas++) {

            gplay.reviews({
                appId: bundleId,
                page: numeroPaginas,
                throttle: 1
            }).then(resposta_Comentarios => {
                this.salvarComentarios(resposta_Comentarios, bundleId, numeroEstrelasApp)

                //Atualiza o valor da progressBar
                this.incrementarProgressBar()
                this.objexcel.salvarComent("ComentariosApps", this.conteudoArquivoExcel)
            }, erro => {
                //bsServ.sleep(180)
                this.incrementarProgressBar()
            })

        }
    }
    salvarComentarios(resposta_Comentarios, element, numeroEstrelasApp) {
        //listaComentariosPorApp.push(resposta_Comentarios);

        resposta_Comentarios.forEach(comentarioElemento => {

            var linhaExcel =
                element + ";" +     //bundle id do aplicativo
                comentarioElemento.score + ";" +     //numero de estrelas do comentário
                this.retirarQuebraDeLinhaTexto(comentarioElemento.text) + ";" +     //texto do comentário
                comentarioElemento.id + ";" +     //identificador do comentário
                comentarioElemento.date + ";" +   //data do comentário
                numeroEstrelasApp
                + "\n";

            this.conteudoArquivoExcel.push(linhaExcel);

        });

    }

    retirarQuebraDeLinhaTexto(texto) {
        //var texto = "Its not even average. Just written text n nothing else.no coding space .no\ncompiling while learning. No interactive learning like solo learn or\nprogramming hub"

        if(texto != null){
            texto = texto.replace(/\n/g, ' ')
        }
       

        //console.log(retirarQuebraDeLinhaTexto(texto));

        return texto;
    }
    incrementarProgressBar() {
        // this.progressBar.apresentarTaxa(this.tamanhoProgressBarFalso, 1, true, this.tamanhoProgressBar)
      
        console.log(this.contador++)//PALEATIVO
      
    }
}
