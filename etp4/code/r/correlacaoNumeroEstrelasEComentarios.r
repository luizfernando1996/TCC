
#----------------------------------LEITURA E TRATAMENTO DO ARQUIVO DE MÉTRICAS-------------------

#Seta o diretório
setwd("C:\\Users\\Jonathan\\Desktop\\Sistemas de informa��o\\8�Periodo\\TCCII\\C�digo Coleta Node\\TCC\\etp4\\entrada\\EtapaAnterior")
getwd()

#Atrbui os dados do arquivo para um dataframe
df <-read.csv("AnaliseSentimento.txt", sep=";", encoding = "UTF-8")
View(df)

#---------------------------------Número de Instalações X Estrelas---------------------------------

#O teste de correla��o demonstra um correla��o aproximada de 0,39
#O que demonstra correla��o fraca, dessa forma iremos gerar gr�ficos

cor.test(df$numero.de.estrelas.do.app,df$estatistica.do.aplicativo, method="pearson")
cor.test(df$numero.de.estrelas.do.app,df$estatistica.do.aplicativo, method="spearman")
cor.test(df$numero.de.estrelas.do.app,df$estatistica.do.aplicativo, method="kendall")

#Gráfico de regresão
# z = plot(df$numero.de.estrelas.do.app,df$estatistica.do.aplicativo)
# regressao = lm(df$numero.de.estrelas.do.app~df$estatistica.do.aplicativo)
# abline(regressao)



