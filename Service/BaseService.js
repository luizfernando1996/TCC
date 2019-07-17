module.exports = class BaseService {

    constructor() {
        this.gplay = require('TCC/Bibliotecas/google-play-scraper');
        this.modExcel = require('TCC/Dados/BaseRepository.js');
    }
}