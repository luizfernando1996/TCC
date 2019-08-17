BaseService = require('../Service/BaseService.js');
ListaAplicativosNegocio = require('../Negocio/ListaAplicativosNegocio.js');
Aplicativo = require('../ViewModel/Aplicativo.js');
BaseService = require('../Service/BaseService.js');
AplicativoRepository = require('../Dados/AplicativoRepository.js');

module.exports = class AplicativoService extends BaseService {

    constructor() {
        super();//Exigido em herança no Javascript
        this.AplicativoRepository = new AplicativoRepository();
        //Criação do map
        this.map = {};
        this.pqNego = new ListaAplicativosNegocio();
        this.numeroDeRequisicoes = 0
    }

    async pesquisarAplicativo(dtoLista) {
        dtoLista.obterArrayDeAplicativos().forEach(
            aplicativo => this.efetuarRequisicao(aplicativo, dtoLista));
    }

    async efetuarRequisicao(aplicativo, dtoLista) {

       
        //Efetua a pesquisa dos dados do aplicativo
        var objAplicativo = await this.gplay.app({
            appId: aplicativo.appId,
            throttle: 1
        })
        var resultadoDoSalvar = await this.salvar(objAplicativo, dtoLista)

        //Pode implementar aqui
       

    }

    salvar(objAplicativo, dtoLista) {
        //cria um objeto dto  
        this.numeroDeRequisicoes += 1

        console.log(this.numeroDeRequisicoes, "-", objAplicativo.appId)

        if (objAplicativo.genre == "Education" || objAplicativo.genre == "Books & Reference") { 

            console.log(objAplicativo.priceText)
            var app = new Aplicativo(objAplicativo, dtoLista.PalavraChaveAtual);

            //Cria o map com cada chave tendo um array de aplicativos
            this.criarListaApp(app, dtoLista.PalavraChaveAtual)
    
    
    
            //Pode escrever no arquivo apenas se já possuir as listas criadas
            if (this.listasCriadas()) {
                var arrayPalavrasChaves = this.pqNego.obterPalavraChavesPermitidas();
    
                for (let index = 0; index < arrayPalavrasChaves.length; index++) {
                    const element = this.pqNego.obterPalavraChavesPermitidas()[index];
    
                    var nomeArquivo = "Lista " + index + " de aplicativos";
    
                    //Salva o objeto
    
                    this.AplicativoRepository.salvar(this.map[element], nomeArquivo, this.numeroDeRequisicoes)
    
    
    
                }
    
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
            else if (this.numeroDeRequisicoes != this.pqNego.obterNumeroMaximoAplicativos())
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

    obterNumeroDeRequisicoes(){
        return this.numeroDeRequisicoes;
    }

}
