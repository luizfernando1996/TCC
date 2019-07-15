module.exports = class PesquisaNegocio {

    //Inicializa 
    constructor(listaApps) {

        this.arrayDeAplicativos = listaApps
        //Um array que contêm todas as palavras chaves
        this.palavraChave = [
            'programming',
            'programação',
            'learn programming',
            'ensino de programação',
            'learn code'
        ]
        this.language = [
            "pt-br"
        ]
        this.numeroMaximoAplicativos = 50
    }
    //Não se pode declarar atributos aqui...observei na pratica...
    imprimirListaDeAplicativos(elementoPalavraChave) {
        var impressao = []
        this.arrayDeAplicativos.forEach(aplicativosSelecionadosNessaCategoria => {
            impressao.push(
                elementoPalavraChave + "\t" +//categoria do aplicativo
                this.numeroMaximoAplicativos + "\t" +
                aplicativosSelecionadosNessaCategoria.title
                + "\n");
        });
        return impressao;
    }

}