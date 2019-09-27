function exec() {
    AnaliseSentimento = require('../Service/AnaliseSentimento.js');
    var obj = new AnaliseSentimento();
    obj.executarAnaliseSentimento();
}
//JavaScript exige que a declaração da função seja antes da execução
exec();
module.exports = exec;
