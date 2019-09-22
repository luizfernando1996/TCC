//Start

var readline = require('readline');
var resp = "";

var leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var textoExibir = "\n----------------------------------------------------\nEfetuar coleta de comentários ou métricas?\nDigite 1 para métricas e 2 para comentários e 3 para criar arquivo Único\n"


//console.log(textoExibir)
//leitor.question(textoExibir, answer =>{
    var resp = 1
    //console.log("\nSua resposta '" + resp + "' foi grava com sucesso numa variável inútil");
    if (resp == 1) {
        ListaAplicativoService = require('TCC/Etapa 1 - Coleta dos dados de aplicativos/code/Service/ListaAplicativosService.js');
        var cat = new ListaAplicativoService();
        cat.pesquisarAplicativos();
    }
    else if (resp == 2) {
        ComentarioService = require('TCC/Etapa 1 - Coleta dos dados de aplicativos/code/Service/ComentarioService.js')
        var coment = ComentarioService()
    }
    else if(resp == 3){
        ScriptArquivoUnico = require('TCC/Etapa 1 - Coleta dos dados de aplicativos/code/Scripts/CriaArquivoUnico.js')
        var coment = ScriptArquivoUnico()
    }
    leitor.close();
//});

