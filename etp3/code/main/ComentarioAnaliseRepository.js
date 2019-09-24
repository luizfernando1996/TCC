class ComentarioAnaliseRepository {

    constructor() {
        this.readline = require('readline')
        this.fs = require('fs')

        this.diretorioEntrada = '../TCC/etp3/entrada'
        const diretorioArquivoSaida = '../TCC/etp1/results/ArquivosColetados/ComentariosApps.txt'

        //--Declaração de variáveis---------
        this.files = this.fs.readdirSync(this.diretorioEntrada);
        this.rl;
        this.readable;
        this.listaDeDados = [];
        this.quantidadeLidos = 0;
        this.listaDeDadosFiltrados = [];
        this.file = "ComentariosApps.txt"
        //-----------------------------------
    }
    //Recupera todos os arquivos contidos em um diretório
    async recuperaArquivosDiretorio() {
        return new Promise((resolve, reject) => {
            var diretorioEntrada2 = this.diretorioEntrada;
            var fs = this.fs;
            var readline = this.readline;
            var listaDeDados = this.listaDeDados;
            this.files.forEach(function (file) {

                //console.log('arquivo: ', file)
                var caminho = diretorioEntrada2 + "//" + file
                if (caminho == "../TCC/etp3/entrada//ComentariosApps.txt") {
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
                        //Dividi a linha por bundle id/ numero de estrelas/comentario do aplicativo
                        linha = line.split(';')

                        //Bundle Id do aplicativo
                        var bundleAplicativo = linha[0]
                        //Texto do comentário do aplicativo
                        var textoComentario = linha[2]

                        var linhaSerInserida = bundleAplicativo + ";" + textoComentario
                        listaDeDados.push(linhaSerInserida)

                    })

                    rl.on('close', () => {
                        listaDeDados.splice(0, 1)//retira o cabeçalho do arquivo lido

                        resolve(listaDeDados);
                    })
                }
            })
        })
    }
}
module.exports = ComentarioAnaliseRepository;