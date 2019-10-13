
#=========================Leitura e tratamento de dados=====================================
#Define as métricas que serão agrupadas
metricas <- c("Numero_de_avaliacoes","Numero_de_estrelas","Numero_de_instalacoes")

#DataFrame sem normalizacao
df = lerTXTeRotornaDataFrame()

#DataFrame a ser normalizado
dfNormal = lerTXTeRotornaDataFrame()


#Realiza a normalização das metricas a serem analisadas
for(m in metricas){

  dfNormal[m] = normaliza(m)
   
}

#==========================Geração do número ótimo de grupos=================================

#Posso fazer um modelo hierarquco ou utilizar o fviz que da o numero otimo de clusters
modeloHierarquico()

fviz_nbclust(dfNormal, kmeans, method="silhouette")

fviz_nbclust(dfNormal, kmeans, method="wss")

fviz_nbclust(dfNormal, kmeans, method="gap_stat")

#===============================Análise de clusters==========================================

df$grupos <- NULL
dados_kmeans <- kmeans(dfNormal, 4)

#Visualizar o gráfico 
fviz_cluster(dados_kmeans, data = dfNormal)

grupos <- dados_kmeans$cluster


df <- cbind(df, grupos)

dados_kmeans$centers

View(df)