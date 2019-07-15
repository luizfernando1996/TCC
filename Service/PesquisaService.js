//Imports
BaseService = require('TCC/Service/BaseService.js');
PesquisaNegocio = require('TCC/Negocio/PesquisaNegocio.js');
AplicativoService = require('TCC/Service/AplicativoService.js');

module.exports = class PesquisaService extends BaseService{
    constructor() {
        super();//Exigido em herança no Javascript
        this.configParamPesquisa = new PesquisaNegocio();
        this.appService = new AplicativoService();
        this.cont = 0;
        this.objAplicativo = new AplicativoService();
    }

    //Pesquisa
    pesquisarAplicativos() {
        this.configParamPesquisa.palavraChave.forEach(elementoPalavraChave => {
            this.gplay.search({
                term: elementoPalavraChave,//palavra chave será o termo a ser pesquisado
                lang: this.configParamPesquisa.language[0],
                num: this.configParamPesquisa.numeroMaximoAplicativos //número máximo de aplicativos obtido pela ferramenta em cada pesquisa de aplicativos
            }).then(result => this.escreverLista(result, elementoPalavraChave), console.log)
        })
    }
    
    //Escreve
    escreverLista(listaAplicativos, elementoPalavraChave) {
        var objListaApps =  new PesquisaNegocio(listaAplicativos);
        var escreverExcel = new this.modExcel();
        var nomeArquivo = "Lista " + this.cont + " de categorias";

        objListaApps.palavraChave.forEach(function () {
            escreverExcel.escrever(nomeArquivo,
                objListaApps.imprimirListaDeAplicativos(elementoPalavraChave))
        })
        

        this.objAplicativo.pesquisarAplicativo(listaAplicativos,elementoPalavraChave,this.cont);
        this.cont++;
    }
}