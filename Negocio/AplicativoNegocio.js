module.exports = class AplicativoNegocio {

    //Inicializa os atributos dos objetos  
    constructor(app, palavraChave) {
        this.PalavraChave = palavraChave
        this.AppId = app.appId; //App Id do aplicativo
        this.Title = app.title; //Nome do aplicativo
        this.Ratings = app.ratings;//numero de avaliações
        this.ScoreText = app.scoreText; //número de estrelas do aplicativo
        this.Installs = app.installs; //número de instalações
        this.Size = app.size; //tamanho do aplicativo
        this.AndroidVersionText = app.androidVersionText; //versão do android exigida
    }

    //Retorna os atributos impressos para que sejam adicionados no excel
    imprimirAtributos() {
        var impressao =
            this.PalavraChave + "\t" +//categoria do aplicativo
            this.AppId + "\t" +//App Id do aplicativo
            this.Title + "\t" +//Nome do aplicativo
            this.Ratings + "\t" +//numero de avaliações
            this.ScoreText + "\t" + //número de estrelas do aplicativo
            this.Installs + "\t" + //número de instalações
            this.Size + "\t" + //tamanho do aplicativo
            this.AndroidVersionText //versão do android exigida
            + "\n";
        return impressao;
    }
}
