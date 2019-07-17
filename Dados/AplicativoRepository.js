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
            
        this.conteudoArquivoDadosExcel = [];
        this.ListAplicatNegoc = new ListaAplicativosNegocio();
    }

    salvar(app, nomeArquivo) {
        //Adiciona o cabeçalho no arquivo excel
        if (this.conteudoArquivoDadosExcel.length == 0)
            this.conteudoArquivoDadosExcel.push(this.cabecalhoArquivoExcel);

        //São inseridos os valores dos atributos do aplicativo nas linhas do excel
        this.conteudoArquivoDadosExcel.push(app.imprimirAtributos())

        //Após colher o numero máximo de aplicativos escreve um arquivo do excel
        if (this.conteudoArquivoDadosExcel.length == this.ListAplicatNegoc.obterNumeroMaximoAplicativos()+1) {
            this.BaseRepository.salvar(nomeArquivo, this.conteudoArquivoDadosExcel)
            this.conteudoArquivoDadosExcel.length = 0;
        }
    }

}