class LeituraArquivoRepository {

    constructor() {

        this.readline = require('readline')
        this.fs = require('fs')

        this.caminho = ""

        const diretorioArquivoSaida = '../TCC/etp1/results/ArquivosColetados/ComentariosApps.txt'
    }
    setCaminho(caminhoFinal) {
        //this.caminho = "../TCC/etp4/entrada//ComentariosApps.txt"
        this.caminho = caminhoFinal
    }
    //Recupera todos os arquivos contidos em um diretório
    recuperaBundleArquivo(posicaoDoBundleId) {
        this.listaDeDados = new Map();
        return new Promise((resolve, reject) => {

            //Declara o readStream para o arquivo atual
            var readable = this.fs.createReadStream(this.caminho)

            var rl = this.readline.createInterface({
                input: readable,
                //output: process.stdout
            })

            //Evento de leitura de uma linha
            rl.on('line', (line) => {
                //Obtêm o titulo do app e seu comentario
                var linha = this.obterConteudoLinhaArquivoLido(line, posicaoDoBundleId)
                this.listaDeDados.set(linha, "existe")
            })

            //Acabou a leitura do arquivo
            rl.on('close', () => {
                //Retira o cabeçalho do arquivo lido
                this.listaDeDados.delete("bundle id")
                this.listaDeDados.delete("Bundle_Id")
                resolve(this.listaDeDados);
            })
        })
    }

    //Responsável por extrair apenas o bundle id dos arquivos por meio da posicao do bundle
    obterConteudoLinhaArquivoLido(line, posicaoDoBundleId) {
        var linha = line.split(';')

        //Bundle Id do aplicativo
        var bundleAplicativo = linha[posicaoDoBundleId]
        if (posicaoDoBundleId == 1)
            bundleAplicativo = bundleAplicativo.replace(/"/g, "")


        var linhaSerInserida = bundleAplicativo

        return linhaSerInserida
    }

    //Recupera todos os arquivos contidos em um diretório
    recuperaArquivo(posicaoDoBundleId) {
        this.arquivoLido = [];
        return new Promise((resolve, reject) => {

            //Declara o readStream para o arquivo atual
            var readable = this.fs.createReadStream(this.caminho)

            var rl = this.readline.createInterface({
                input: readable,
                //output: process.stdout
            })

            //Evento de leitura de uma linha
            rl.on('line', (line) => {
                //Obtêm o titulo do app e seu comentario
                this.arquivoLido.push(line)
            })

            //Acabou a leitura do arquivo
            rl.on('close', () => {
                //Retira o cabeçalho do arquivo lido
                resolve(this.arquivoLido);
            })
        })
    }
    
}

module.exports = LeituraArquivoRepository;