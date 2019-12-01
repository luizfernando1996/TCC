


#=========================Leitura e tratamento de dados=====================================
#Define as m√©tricas que ser√£o agrupadas
metricas <- c("Numero_de_instalacoes","Numero_de_comentarios","Avaliacoes_sem_comentario")

#DataFrame sem normalizacao
df=lerTXTeRotornaDataFrame()

#DataFrame a ser normalizado
dfNormal = lerTXTeRotornaDataFrame()


#Realiza a normaliza√ß√£o das metricas a serem analisadas
for(m in metricas){

  dfNormal[m] = normaliza(m)
   
}

dfNormal$X.U.FEFF.Palavra_Chave<-NULL
dfNormal$Nome_do_aplicativo<-NULL
dfNormal$Numero_de_estrelas<-NULL
dfNormal$Tamanho.do.aplicativo<-NULL
dfNormal$Numero_de_avaliacoes<-NULL
dfNormal$Bundle_Id<-NULL

#==============================BoxPlot das vari·veis normalizadas================================
vetor_grupos <- as.numeric(df[,4])
vetor_estrelas <- as.numeric(df[,3])
vetor_estatisticaComentarioAplicativo <- as.numeric(df[,2])

#Plota o boxplot com as variaveis

boxplot(dfNormal, names=c("N∫ de IntalaÁıes", "N∫ de Coment·rios", "N∫ AvaliaÁıes"), ylim = c(0, 0.01), ylab = "Valor Normalizado")



#==========================Gera√ß√£o do n√∫mero √≥timo de grupos=================================

#Posso fazer um modelo hierarquco ou utilizar o fviz que da o numero otimo de clusters
modeloHierarquico()

fviz_nbclust(dfNormal, kmeans, method="silhouette")

fviz_nbclust(dfNormal, kmeans, method="wss")

fviz_nbclust(dfNormal, kmeans, method="gap_stat")

#===============================An√°lise de clusters==========================================

df$grupos <- NULL
dados_kmeans <- kmeans(dfNormal, 4)

#Visualizar o gr√°fico 
fviz_cluster(dados_kmeans, data = dfNormal)

grupos <- dados_kmeans$cluster

df <- cbind(df, grupos)

#==============================Descoberta e inlus„o de perfis p/ centroides==================

df$Perfil[433] <- NA

centros <-incluiPerfilDosCentroides(dados_kmeans$centers)

df <- incluirPefisDoArquivoPricipal(centros, df)


#==============================Cria arquivo com a coluna de grupos===========================

write.table(df, file='C:\\Users\\Jonathan\\Desktop\\CorreÁ„o do TCCII\\arquivoComGrupos.csv', sep=';', dec=',', row.names=FALSE)

write.table(df, file='C:\\Users\\Jonathan\\Desktop\\CorreÁ„o do TCCII\\arquivoComGrupos.txt', sep=';', dec=',', row.names=FALSE)

write.table(centros,'C:\\Users\\Jonathan\\Desktop\\CorreÁ„o do TCCII\\centroides.csv', sep=';', dec=',', row.names=FALSE)

# write.table(df, file='arquivoComGrupos.txt', sep=';', dec=',', row.names=FALSE)


