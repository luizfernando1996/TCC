
function func() {



    const readline = require('readline')
    const fs = require('fs')
    const diretório = "../TCC/etp1/results/ArquivosGerados/aplicativos"
    const diretorioArquivoSaida = '../TCC/etp1/results/ArquivosColetados/metrics.txt'

    //--Declaração de variáveis---------
    let files = fs.readdirSync(diretório);
    let rl;
    let readable;
    let listaDeDados = [];
    let caminho;
    let quantidadeLidos = 0;
    let listaDeDadosFiltrados = [];
    //-----------------------------------

    //Recupera todos os arquivos contidos em um diretório
    files.forEach(function (file) {

        console.log('arquivo: ', file)

        caminho = diretório + "//" + file

        //Declara o readStream para o arquivo atual
        readable = fs.createReadStream(caminho)

        //Declara a linha
        rl = readline.createInterface({
            input: readable,
            //output: process.stdout
        })

        //Insere os dados dos arquivos na lista    
        rl.on('line', (line) => {
            listaDeDados.push(line)
        })

        //Depois de terminar a leitura de todos os arquivos tira os repetidos da lista
        rl.on('close', () => {
            quantidadeLidos++

            if (quantidadeLidos == files.length) {
                retirarRepetidos()
            }

        })

    })


    //Gravar o arquivo txt sem os duplicados
    function retirarRepetidos() {

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
                if (linha.split(";")[3] == 'undefined' || linha.split(";")[4] == 'undefined' ||
                    linha.split(";")[5] == 'undefined' || linha.split(";")[6] == 'undefined' ||
                    linha.split(";")[7] == 'undefined') {

                    encontrou = true
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


    function gravarArquivoFiltrado() {

        const CreateFiles = fs.createWriteStream(diretorioArquivoSaida, {
            flags: 'a' //flags: 'a' preserva dados anteriores
        })

        listaDeDadosFiltrados.forEach(linha => {
            CreateFiles.write(linha + '\r\n')
        })
    }

}
module.exports = func