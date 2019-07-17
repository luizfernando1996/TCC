BaseRepository = require('TCC/Dados/BaseRepository.js');

module.exports = class ListaAplicativosRepository extends BaseRepository {

    constructor() {
        super();//Exigido em herança no Javascript
        this.BaseRepository = new BaseRepository();

        this.cabecalhoArquivoExcel =

        this.conteudoArquivoDadosExcel = [];
    }

    salvar(dtoLista, nomeArquivo) {
        this.BaseRepository.salvar(nomeArquivo, dtoLista.imprimirListaDeAplicativosExcel())
    }
}