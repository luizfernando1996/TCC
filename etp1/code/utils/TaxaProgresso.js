_cliProgress = require('cli-progress');
BaseService = require('TCC/etp1/code/Service/BaseService')

module.exports = class TaxaProgresso {

    //Dependencias
    constructor() {
        // create a new progress bar instance and use shades_classic theme
        this.bar1 = new _cliProgress.SingleBar({}, _cliProgress.Presets.shades_classic);
        this.valorPercorrido = 0;
    }


    /**
     * @Entrada Valor total da barra e taxa de atualização da barra
     * @Processamento Atualização do percentual da barra
     * @Saída Barra atualizada
     */
    apresentarTaxa(valorTotal, incremento = 1, primeiraExecucao = false) {

        if (primeiraExecucao == true) {
            //Start the progress bar with a total value of 200 and start value of 0
            this.bar1.start(valorTotal, 0);
            primeiraExecucao = false;
        }
        //Update the current value in your application..
        this.valorPercorrido = this.valorPercorrido + incremento
        this.bar1.update(this.valorPercorrido);

        if (valorTotal == this.valorPercorrido)
            // stop the progress bar
            this.bar1.stop();

    }


}

