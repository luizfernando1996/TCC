BaseService = require('TCC/Service/BaseService.js');
PesquisaNegocio = require('TCC/Negocio/ListaAplicativosNegocio.js');
Aplicativo = require('TCC/ViewModel/Aplicativo.js');
BaseService = require('TCC/Service/BaseService.js');
AplicativoRepository = require('TCC/Dados/AplicativoRepository.js');

module.exports = class AplicativoService extends BaseService {

    constructor() {
        super();//Exigido em herança no Javascript
        this.AplicativoRepository = new AplicativoRepository();
    }

    pesquisarAplicativo(dtoLista) {
        dtoLista.obterArrayDeAplicativos().forEach(
            aplicativo => this.efetuarRequisicao(aplicativo, dtoLista));
    }

    efetuarRequisicao(aplicativo, dtoLista) {
        //Sincronismo
        this.sincronismo()

        //Efetua a pesquisa dos dados do aplicativo
        this.gplay.app({
            appId: aplicativo.appId
            //throttle:1
        }).then(objAplicativo => this.salvar(objAplicativo, dtoLista), console.log)
    }

    salvar(objAplicativo, dtoLista) {
        //cria um objeto do dominio  
        var app = new Aplicativo(objAplicativo, dtoLista.PalavraChaveAtual);

        var nomeArquivo = "Lista " + dtoLista.IndicePalavraChave + " de aplicativos";

        //Salva o objeto do dominio
        this.AplicativoRepository.salvar(app, nomeArquivo)
    }

    sincronismo() {
        //this.timer.start();
        //setTimeout(stopTimer, 10000);
    }

}
