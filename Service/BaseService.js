module.exports = class BaseService {

    constructor() {
        this.gplay = require('../Bibliotecas/google-play-scraper-dev');
        this.modExcel = require('../Dados/BaseRepository.js');
    }
}