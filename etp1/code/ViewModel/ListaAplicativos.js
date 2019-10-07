module.exports = class ListaAplicativos {

    constructor() {
        this.PalavraChaveAtual = null
        this.Linguagem = ""
        this.NumeroMaximoAplicativos = 0
        this.ArrayDeAplicativos = [];
        this.IndicePalavraChave = 0;
        this.price = "";
    }

    alterarPalavraChave(palavraChave) {
        this.PalavraChaveAtual = palavraChave
    }

    alterarNumeroMaximoAplicativos(numeroMax) {
        this.NumeroMaximoAplicativos = numeroMax
    }
    obterArrayDeAplicativos() {
        return this.ArrayDeAplicativos;
    }
    alterarArrayDeAplicativos(lista) {
        this.ArrayDeAplicativos = lista;
    }

    imprimirListaDeAplicativosExcel() {
        var impressao = []

        this.ArrayDeAplicativos.forEach(aplicativo => {
            impressao.push(
                this.PalavraChaveAtual + ";" +//categoria do aplicativo
                this.NumeroMaximoAplicativos + ";" +
                aplicativo.title
                + "\n");
        });
        return impressao;
    }
}