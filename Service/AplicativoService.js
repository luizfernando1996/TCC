BaseService = require('TCC/Service/BaseService.js');

module.exports = class AplicativoService extends BaseService {

    constructor() {
        super();//Exigido em herança no Javascript
        this.PesquisaNegocio = require('TCC/Negocio/PesquisaNegocio.js');
        this.aplicativos = require('TCC/Negocio/AplicativoNegocio.js');
        this.cabecalhoArquivoExcel =
            "Palavra Chave" + "\t" + //"\t" -> divide em colunas
            "Bundle Id" + "\t" +
            "Nome do aplicativo" + "\t" +
            "Número de avaliações" + "\t" +
            "Número de estrelas" + "\t" +
            "Número de instalações" + "\t" +
            "Tamanho do aplicativo" + "\t" +
            "Versão do android exigida"
            + "\n";
        this.conteudoArquivoDadosExcel = [];
        this.chave = true
        this.contagemDeAplicativosEscritos=0
    }
    pesquisarAplicativo(listaAplicativosSelecionados,palavraChave,cont) {
        if (this.chave) {
            this.conteudoArquivoDadosExcel.push(this.cabecalhoArquivoExcel);
            this.chave = false
        }
        var objListaApps = new this.PesquisaNegocio(listaAplicativosSelecionados);
        objListaApps.arrayDeAplicativos.forEach(element => {
            //Efetua a pesquisa dos dados do aplicativo
            super.gplay.app({
                appId: element.appId
            }).then(result => this.escreverExcel(result, cont, palavraChave), console.log)
        });

    }
    escreverExcel(values, cont, palavraChave) {
        var app = new this.aplicativos(values, palavraChave);
        //São inseridos os valores dos atributos nas linhas do excel
        this.conteudoArquivoDadosExcel.push(
            app.imprimirAtributos()
        )
        this.contagemDeAplicativosEscritos++;
        var escritaEmArquivo = new this.modExcel();
        var nomeArquivo = "Lista " + cont + " de aplicativos";

        //Após todas as requisições encerrarem se escreve no excel
        if (this.contagemDeAplicativosEscritos == 50)
            escritaEmArquivo.escrever(nomeArquivo, this.conteudoArquivoDadosExcel)
    }

}
