
#----------------------------------LEITURA E TRATAMENTO DO ARQUIVO DE MÉTRICAS-------------------

#Seta o diretório
setwd("C:\\Users\\Jonathan\\Desktop\\Sistemas de informação\\8°Periodo\\TCCII\\Analise de metricas")
getwd()

#Atrbui os dados do arquivo para um dataframe
df <-read.csv("metrics.txt", sep=";", encoding = "UTF-8")
View(df)

df[231,8] <- 4.4


df$Bundle_Id <-NULL
df$Palavra_Chave <-NULL
df$Nome_do_aplicativo <-NULL
df$X.U.FEFF.Palavra_Chave <- NULL
df$Palavra_Chave <- NULL

df$Numero_de_avaliacoes <- as.numeric(sub(",", ".", df$Numero_de_avaliacoes))
df$Numero_de_estrelas <- as.numeric(sub(",", ".", df$Numero_de_estrelas))
df$Numero_de_instalacoes <- as.numeric(sub(",", ".", df$Numero_de_instalacoes))
df$Numero_de_comentarios <- as.numeric(sub(",", ".", df$Numero_de_comentarios))
df$Tamanho.do.aplicativo <- as.numeric(sub(",", ".", df$Tamanho.do.aplicativo))
df$Versao_do_android_exigida <- as.numeric(sub(",", ".", df$Versao_do_android_exigida))
df$Avaliacoes_sem_comentario <- as.numeric(sub(",", ".", df$Avaliacoes_sem_comentario))


#---------------------------------Número de Instalações X Estrelas---------------------------------

cor.test(df$Numero_de_instalacoes,df$Numero_de_estrelas, method="pearson")
cor.test(df$Numero_de_instalacoes,df$Numero_de_estrelas, method="kendall")
cor.test(df$Numero_de_instalacoes,df$Numero_de_estrelas, method="spearman")

#Gráfico de regresão
z = plot(df$Numero_de_instalacoes,df$Numero_de_estrelas)
regressao = lm(df$Numero_de_estrelas~df$Numero_de_instalacoes)
abline(regressao)

#---------------------------------Número de avaliacoes X Estrelas---------------------------------

cor.test(df$ï..Numero_de_avaliacoes,df$Numero_de_estrelas, method="pearson")
cor.test(df$ï..Numero_de_avaliacoes,df$Numero_de_estrelas, method="kendall")
cor.test(df$ï..Numero_de_avaliacoes,df$Numero_de_estrelas, method="spearman")

vetor<- df$Numero_de_avaliacoes

#Gráfico de regresão
z = plot(df$Numero_de_avaliacoes,df$Numero_de_estrelas, xlim = c(0,2000, log="xy"))

#---------------------------------Tamanho do aplicativo X Estrelas---------------------------------

cor.test(df$Tamanho_do_aplicativo,df$Numero_de_estrelas, method="pearson")
cor.test(df$Tamanho_do_aplicativo,df$Numero_de_estrelas, method="kendall")
cor.test(df$Tamanho_do_aplicativo,df$Numero_de_estrelas, method="spearman")

#Gráfico de regresão
z = plot(df$Tamanho_do_aplicativo,df$Numero_de_estrelas)
regressao = lm(df$Numero_de_estrelas~df$Tamanho_do_aplicativo)
abline(regressao)

#---------------------------------Versão do android exigida X Estrelas---------------------------------

cor.test(df$Versao_do_android_exigida,df$Numero_de_estrelas, method="pearson")
cor.test(df$Versao_do_android_exigida,df$Numero_de_estrelas, method="kendall")
cor.test(df$Versao_do_android_exigida,df$Numero_de_estrelas, method="spearman")

#Gráfico de regresão
z = plot(df$Versao_do_android_exigida,df$Numero_de_estrelas)
regressao = lm(df$Numero_de_estrelas~df$Versao_do_android_exigida)
abline(regressao)

#---------------------------------Matriz de Correlação X Estrelas--------------------------------------

matriz_pearson <-cor(df, method="pearson")

matriz_spearman <-cor(df, method="spearman")

View(matriz_pearson)

View(matriz_spearman)

