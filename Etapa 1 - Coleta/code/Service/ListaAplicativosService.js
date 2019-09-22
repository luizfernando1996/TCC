//Imports
BaseService = require('../Service/BaseService.js');
ListaAplicativosNegocio = require('../Negocio/ListaAplicativosNegocio.js');
AplicativoService = require('../Service/AplicativoService.js');
ListaAplicativosRepository = require('../Dados/ListaAplicativosRepository.js');
ListaAplicativos = require('../ViewModel/ListaAplicativos.js')

class PesquisaService extends BaseService {
    constructor() {
        super();//Exigido em herança no Javascript
        this.objListaAplicativos = new ListaAplicativosNegocio();
        this.objAplicativo = new AplicativoService();
        this.Repository = new ListaAplicativosRepository();
    }

    efetuarRequisicao(dtoLista) {

        this.gplay.search({//https://github.com/facundoolano/google-play-scraper#search
            term: dtoLista.PalavraChaveAtual,
            lang: dtoLista.Linguagem,
            num: dtoLista.NumeroMaximoAplicativos,
            price: "free",
            throttle: 1
        }).then(listaAplicativos => {
            dtoLista.alterarArrayDeAplicativos(listaAplicativos);
            this.salvar(dtoLista);
            this.objAplicativo.pesquisarAplicativo(dtoLista);
        }, console.log)

    }

    pesquisarAplicativos() {
        var palavrasChavesPermitidas = this.objListaAplicativos.obterPalavraChavesPermitidas();

        //Dependencias
        palavrasChavesPermitidas.forEach(
            (palavraChave, indicePalavraChave) => {
                var lingua;
                if (palavraChave == "programming" || palavraChave == "learn programming" || palavraChave == "learn code")
                    lingua = "en"
                else
                    lingua = 'pt-br'
                var dtoLista = new ListaAplicativos();
                dtoLista.Linguagem = lingua;
                dtoLista.NumeroMaximoAplicativos = this.objListaAplicativos.obterNumeroMaximoAplicativos();
                dtoLista.PalavraChaveAtual = palavraChave;
                dtoLista.IndicePalavraChave = indicePalavraChave;
                this.efetuarRequisicao(dtoLista)
            })
    }

    salvar(dtoLista) {

        var nomeArquivo = dtoLista.PalavraChaveAtual + " categoria";

        this.Repository.salvar(dtoLista, nomeArquivo, 0);
    }
}
//Uma das formas de exportar
module.exports = PesquisaService;
