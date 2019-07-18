BaseRepository = require('TCC/Dados/BaseRepository.js');
ListaAplicativosNegocio = require('TCC/Negocio/ListaAplicativosNegocio.js');

module.exports = class AplicativoRepository extends BaseRepository {

    constructor() {
        super();//Exigido em herança no Javascript
        this.BaseRepository = new BaseRepository();

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

        this.ListAplicatNegoc = new ListaAplicativosNegocio();
        this.conteudoArquivoDadosExcelListaApp = [];

    }

    salvar(map, nomeArquivo) {
        //Adiciona o cabeçalho no arquivo excel
        if (this.conteudoArquivoDadosExcelListaApp.length == 0)
            this.conteudoArquivoDadosExcelListaApp.push(this.cabecalhoArquivoExcel);
        map.forEach(element => {
            //São inseridos os valores dos atributos do aplicativo nas linhas do excel
            this.conteudoArquivoDadosExcelListaApp.push(element.imprimirAtributos())
        });

        //Após colher o numero máximo de aplicativos escreve um arquivo do excel
        if (this.conteudoArquivoDadosExcelListaApp.length == this.ListAplicatNegoc.obterNumeroMaximoAplicativos() + 1)
            this.BaseRepository.salvar(nomeArquivo, this.conteudoArquivoDadosExcelListaApp)

        this.conteudoArquivoDadosExcelListaApp.length = 0;

    }

}