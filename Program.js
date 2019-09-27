//Coleta de comentarios


var readline = require('readline');
var resp = "";

var leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var textoExibir = "\n---------------------------------Efetuar coleta?  - Digite 1. \n Efetuar Análise de comentários? - Digite 2. \n";


//console.log(textoExibir)
leitor.question(textoExibir, answer =>{
var resp = answer

//Modulo de coleta de comentários
if (resp == 1) {
    coletaProgram = require('./etp1/code/main/Program.js');
}
//Modulo de análise de comentários
else if (resp == 2) {
    AnaliseComentarioProgram = require('./etp3/code/main/Program.js')
}
else if (resp == 3)

    leitor.close();
});

