class ComentarioRepository {

    constructor() {
        this.readline = require('readline')
        this.fs = require('fs')
        this.diretorioEntrada = './/ArquivosColetados'
        const diretorioArquivoSaida = '../ArquivosColetados/metrics.txt'
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
                var caminho = diretorioEntrada + "/" + file

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
                    listaDeDados.push(linha[1])
                })

                rl.on('close', () => {
                    resolve(listaDeDados);
                })

            })
        })
    }
    //Gravar o arquivo txt sem os duplicados
    retirarRepetidos() {

        var encontrou;
        listaDeDadosFiltrados.push(listaDeDados[0])

        listaDeDados.forEach(function (linha) {

            encontrou = false

            for (i = 0; i < listaDeDadosFiltrados.length; i++) {

                //recupera o bundleid
                var a = linha.split(";")[1]
                var b = listaDeDadosFiltrados[i].split(";")[1]

                if (a == b) {
                    encontrou = true;
                    break;
                }
            }

            if (!encontrou) {
                listaDeDadosFiltrados.push(linha)
            }

            console.log(linha.split(";")[0])
        })

        // listaDeDadosFiltrados = [...new Set(listaDeDados)];
        // console.log(listaDeDadosFiltrados);

        gravarArquivoFiltrado();

    }


    gravarArquivoFiltrado() {

        const CreateFiles = fs.createWriteStream(diretorioArquivoSaida, {
            flags: 'a' //flags: 'a' preserva dados anteriores
        })

        listaDeDadosFiltrados.forEach(linha => {
            CreateFiles.write(linha + '\r\n')
        })
    }
}
module.exports = ComentarioRepository;