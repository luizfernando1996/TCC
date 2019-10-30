Repository = require('../js/Repository.js')
module.exports = class AnaliseArquivos {

    constructor() {

        this.repository = new Repository();


        this.mapaArquivoAnaliseSentimento = undefined;
        this.mapaArquivoComGrupos = undefined;


        this.mapaComBundlesIdIguais = new Map();
        this.mapaComBundlesDiferentes = new Map();
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

        await this.executarFiltragemDeBundles(caminhoArquivo1, caminhoArquivo2)

        posicaoBundleIdNoArquivo = 0
        var novoArquivoDeSentimento = await this.executarFiltragemArquivos(caminhoArquivo1, posicaoBundleIdNoArquivo, this.mapaComBundlesIdIguais)

        caminhoDeSaida = '../TCC/etp4/entrada/Processado/AnaliseSentimento.txt'
        this.escreverArquivos(novoArquivoDeSentimento, caminhoDeSaida)

        var posicaoBundleIdNoArquivo = 1
        var novoArquivoDeGrupos = await this.executarFiltragemArquivos(caminhoArquivo2, posicaoBundleIdNoArquivo, this.mapaComBundlesIdIguais)

        var caminhoDeSaida = '../TCC/etp4/entrada/Processado/novoArquivoDeGrupos.txt'
        this.escreverArquivos(novoArquivoDeGrupos, caminhoDeSaida)


    }

}

