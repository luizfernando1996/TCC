var gplay = require('google-play-scraper');

//A etapa 2 necessita de um conjunto de bundle Ids dos aplicativos selecionados
//bundleIdsAplicativos = resultadoEtapa1()

gplay.app({
    appId: 'br.com.eteg.escolaemmovimento.escolaEmMovimentoAgendaDigital',//bundleIdsAplicativos[x] 
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