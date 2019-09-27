BaseRepository = require('../Repository/BaseRepository.js');

class ComentarioAnaliseRepository extends BaseRepository {

    constructor() {
        super();//Exigido em herança no Javascript
        this.BaseRepository = new BaseRepository();

        this.readline = require('readline')
        this.fs = require('fs')

        this.caminho = "../TCC/etp3/entrada//ComentariosApps.txt"

        const diretorioArquivoSaida = '../TCC/etp1/results/ArquivosColetados/ComentariosApps.txt'
        this.listaDeDados = [];
    }

    //Recupera todos os arquivos contidos em um diretório
    recuperaArquivosDiretorio() {
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
                var linha = this.obterConteudoLinhaArquivoLido(line)
                this.listaDeDados.push(linha)
            })

            //Acabou a leitura do arquivo
            rl.on('close', () => {
                //Retira o cabeçalho do arquivo lido
                this.listaDeDados.splice(0, 1)
                resolve(this.listaDeDados);
            })
        })
    }

    //Responsável por extrair apenas o titulo do aplicativo e o texto do comentário do arquivo lido
    obterConteudoLinhaArquivoLido(line) {
        var linha = line.split(';')

        //Bundle Id do aplicativo
        var bundleAplicativo = linha[0]
        //Texto do comentário do aplicativo
        var textoComentario = linha[2]

        var linhaSerInserida = bundleAplicativo + ";" + textoComentario

        return linhaSerInserida
    }

    //Responsavel por formar o arquivo result
    escreverResultadoExcel(aplicativos) {

        var linhasArquivo = []

        var cabecalhoArquivo = "bundle id" + ";" +
            "comentarios positivos" + ";" +
            "comentarios negativos" + ";" +
            "comentarios neutros" + ";" +
            "comentarios totais" + "\n";

        linhasArquivo.push(cabecalhoArquivo)

        aplicativos.forEach((element, key) => {

            var linha = key + ";" +
                element.comentariosPositivos + ";" +
                element.comentariosNegativos + ";" +
                element.comentariosNeutros + ";" +
                element.totalDeComentarios + "\n";

            linhasArquivo.push(linha)
        });

        this.BaseRepository.salvar("AnaliseSentimento", linhasArquivo)
    }
}

module.exports = ComentarioAnaliseRepository;