BaseRepository = require('../Dados/BaseRepository.js');
ListaAplicativosNegocio = require('../Negocio/ListaAplicativosNegocio.js');


module.exports = class AplicativoRepository extends BaseRepository {

    constructor() {
        super();//Exigido em herança no Javascript
        this.BaseRepository = new BaseRepository();

        this.cabecalhoArquivoExcel =
            "Palavra Chave;" +  //"\t" -> divide em colunas
            "Bundle Id;" + 
            "Nome do aplicativo;" + 
            "Número de avaliações;" + 
            "Número de estrelas;" + 
            "Número de instalações;" + 
            "Tamanho do aplicativo;" + 
            "Versão do android exigida"
            + "\n";

        this.ListAplicatNegoc = new ListaAplicativosNegocio();
        this.conteudoArquivoDadosExcelListaApp = [];
     
    }

    salvar(map, nomeArquivo, numeroDeRequisicoes) {
        //Adiciona o cabeçalho no arquivo excel
        if (this.conteudoArquivoDadosExcelListaApp.length == 0)
            this.conteudoArquivoDadosExcelListaApp.push(this.cabecalhoArquivoExcel);
        map.forEach(element => {
            //São inseridos os valores dos atributos do aplicativo nas linhas do excel
            this.conteudoArquivoDadosExcelListaApp.push(element.imprimirAtributos())
        });

        //Após colher o numero máximo de aplicativos escreve um arquivo do excel
        if (numeroDeRequisicoes == this.ListAplicatNegoc.obterNumeroMaximoAplicativos())
            this.BaseRepository.salvar(nomeArquivo, this.conteudoArquivoDadosExcelListaApp)

        this.conteudoArquivoDadosExcelListaApp.length = 0;
    }
}