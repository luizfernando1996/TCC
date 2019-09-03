//Start

var readline = require('readline');
var resp = "";

var leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var textoExibir = "\n----------------------------------------------------\nEfetuar coleta de comentários ou métricas?\nDigite 1 para métricas e 2 para comentários e 3 para criar arquivo Único\n"



leitor.question(textoExibir, function (answer) {
    var resp = answer;
    //console.log("\nSua resposta '" + resp + "' foi grava com sucesso numa variável inútil");
    if (resp == 1) {
        ListaAplicativoService = require('../Service/ListaAplicativosService.js');

        var cat = new ListaAplicativoService();
        cat.pesquisarAplicativos();
    }
    else if (resp == 2) {
        ComentarioService = require('../Service/ComentarioService.js')
        var coment = ComentarioService()
    }
    else if(resp == 3){
        ScriptArquivoUnico = require('../Scripts/CriaArquivoUnico.js')
        var coment = ScriptArquivoUnico()
    }
    leitor.close();
});

