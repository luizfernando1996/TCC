module.exports = class Aplicativo {

    //Inicializa os atributos dos objetos  
    constructor(dadosAplicativo, palavraChave) {
        this.PalavraChave = palavraChave
        this.AplicativoId = dadosAplicativo.appId;
        this.Title = dadosAplicativo.title; //Nome do aplicativo
        this.Ratings = dadosAplicativo.ratings;//Numero de avaliações
        this.ScoreText = dadosAplicativo.scoreText; //Número de estrelas
        this.Installs = dadosAplicativo.installs;
        this.Size = dadosAplicativo.size; 
        this.AndroidVersionText = dadosAplicativo.androidVersionText;
    }

    //Retorna os atributos impressos para que sejam adicionados no excel
    imprimirAtributos() {
        var impressao =
            this.PalavraChave + "\t" +//categoria do dadosAplicativo
            this.AplicativoId + "\t" +//dadosAplicativo Id do dadosAplicativo
            this.Title + "\t" +//Nome do dadosAplicativo
            this.Ratings + "\t" +//numero de avaliações
            this.ScoreText + "\t" + //número de estrelas do dadosAplicativo
            this.Installs + "\t" + //número de instalações
            this.Size + "\t" + //tamanho do dadosAplicativo
            this.AndroidVersionText //versão do android exigida
           + "\n";
        return impressao;
    }
}