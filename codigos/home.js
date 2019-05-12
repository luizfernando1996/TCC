var gplay = require('google-play-scraper');

gplay.app({
    appId: 'br.com.eteg.escolaemmovimento.escolaEmMovimentoAgendaDigital',
    lang: "pt-br"
})
  .then(dadosApp,apresentarErro);

  function dadosApp(values){
    console.log("Mensagem apresentada com sucesso!")
    console.log("O titulo do aplicativo é: "+values.title)
    console.log(values.version)
  }
  function apresentarErro(){
      console.log("O appId foi informado incorretamente !")
  }