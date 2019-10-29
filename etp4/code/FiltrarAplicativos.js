LeituraArquivoRepository = require('../code/LeituraArquivoRepository.js')

module.exports = class FiltrarAplicativos {

    constructor() {
        this.leitura = new LeituraArquivoRepository();
        this.mapaArquivoAnaliseSentimento = undefined;
        this.mapaArquivoComGrupos = undefined;
        this.mapaComBundlesIdIguais = new Map();
        this.mapaComBundlesDiferentes = new Map();
    }

    async obterMapasDosArquivos() {

        this.leitura.setCaminho("../TCC/etp4/entrada//AnaliseSentimento.txt")

        //O bundle nesse arquivo se encontra na posição 0 no vetor
        this.mapaArquivoAnaliseSentimento = await this.leitura.recuperaBundleArquivo(0)

        this.leitura.setCaminho("../TCC/etp4/entrada//arquivoComGrupos.txt")

        //O bundle nesse arquivo se encontra na posição 1 no vetor
        this.mapaArquivoComGrupos = await this.leitura.recuperaBundleArquivo(1)

    }

    //A partir de dois mapas com bundles ids se analisa os bundles ids iguais nos dois mapas
    //e retorna apenas um mapa com os bundles ids iguais 
    async executarFiltragemDeBundles() {
        await this.obterMapasDosArquivos()
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

    //Não testei
    async executarFiltragemArquivos() {
        //Caminho do arquivo a ser lido
        this.leitura.setCaminho("../TCC/etp4/entrada//arquivoComGrupos.txt")

        //Arquivo lido
        var arquivoComGruposInicial = await this.leitura.recuperaArquivo()
        //Bundles ids do arquivo que devem permanecer
        var bundlesIds = this.mapaComBundlesIdIguais()

        //Arquivo filtrado Adição do cabeçalho do arquivo inicial nele
        var arquivoComGruposFinal = []
        arquivoComGruposFinal.push(arquivoComGruposInicial[0])

        //Remove o cabeçalho do arquivo inicial
        arquivoComGruposInicial[0] = undefined

        //Percorre o arquivo inicial e se os bundles coincidirem a variavel 
        //arquivoComGruposFinal é incrementada
        arquivoComGruposInicial.forEach(linha => {
            var bundleIdNoArquivo = linha.split(";")
            if (bundlesIds[bundleIdNoArquivo] === "existe")
                arquivoComGruposFinal.push(linha)
        })

        //Arquivo filtrado - pronto para ser escrito
        return arquivoComGruposFinal
    }

}

