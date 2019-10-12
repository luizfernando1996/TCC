BaseRepository = require('../Dados/BaseRepository.js');
ListaAplicativosNegocio = require('../Negocio/ListaAplicativosNegocio.js');


module.exports = class AplicativoRepository extends BaseRepository {

    constructor() {
        super();//Exigido em herança no Javascript
        this.BaseRepository = new BaseRepository();

        this.cabecalhoArquivoExcel =
            "Palavra_Chave;" +  //"\t" -> divide em colunas
            "Bundle_Id;" + 
            "Nome_do_aplicativo;" + 
            "Numero_de_avaliacoes;" + 
            "Numero_de_estrelas;" + 
            "Numero_de_instalacoes;" + 
            "Tamanho do aplicativo;" + 
            "Versao_do_android_exigida;" +
            "Numero_de_comentarios;" +
            "Avaliacoes_sem_comentario" 
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
        if (numeroDeRequisicoes == this.ListAplicatNegoc.obterPalavraChavesPermitidas().length * this.ListAplicatNegoc.obterNumeroMaximoAplicativos())
            this.BaseRepository.salvar(nomeArquivo, this.conteudoArquivoDadosExcelListaApp,".txt", 1)

        this.conteudoArquivoDadosExcelListaApp.length = 0;
    }
}