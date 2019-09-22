//Cria o arquivo com o titulo e a extensão informada. A extensão xlsx não funciona, acredito
module.exports = class Excel {
    constructor() {
        this.fs = require('fs');
    }

    salvar(tituloDoArquivo, linhasArquivo, extensao = '.txt', chave = 0) {
        //Método que adiciona apenas linhas no arquivo e não colunas
        if(chave == 0){
            var writeStream = this.fs.createWriteStream('../TCC/Etapa 1 - Coleta dos dados de aplicativos/results/ArquivosGerados/categorias/'+tituloDoArquivo + extensao);
        }else{
            var writeStream = this.fs.createWriteStream('../TCC/Etapa 1 - Coleta dos dados de aplicativos/results/ArquivosGerados/aplicativos/'+tituloDoArquivo + extensao);
        }

        

        linhasArquivo.forEach(element => {
            //A primeira linha da variavel linhasArquivo é o cabeçalho do arquivo excel
            writeStream.write(element);
        });
        writeStream.close();
    }
}
//https://www.portal-gestao.com/artigos/7704-como-corrigir-caracteres-acentuados-estranhos-no-excel-com-uma-simples-macro.html