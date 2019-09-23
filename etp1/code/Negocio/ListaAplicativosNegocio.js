module.exports = class PesquisaNegocio {

    //Inicializa 
    constructor() {

        this.arrayDeAplicativos = [];
        //Um array que contêm todas as palavras chaves
        this.palavrasChavesPermitidas = [
            'programming',
            'programação',
            'learn programming',
            'ensino de programação',
            'learn code'
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