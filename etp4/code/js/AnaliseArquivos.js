Repository = require('../js/Repository.js')
module.exports = class AnaliseArquivos {

    constructor() {

        this.repository = new Repository();


        this.mapaArquivoAnaliseSentimento = undefined;
        this.mapaArquivoComGrupos = undefined;


        this.mapaComBundlesIdIguais = new Map();
        this.mapaComBundlesDiferentes = new Map();

        this.mapaArquivoResultado = new Map()
    }

    async obterMapasDosArquivos(caminhoArquivo1, caminhoArquivo2) {
        //O bundle nesse arquivo se encontra na posição 0 no vetor
        this.mapaArquivoAnaliseSentimento = await this.repository.recuperaBundleArquivo(caminhoArquivo1, 0)

        //O bundle nesse arquivo se encontra na posição 1 no vetor
        this.mapaArquivoComGrupos = await this.repository.recuperaBundleArquivo(caminhoArquivo2, 1)
    }

    async executarFiltragemDeBundles(caminhoArquivo1, caminhoArquivo2) {

        await this.obterMapasDosArquivos(caminhoArquivo1, caminhoArquivo2)

        this.mapaArquivoComGrupos.forEach((Element, key) => {
            if (this.mapaArquivoAnaliseSentimento.get(key) !== undefined) {
                this.mapaComBundlesIdIguais.set(key, "filtrados")
            }
            else {
                this.mapaComBundlesDiferentes.set(key, "retirados")
            }
        });
        return this.mapaComBundlesIdIguais;
    }

    //A partir de um arquivo e do mapa de bundles ids iguais ele filtra as linhas do arquivo
    //de entrada e retorna apenas um arquivo com as linhas com os bundles ids iguais 
    //em ambos os arquivos AnaliseSentimento.txt e arquivoComGrupos.txt
    async executarFiltragemArquivos(caminho, posicaoBundleId, bundlesIds) {
        //Arquivo de entrada 
        var arquivoComGruposInicial = await this.repository.recuperaArquivo(caminho)


        //Arquivo de saída 
        var arquivoComGruposFinal = []
        //Adição do cabeçalho no arquivo de saída
        arquivoComGruposFinal.push(arquivoComGruposInicial[0])

        //Remove o cabeçalho do arquivo de entrada
        arquivoComGruposInicial.splice(0, 1)

        //Percorre o arquivo de entrada e se os bundles coincidirem 
        //o arquivo de saída é incrementado com uma linha
        arquivoComGruposInicial.forEach(linha => {

            var linhaLida = linha.split(";");
            var bundleIdNoArquivo = linha.split(";");

            //Obtem o bundle id no arquivo de analise sentimento
            if (posicaoBundleId == 0)
                bundleIdNoArquivo = bundleIdNoArquivo[posicaoBundleId]
            //Obtem o bundle id no arquivo de arquivo com grupos
            else if (posicaoBundleId == 1) {
                bundleIdNoArquivo = bundleIdNoArquivo[posicaoBundleId].replace(/"/g, "")

                //Tratamento para que o número de estrelas esteja com ponto ao invés de virgula
                linhaLida[4] = linhaLida[4].replace(',', '.')
                linha = linhaLida.join(';')
                linha = linha.replace(/"/g, "")
            }
            //Analisa se a linha lida possui um bundle id igual entre ambos os arquivos
            if (bundlesIds.get(bundleIdNoArquivo) === "filtrados")
                arquivoComGruposFinal.push(linha)
        })

        //Arquivo de saída do processo é retornado
        return arquivoComGruposFinal
    }
    escreverArquivos(arquivoParaGravar, caminhoDeSaida) {
        this.repository.gravarArquivoFiltrado(arquivoParaGravar, caminhoDeSaida)

    }
    async exec() {
        //Dependencias dos caminhos dos arquivos
        var caminhoArquivo1 = "../TCC/etp4/entrada/EtapaAnterior//AnaliseSentimento.txt"
        var caminhoArquivo2 = "../TCC/etp4/entrada/EtapaAnterior//arquivoComGrupos.txt"

        //Cria diversos maps de bundles..
        //map com bundles ids pertencentes aos dois arquivos
        //maps pertencentes a apenas um arquivo
        await this.executarFiltragemDeBundles(caminhoArquivo1, caminhoArquivo2)

        //Filtra o arquivo de analise de sentimento para que contenha apenas dados dos aplicativos
        //que possuem dados também no arquivo da etapa 2
        posicaoBundleIdNoArquivo = 0
        var novoArquivoDeSentimento = await this.executarFiltragemArquivos(caminhoArquivo1, posicaoBundleIdNoArquivo, this.mapaComBundlesIdIguais)

        //Filtra o arquivo de grupos para que contenha apenas dados dos aplicativos
        //que possuem dados também no arquivo da etapa 3
        var posicaoBundleIdNoArquivo = 1
        var novoArquivoDeGrupos = await this.executarFiltragemArquivos(caminhoArquivo2, posicaoBundleIdNoArquivo, this.mapaComBundlesIdIguais)

        var arquivoSaida = this.gerarArquivoResultado(novoArquivoDeSentimento, novoArquivoDeGrupos)

        var caminhoDeSaida = '../TCC/etp4/entrada/Processado/ResultadoTCC.txt'
        this.escreverArquivos(arquivoSaida, caminhoDeSaida)

    }
    gerarArquivoResultado(arquivo1, arquivo2, cabecalho) {

        this.criarMapParaAmbosArquivos(arquivo1, arquivo2)
        var arraySaidaArquivo = []
        arraySaidaArquivo.push("Bundle Id;PolaridadeAplicativo;numeroEstrelas;grupos")
        this.converterMapParaArray(arraySaidaArquivo)
        return arraySaidaArquivo
    }
    criarMapParaAmbosArquivos(arquivo1, arquivo2) {
        //Retira o cabecalho do arquivo
        arquivo1.splice(0, 1)

        arquivo1.forEach(linha => {
            var arrayLinha = linha.split(";")

            var bundleId = arrayLinha[0]
            var estatisticaComentarioAplicativo = arrayLinha[5]
            var numeroEstrelas = arrayLinha[6]

            this.mapaArquivoResultado.set(bundleId, {
                "estatisticaComentarioAplicativo": estatisticaComentarioAplicativo,
                "numeroEstrelas": numeroEstrelas,
                "grupos": 0
            })
        })

        //Retira o cabecalho do arquivo
        arquivo2.splice(0, 1)

        arquivo2.forEach(linha => {
            var arrayLinha = linha.split(";")

            var bundleId = arrayLinha[1]
            var grupos = arrayLinha[9]

            this.mapaArquivoResultado.get(bundleId).grupos = grupos
        })


    }
    converterMapParaArray(arraySaidaArquivo) {

        this.mapaArquivoResultado.forEach((element, key) => {
            var bundleId = key
            var estatisticaComentarioAplicativo = element.estatisticaComentarioAplicativo
            var numeroEstrelas = element.numeroEstrelas
            var grupos = element.grupos


            var linha = bundleId + ";" +
                estatisticaComentarioAplicativo + ";" +
                numeroEstrelas + ";" +
                grupos

            arraySaidaArquivo.push(linha)
        })
        return arraySaidaArquivo;
    }

}

