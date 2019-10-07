ListaAplicativosNegocio = require('../Negocio/ListaAplicativosNegocio.js');


module.exports = class ListaDeAplicativosPalavraChave {

    constructor() {
        //Criação do map
        this.map = {};
        this.pqNego = new ListaAplicativosNegocio();

    }

    /**
     *@Entrada Aplicativo e Palavra Chave
     * @Processamento O aplicativo é inserido no mapa com a palavra chave definida
     * @Saída Um mapa com o aplicativo adicionado em uma de suas chaves
     */
    criarListaApp(app, palavraChave) {
        //Adiciona aplicativos a mesma palavra chave
        if (this.map[palavraChave] !== undefined)
            this.map[palavraChave].push(app)
        //Inicializa uma palavra chave com um aplicativo
        else
            this.map[palavraChave] = [app]
    }

    /**
     * @Saida Resultado true ou false se as listas com os aplicativos de cada palavra chave foram criadas
     */
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
}