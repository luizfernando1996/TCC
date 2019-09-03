BaseService = require('../Service/BaseService.js');
ListaAplicativosNegocio = require('../Negocio/ListaAplicativosNegocio.js');
Aplicativo = require('../ViewModel/Aplicativo.js');
BaseService = require('../Service/BaseService.js');
AplicativoRepository = require('../Dados/AplicativoRepository.js');
TaxaProgresso = require('../Service/TaxaProgresso.js');

module.exports = class AplicativoService extends BaseService {

    constructor() {
        super();//Exigido em herança no Javascript
        this.AplicativoRepository = new AplicativoRepository();
        //Criação do map
        this.map = {};
        this.pqNego = new ListaAplicativosNegocio();
        this.numeroDeRequisicoes = 0
        this.numeroListaAplicativos = 0;

        this.txProgresso = new TaxaProgresso()
        this.primeiraExecucao = true;
        this.tamanho = this.pqNego.obterNumeroMaximoAplicativos() * this.pqNego.obterPalavraChavesPermitidas().length

        this.AplicativosArabes = []
    }

    async pesquisarAplicativo(dtoLista) {
        this.numeroListaAplicativos++;
        dtoLista.obterArrayDeAplicativos().forEach(

            (aplicativo, indice) => {
                if (this.primeiraExecucao == true) {
                    this.txProgresso.apresentarTaxa(this.tamanho, 0)
                    this.primeiraExecucao = false;
                }
                //A cada 2 listas de aplicativos o delay é de 5 minutos
                if (this.numeroListaAplicativos != 0 && this.numeroListaAplicativos % 2 == 0 && indice == 0)
                    super.sleep(600)


                //O delay entre as requisições para obter os dados dos aplicativos é variada
                super.sleepVariado(indice)
                //console.log(new Date())

                this.efetuarRequisicao(aplicativo, dtoLista)
            });
    }

    async efetuarRequisicao(aplicativo, dtoLista) {

        //Efetua a pesquisa dos dados do aplicativo
        this.gplay.app({
            appId: aplicativo.appId,
            throttle: 1
        }).then(objAplicativo => {
            this.txProgresso.apresentarTaxa(this.tamanho, 1)
            //em caso de sucesso
            this.numeroDeRequisicoes += 1
            this.salvar(objAplicativo, dtoLista)

            //em caso de falha
        }, erro => {
            this.txProgresso.apresentarTaxa(this.tamanho, 1)
            this.numeroDeRequisicoes += 1
        })
    }

    salvar(objAplicativo, dtoLista) {
        //cria um objeto dto  

        // console.log(this.numeroDeRequisicoes, "-", objAplicativo.appId, dtoLista.PalavraChaveAtual)

        if (objAplicativo.genre == "Education" || objAplicativo.genre == "Books & Reference") {
            if (this.isArabic(objAplicativo.title) == false) {
                // console.log(objAplicativo.priceText)
                var app = new Aplicativo(objAplicativo, dtoLista.PalavraChaveAtual);

                //Cria o map com cada chave tendo um array de aplicativos
                this.criarListaApp(app, dtoLista.PalavraChaveAtual)



                //Pode escrever no arquivo apenas se já possuir as listas criadas
                if (this.listasCriadas()) {
                    var arrayPalavrasChaves = this.pqNego.obterPalavraChavesPermitidas();

                    for (let index = 0; index < arrayPalavrasChaves.length; index++) {
                        const element = this.pqNego.obterPalavraChavesPermitidas()[index];

                        var nomeArquivo = element;

                        //Salva o objeto

                        this.AplicativoRepository.salvar(this.map[element], nomeArquivo, this.numeroDeRequisicoes)
                    }

                }

            }
            else {
                this.adicionarAplicativosArabes(objAplicativo)
            }
        }

    }

    criarListaApp(app, palavraChave) {
        if (this.map[palavraChave] !== undefined)
            this.map[palavraChave].push(app)
        else
            this.map[palavraChave] = [app]
    }
    listasCriadas() {
        var arrayPalavrasChaves = this.pqNego.obterPalavraChavesPermitidas();
        for (let index = 0; index < arrayPalavrasChaves.length; index++) {
            const element = arrayPalavrasChaves[index];

            //Valida se já existe 4 arrays no map
            if (this.map[element] === undefined)
                return false;
            //Valida se os 4 arrays possuem todos os aplicativos
            else if (this.numeroDeRequisicoes != arrayPalavrasChaves.length * this.pqNego.obterNumeroMaximoAplicativos())
                return false;
        }
        //Map completo    
        return true;
    }

    //A fazer
    delay() {
        //this.timer.start();
        //setTimeout(stopTimer, 10000);
    }

    obterNumeroDeRequisicoes() {
        return this.numeroDeRequisicoes;
    }
    isArabic(text) {
        var pattern = /[\u0600-\u06FF\u0750-\u077F]/;
        var result = pattern.test(text);
        return result;
    }
    adicionarAplicativosArabes(objAplicativo) {
        //Lista vazia pode se adicionar qualquer aplicativo arabe
        if (this.AplicativosArabes.length == 0)
            this.AplicativosArabes.push(objAplicativo.title)
        //Adiciona apenas se o aplicativo já não tiver sido adicionado
        else {
            var sair = false
            var indice = 0;
            var encontrado = false
            while (sair == false && encontrado == false) {
                if (this.AplicativosArabes[indice] == objAplicativo.title)
                    encontrado = true
                if (indice != this.AplicativosArabes.length)
                    indice++;
                else {
                    sair = true
                }
            }
            if (encontrado == false)
                this.AplicativosArabes.push(objAplicativo.title)
        }
    }
    retornarListaAplicativosArabes() {
        return this.AplicativosArabes;
    }
}
