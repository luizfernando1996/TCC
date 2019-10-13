class ComentarioRepository {

    constructor() {
        this.readline = require('readline')
        this.fs = require('fs')

        this.diretorioEntrada = '../TCC/etp1/results/ArquivosColetados'
        const diretorioArquivoSaida = '../TCC/etp1/results/ArquivosColetados/ComentariosApps.txt'

        this.BaseService = require('../Service/BaseService.js')
        //--Declaração de variáveis---------
        this.files = this.fs.readdirSync(this.diretorioEntrada);
        this.rl;
        this.readable;
        this.listaDeDados = [];
        this.quantidadeLidos = 0;
        this.listaDeDadosFiltrados = [];
        this.file = "metrics.txt"
        //-----------------------------------
    }
    //Recupera todos os arquivos contidos em um diretório
    async recuperaArquivosDiretorio() {
        return new Promise((resolve, reject) => {
            var diretorioEntrada = this.diretorioEntrada;
            var fs = this.fs;
            var readline = this.readline;
            var listaDeDados = this.listaDeDados;
            this.files.forEach(function (file) {

                //console.log('arquivo: ', file)
                var caminho = diretorioEntrada + "//" + file
                if (caminho == "../TCC/etp1/results/ArquivosColetados//metrics.txt") {
                    //Declara o readStream para o arquivo atual
                    var readable = fs.createReadStream(caminho)

                    //Declara a linha
                    var rl = readline.createInterface({
                        input: readable,
                        //output: process.stdout
                    })
                    var linha;
                    //Insere os dados dos arquivos na lista    
                    rl.on('line', (line) => {
                        linha = line.split(';')
                        var linhaLida = linha[1] + ";" + linha[4]
                        listaDeDados.push(linhaLida)

                    })

                    rl.on('close', () => {
                        resolve(listaDeDados);
                    })
                }
            })
        })
    }
}
module.exports = ComentarioRepository;