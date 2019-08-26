_cliProgress = require('cli-progress');
BaseService = require('../Service/BaseService.js')

module.exports = class TaxaProgresso {

    constructor() {
        // create a new progress bar instance and use shades_classic theme
        this.bar1 = new _cliProgress.SingleBar({}, _cliProgress.Presets.shades_classic);
        this.chave = true;
        this.valorPercorrido = 0;
    }

    apresentarTaxa(valorTotal, incremento = 1) {
        if (this.chave == true) {
            //Start the progress bar with a total value of 200 and start value of 0
            this.bar1.start(valorTotal, 0);
            this.chave = false;
        }
        //Update the current value in your application..
        this.valorPercorrido = this.valorPercorrido + incremento
        this.bar1.update(this.valorPercorrido);

        if (valorTotal == this.valorPercorrido)
            // stop the progress bar
            this.bar1.stop();

    }
}

