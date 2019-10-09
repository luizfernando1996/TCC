BaseService = require('../Service/BaseService.js');

module.exports = class App extends BaseService {

    obterNumeroEstrelas(bundleId) {
        return new Promise((resolve, reject) => {

            this.gplay.app({
                appId: bundleId,
                throttle: 1
            }).then(objAplicativo => {
                //console.dir(objAplicativo.scoreText)
                resolve(objAplicativo.scoreText);
            }, erro => {
                reject(erro);
            })
        })
    }


}

