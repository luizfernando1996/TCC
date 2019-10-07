module.exports = class AplicativosArabes {

    constructor() {
        this.ListaDeAplicativosArabes = []

    }

    /**
     * @Entrada Recebe um texto
     * @Processamento Valida se o texto é arábe
     * @Saida O texto é arábe ou não
     */
    isArabic(text) {
        var pattern = /[\u0600-\u06FF\u0750-\u077F]/;
        var result = pattern.test(text);
        return result;
    }

    /**
     * @Entrada Recebe um aplicativo arabe
     * @Processamento Verifica se o aplicativo arabe já foi inserido na lista. Se não tiver sido inserido ele será.
     * @Saída Lista de aplicativos arábes sem repetição
     */
    adicionarAplicativosArabes(objAplicativo) {

        var sair = false
        var indice = 0;
        var encontrado = false

        //Lista vazia
        if (this.ListaDeAplicativosArabes.length == 0)
            this.ListaDeAplicativosArabes.push(objAplicativo.title)
        //Pesquisa na Lista o aplicativo
        else {
            while (sair == false && encontrado == false) {
                if (this.ListaDeAplicativosArabes[indice] == objAplicativo.title)
                    encontrado = true
                if (indice != this.ListaDeAplicativosArabes.length)
                    indice++;
                else {
                    sair = true
                }
            }

            //Adiciona o objeto na lista
            if (encontrado == false)
                this.ListaDeAplicativosArabes.push(objAplicativo.title)
        }
    }

    retornarListaAplicativosArabes() {
        return this.ListaDeAplicativosArabes
    }
}