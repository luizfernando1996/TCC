#Seta o diretório
setwd("C:\\Users\\Jonathan\\Desktop\\Sistemas de informação\\8°Periodo\\TCCII\\coleta_final")
getwd()

#Atrbui os dados do arquivo para um dataframe
df <-read.table("metrics_quantiReplace.txt", sep=";", head=T, stringsAsFactors = FALSE)
View(df)

#---------------------------------Número de Instalações---------------------------------

cor.test(df$Numero_de_instalacoes,df$Numero_de_estrelas, method="pearson")
cor.test(df$Numero_de_instalacoes,df$Numero_de_estrelas, method="kendall")
cor.test(df$Numero_de_instalacoes,df$Numero_de_estrelas, method="spearman")

#Gráfico de regresão
z = plot(df$Numero_de_instalacoes,df$Numero_de_estrelas)
regressao = lm(df$Numero_de_estrelas~df$Numero_de_instalacoes)
abline(regressao)

#---------------------------------Número de avaliacoes---------------------------------

cor.test(df$ï..Numero_de_avaliacoes,df$Numero_de_estrelas, method="pearson")
cor.test(df$ï..Numero_de_avaliacoes,df$Numero_de_estrelas, method="kendall")
cor.test(df$ï..Numero_de_avaliacoes,df$Numero_de_estrelas, method="spearman")

vetor<- df$Numero_de_avaliacoes

#Gráfico de regresão
z = plot(df$Numero_de_avaliacoes,df$Numero_de_estrelas, xlim = c(0,2000, log="xy"))

#---------------------------------Tamanho do aplicativo---------------------------------

cor.test(df$Tamanho_do_aplicativo,df$Numero_de_estrelas, method="pearson")
cor.test(df$Tamanho_do_aplicativo,df$Numero_de_estrelas, method="kendall")
cor.test(df$Tamanho_do_aplicativo,df$Numero_de_estrelas, method="spearman")

#Gráfico de regresão
z = plot(df$Tamanho_do_aplicativo,df$Numero_de_estrelas)
regressao = lm(df$Numero_de_estrelas~df$Tamanho_do_aplicativo)
abline(regressao)

#---------------------------------Versão do android exigida---------------------------------

cor.test(df$Versao_do_android_exigida,df$Numero_de_estrelas, method="pearson")
cor.test(df$Versao_do_android_exigida,df$Numero_de_estrelas, method="kendall")
cor.test(df$Versao_do_android_exigida,df$Numero_de_estrelas, method="spearman")

#Gráfico de regresão
z = plot(df$Versao_do_android_exigida,df$Numero_de_estrelas)
regressao = lm(df$Numero_de_estrelas~df$Versao_do_android_exigida)
abline(regressao)

a = aggregate(Versao_do_android_exigida ~ Numero_de_estrelas, df, length)


library(sqldf)

sqldf(' SELECT 
        
        sum () as conta
       FROM df 
       GROUP BY Versao_do_android_exigida, 
                Numero_de_estrelas')


matriz_sp <-cor(df, method="pearson")


View(matriz_sp)

