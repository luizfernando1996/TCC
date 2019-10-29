
#----------------------------------LEITURA E TRATAMENTO DO ARQUIVO DE MÃ‰TRICAS-------------------

#Seta o diretÃ³rio
setwd("C:\\Users\\Jonathan\\Desktop\\Sistemas de informação\\8°Periodo\\TCCII\\Código Coleta Node\\TCC\\etp4\\entrada")
getwd()

#Atrbui os dados do arquivo para um dataframe
df <-read.csv("AnaliseSentimento.txt", sep=";", encoding = "UTF-8")
View(df)

#---------------------------------NÃºmero de InstalaÃ§Ãµes X Estrelas---------------------------------

#O teste de correlação demonstra um correlação aproximada de 0,39
#O que demonstra correlação fraca, dessa forma iremos gerar gráficos

cor.test(df$numero.de.estrelas.do.app,df$estatistica.do.aplicativo, method="pearson")
cor.test(df$numero.de.estrelas.do.app,df$estatistica.do.aplicativo, method="spearman")
cor.test(df$numero.de.estrelas.do.app,df$estatistica.do.aplicativo, method="kendall")

#GrÃ¡fico de regresÃ£o
# z = plot(df$numero.de.estrelas.do.app,df$estatistica.do.aplicativo)
# regressao = lm(df$numero.de.estrelas.do.app~df$estatistica.do.aplicativo)
# abline(regressao)



