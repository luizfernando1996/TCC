var fs = require('fs');

//Cria o arquivo com o titulo e a extensão informada. A extensão xlsx não funciona, acredito
module.exports = function escritaEmArquivo(tituloDoArquivo, linhasArquivo, extensao = '.xls') {
    
    //Método que adiciona apenas linhas no arquivo e não colunas
    var writeStream = fs.createWriteStream(tituloDoArquivo + extensao);

    linhasArquivo.forEach(element => {
        //A primeira linha da variavel linhasArquivo é o cabeçalho do arquivo excel
        writeStream.write(element);
    });
    writeStream.close();
}