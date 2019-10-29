
#----------------------------------LEITURA E TRATAMENTO DO ARQUIVO DE COMENTARIOS-------------------

#Seta o diretorio

#caminhoJonathan <- "C:\\Users\\Jonathan\\Desktop\\Sistemas de informa��o\\8�Periodo\\TCCII\\C�digo Coleta Node\\TCC\\etp4\\entrada\\EtapaAnterior"
caminhoLuiz <- "C:\\Users\\Lenovo\\node_modules\\TCC\\etp4\\entrada\\Processado"

setwd(caminhoLuiz)
getwd()

#Atrbui os dados do arquivo para um dataframe
df <-read.csv("AnaliseSentimento.txt", sep=";", encoding = "UTF-8")
View(df)

#---------------------------------Número de Instalações X Estrelas---------------------------------

#O teste de correlacao demonstra um correlacao aproximada de 0,39
#O que demonstra correlacao fraca, dessa forma iremos gerar graficos.

cor.test(df$numero.de.estrelas.do.app,df$estatistica.do.aplicativo, method="pearson")
cor.test(df$numero.de.estrelas.do.app,df$estatistica.do.aplicativo, method="spearman")
cor.test(df$numero.de.estrelas.do.app,df$estatistica.do.aplicativo, method="kendall")

#Grafico de regressao
# z = plot(df$numero.de.estrelas.do.app,df$estatistica.do.aplicativo)
# regressao = lm(df$numero.de.estrelas.do.app~df$estatistica.do.aplicativo)
# abline(regressao)



