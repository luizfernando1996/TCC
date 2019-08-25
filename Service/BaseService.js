module.exports = class BaseService {

    constructor() {
        this.gplay = require('../TCC/Bibliotecas/google-play-scraper');
        this.modExcel = require('../TCC/Dados/BaseRepository.js');
        this.tempoTotal = 0
    }

    //Atrasa um tempo constante entre uma requisição e outra
    sleep(segundos = 60, minutos = 0, horas = 0) {

        var milisegundos = 1e3
        segundos = segundos * milisegundos
        minutos = minutos * 60 * milisegundos
        horas = horas * 3600 * milisegundos
        //tempo em inteiro
        var tempo = horas + minutos + segundos


        var start = new Date().getTime();

        var sair = false
        while (sair != true) {
            if ((new Date().getTime() - start) > tempo) {
                sair = true;
            }
        }
    }

    //Atrasa um tempo variado entre uma requisição e outra
    sleepVariado(indice) {
        var tempoDelay = 0
        if (indice != 0) {
            if (indice % 7 == 0 || indice % 17 == 0 || indice % 20 == 0 || indice % 25 == 0 ||
                indice % 47 == 0 || indice % 50 == 0 || indice % 75 == 0 || indice % 100 == 0
                || indice % 120 == 0 || indice % 150 == 0 || indice % 200 == 0)
                //console.log("Sleep variado - Aplicativo de bundle ", element, " com o indice ", indice)

            if (indice % 7 == 0)
                tempoDelay = tempoDelay + 1
            if (indice % 17 == 0)
                tempoDelay = tempoDelay + 2
            if (indice % 20 == 0)
                tempoDelay = tempoDelay + 3
            if (indice % 25 == 0)
                tempoDelay = tempoDelay + 4
            if (indice % 50 == 0)
                tempoDelay = tempoDelay + 5
            if (indice % 75 == 0)
                tempoDelay = tempoDelay + 6
            if (indice % 100 == 0)
                tempoDelay = tempoDelay + 7
            if (indice % 120 == 0)
                tempoDelay = tempoDelay + 8
            if (indice % 150 == 0)
                tempoDelay = tempoDelay + 9
            if (indice % 200 == 0)
                tempoDelay = tempoDelay + 10
            if (indice % 300 == 0)
                tempoDelay = tempoDelay + 11

            if (tempoDelay != 0) {
                console.log("Delay de ", tempoDelay, "s efetuado", new Date())
                this.sleep(tempoDelay)
                console.log("Delay de ", tempoDelay, "s terminado", new Date())
                console.log()
            }
        }

    }
}

