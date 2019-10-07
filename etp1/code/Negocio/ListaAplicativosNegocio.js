module.exports = class ListaAplicativosNegocio {

    //Inicializa 
    constructor() {

        this.arrayDeAplicativos = [];
        //Um array que contêm todas as palavras chaves
        this.palavrasChavesPermitidas = [
            'programming',
            'learn programming'
        ];
        this.language = [
            //"pt-br"
            "en"
        ];
        this.numeroMaximoAplicativos = 10;
    }

    //Get e set
    obterPalavraChavesPermitidas(){
        return this.palavrasChavesPermitidas;
    }
    obterLingua(){
        return this.language;
    }
    obterNumeroMaximoAplicativos(){
        return this.numeroMaximoAplicativos;
    }
}