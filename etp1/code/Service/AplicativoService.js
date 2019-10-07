//imports
BaseService = require('../Service/BaseService.js');
ListaAplicativosNegocio = require('../Negocio/ListaAplicativosNegocio.js');
Aplicativo = require('../ViewModel/Aplicativo.js');
BaseService = require('../Service/BaseService.js');
AplicativoRepository = require('../Dados/AplicativoRepository.js');
TaxaProgresso = require('../utils/TaxaProgresso.js');
AplicativosArabes = require('../Negocio/AplicativosArabes.js')
ListaDeAplicativosPalavraChave = require('../Negocio/ListaDeAplicativosPalavraChave.js')

module.exports = class AplicativoService extends BaseService {

    //Dependencias
    constructor() {
        super();//Exigido em herança no Javascript
        this.AplicativoRepository = new AplicativoRepository();
        this.ListaDeAplicativosPalavraChave = new ListaDeAplicativosPalavraChave();
        this.pqNego = new ListaAplicativosNegocio();
        this.numeroDeRequisicoes = 0
        this.numeroListaAplicativos = 0;
        this.txProgresso = new TaxaProgresso()
        this.primeiraExecucao = true;
        this.tamanho = this.pqNego.obterNumeroMaximoAplicativos() * this.pqNego.obterPalavraChavesPermitidas().length
        this.arabe = new AplicativosArabes();
    }

    /**
     * @Entrada dtoLista
     * @Processamento Incrementa a barra de status de progressão.
     * Efetua o delay entre as requisições por dados dos aplicativos
     * Efetua a requisição para coletar mais dados sobre os aplicativos 
     * @Saída  Todas as requisições dos aplicativos efetuadas
     */
    async pesquisarAplicativo(dtoLista) {
        this.numeroListaAplicativos++;

        this.txProgresso.apresentarTaxa(this.tamanho, 0, true)

        dtoLista.obterArrayDeAplicativos().forEach((aplicativo, indice) => {

            this.efetuarDelayRequisicao(this.numeroListaAplicativos, indice)

            this.efetuarRequisicao(aplicativo, dtoLista)
        });
    }

    /**
     *
     *
     * @Entrada Aplicativo e dtoLista
     * @Processamento Efetua a coleta de dados especificos de cada aplicativo 
     * e se a requisição for um sucesso executa as operacões efetuarOperacaoComum() e efetuarOperacaoDeSucesso(). 
     * Entretanto, se a requisição for um fracasso executa apenas a operação efetuarOperacaoComum()
     * @Saída Dados especificos do aplicativo em caso de sucesso e nada em caso de fracasso 
     */
    async efetuarRequisicao(aplicativo, dtoLista) {

        //Efetua a pesquisa dos dados do aplicativo
        this.gplay.app({
            appId: aplicativo.appId,
            throttle: 1
        }).then(aplicativoColetado => {
            this.efetuarOperacaoComum()
            this.efetuarOperacaoDeSucesso(aplicativoColetado, dtoLista);
        }, erro => {
            this.efetuarOperacaoComum()
        })

    }

    /**
     * @Entrada aplicativoColetado e dtoLista
     * @Processamento Passa o aplicativo coletado para ser inserido no map correto de acordo com a variavel erro que também
     * é gerada nesse método. A variavel erro informa qual o map correto, isto é, o map do tcc ou map dos aplicativos arabes
     * @Saída Inserção ou não do aplicativo em seu map correto e se todos os maps tiverem sido criados o salvamento dos maps em 
     * arquivos txt
     */
    efetuarOperacaoDeSucesso(aplicativoColetado, dtoLista) {
        let erro = this.validacao(aplicativoColetado)
        this.adicionarAplicativoNoMap(aplicativoColetado, dtoLista, erro)

        //-Todos os aplicativos foram coletados?
        if (this.ListaDeAplicativosPalavraChave.listasCriadas()) {
            this.salvar()
        }
    }

    /**
     * @Saída Atualiza a barra de status e o valor da requisição
     */
    efetuarOperacaoComum() {
        this.txProgresso.apresentarTaxa(this.tamanho, 1)
        this.numeroDeRequisicoes += 1
    }

    /**
     * @Entrada Aplicativo Coletado
     * @Processamento O aplicativo coletado é o desejado no TCC?
     * @Saída Se é um aplicativo desejado o retorno é 0, se é um aplicativo arabe o retorno é 1, outro caso o retorno é 2
     */
    validacao(objAplicativo) {
        if (objAplicativo.genre == "Education" || objAplicativo.genre == "Books & Reference")
            if (!this.arabe.isArabic(objAplicativo.title))
                return 0;
            else
                return 1;

        return 2;
    }

    /**
     * @Entrada numeroListaAplicativos e indice
     * @Processamento  A partir do valor de numeroListaAplicativos sempre que ele for par e maior do que 0 há um delay de 5 minutos
     * entre uma requisição e outra já que cada uma dessas duas requisições fazem parte de listas de aplicativos diferente.
     * A partir do valor indice se efetua um delay variado para a requisição
     * @Saida Delay executado
     */
    efetuarDelayRequisicao(numeroListaAplicativos, indice) {
        //Delay constante de 5minutos para cada 2 listas
        if (numeroListaAplicativos != 0 && numeroListaAplicativos % 2 == 0 && indice == 0)
            super.sleep(600)

        //Delay variado
        super.sleepVariado(indice)
    }

    /**
     * @Entrada objAplicativo, dtoLista, erro
     * @Processamento Efetua a inserção do aplicativo na lista correta (apps arabés ou apps desejados no TCC) de acordo 
     * com o parametro erro que informa a lista correta
     * @Saída Apps adicionados nas listas corretas
     */
    adicionarAplicativoNoMap(objAplicativo, dtoLista, erro) {

        //Não houve erro
        if (erro == 0) {
            var app = new Aplicativo(objAplicativo, dtoLista.PalavraChaveAtual);

            //Cria o map com cada chave tendo um array de aplicativos
            this.ListaDeAplicativosPalavraChave.criarListaApp(app, dtoLista.PalavraChaveAtual)
        }
        //Aplicativo é arabe
        if (erro == 1) {
            this.arabe.adicionarAplicativosArabes(objAplicativo)
        }
    }

    /** 
     * @Entrada Nula
     * @Processamento Obtem o nome do arquivo e a lista especifica da palavra chave 
     * @Saída Salva as n listas de acordo com o numero de listas por palavras chaves
     */
    salvar() {
        var arrayPalavrasChaves = this.pqNego.obterPalavraChavesPermitidas();

        for (let index = 0; index < arrayPalavrasChaves.length; index++) {
            const nomeArquivo = this.pqNego.obterPalavraChavesPermitidas()[index];

            //Salva todas as listas
            this.AplicativoRepository.salvar(this.map[nomeArquivo], nomeArquivo, this.numeroDeRequisicoes)
        }
    }
}