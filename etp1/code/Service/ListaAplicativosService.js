//Imports
BaseService = require('../Service/BaseService.js');
ListaAplicativosNegocio = require('../Negocio/ListaAplicativosNegocio.js');
AplicativoService = require('../Service/AplicativoService.js');
ListaAplicativosRepository = require('../Dados/ListaAplicativosRepository.js');
ListaAplicativos = require('../ViewModel/ListaAplicativos.js')

class PesquisaService extends BaseService {

    //Dependencias
    constructor() {
        super();//Exigido em herança no Javascript
        this.objListaAplicativos = new ListaAplicativosNegocio();
        this.objAplicativo = new AplicativoService();
        this.Repository = new ListaAplicativosRepository();
    }

    /**
     * @Entrada Objeto com os parametros da requisição 
     * @Processamento Realização das requisições para os parametros definidos
     * @Saída Salvamento da lista de aplicativos retornados, pesquisa de cada aplicativo da lista
     */
    efetuarRequisicao(dtoLista) {

        this.gplay.search({
            term: dtoLista.PalavraChaveAtual,
            lang: dtoLista.Linguagem,
            num: dtoLista.NumeroMaximoAplicativos,
            price: dtoLista.price,
            throttle: 1
        }).then(listaAplicativos => {
            dtoLista.alterarArrayDeAplicativos(listaAplicativos);
            this.salvar(dtoLista);
            this.objAplicativo.pesquisarAplicativo(dtoLista);
        }, console.log)

    }


    /**
     * @Entrada Nenhum parametro
     * @Processamento Coleta da lista de aplicativos
     * @Saída Aplicativos coletados por palavra chave
     */
    pesquisarAplicativos() {
        var palavrasChavesPermitidas = this.objListaAplicativos.obterPalavraChavesPermitidas();
        palavrasChavesPermitidas.forEach(
            (palavraChave, indicePalavraChave) => {
                var dtoLista = this.definirParametrosDaRequisicao(palavraChave, indicePalavraChave)
                this.efetuarRequisicao(dtoLista)
            })
    }

    /**
     *@Entrada Palavra Chave e indice da palavra chave
     *@Processamento Atribuição das regras  definidas no TCC para efetuar as requisições
     *@Saída Objeto com os atributos setados de acordo com a métodologia do TCC
     */
    definirParametrosDaRequisicao(palavraChave, indicePalavraChave) {
        var dtoLista = new ListaAplicativos();

        var lingua = this.selecionarLingua(palavraChave)
        dtoLista.Linguagem = lingua;

        dtoLista.price = "free";

        dtoLista.NumeroMaximoAplicativos = this.objListaAplicativos.obterNumeroMaximoAplicativos();

        dtoLista.PalavraChaveAtual = palavraChave;

        dtoLista.IndicePalavraChave = indicePalavraChave;

        return dtoLista;
    }

    /**
    *@Entrada Palavra Chave
    *@Processamento Seleção da lingua correta para a palavra chave
    *@Saída A lingua correta para a palavra chave específica é retornada
    */
    selecionarLingua(palavraChave) {
        var lingua = 'pt-br';

        if (palavraChave == "programming" || palavraChave == "learn programming" || palavraChave == "learn code")
            lingua = "en"

        return lingua;
    }

    /**
     * @Entrada Lista de aplicativos obtida na requisição pelo método search
     * @Processamento Formação do nome do arquivo e das linhas do arquivo
     * @Saída Arquivo em txt salvo
     */
    salvar(dtoLista) {
        var nomeArquivo = dtoLista.PalavraChaveAtual + " categoria";
        this.Repository.salvar(dtoLista, nomeArquivo, 0);
    }


}
module.exports = PesquisaService;
