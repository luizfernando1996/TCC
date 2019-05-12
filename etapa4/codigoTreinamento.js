var natural = require('natural');
var classifier = new natural.BayesClassifier();

categoriasComentarios = [
    'irrelevante',
    'bom', //O comentário não apresenta a informação sobre qual requisito o software é bom
    'ruim', //O comentário não apresenta a informação sobre qual requisito o software é ruim
    'boa usabilidade',
    'má usabilidade',
    'inovador',
    'exige bastante permissoes',
]

classifier.addDocument('i am long qqqq', 'buy');
classifier.addDocument('buy the q\'s', 'buy');
classifier.addDocument('short gold', 'sell');
classifier.addDocument('sell gold', 'sell');

classifier.train();