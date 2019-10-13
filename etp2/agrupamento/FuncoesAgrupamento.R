library(sqldf)
library(FactoMineR)
library(factoextra)
library(cluster)
options(scipen=999)

normaliza = function(metrica){
  
  x <- c()
  val = sqldf(paste("SELECT min(", metrica , ")as min, max(", metrica , ") as max  FROM dfNormal"))
 
  
  #Tenho que calcular o valor para cada uma das celulas 
  for(valor in dfNormal[[metrica]]){
    
    xi = ((valor - val$min)/(val$max - val$min))
    
    x <- append(x,xi)
    
    
  }

  
  return(x)
  
  
}

modeloHierarquico = function(){
  
  
 

  
  #Essa função calcula e retorna a matriz de distância calculada;
  distances <- dist(dfNormal, method = "euclidean")
  
  #Realiza a análise hierarquica.
  dendrogram <- hclust(distances)
  
  plot(dendrogram)
  
  
  
}


lerTXTeRotornaDataFrame = function(){
  
  #Seta o diretório
  setwd("C:\\Users\\Jonathan\\Desktop\\Sistemas de informação\\8°Periodo\\TCCII\\coleta_final")
  getwd()
  
  #Atrbui os dados do arquivo para um dataframe
  df <-read.table("metrics_agrup.csv", sep=";", head=T, stringsAsFactors = FALSE, fileEncoding="UTF-8-BOM")
  
  dfResult <- df
  
  #Coloca o bundle ID como o rótulo da coluna
  row.names(dfResult) <- dfResult$Bundle_Id
  dfResult$Bundle_Id <- NULL
  
  #Parece que precisa de remover as colunas que não vão ser analisadas
  dfResult$Tamanho_do_aplicativo <- NULL
  dfResult$Versao_do_android_exigida <- NULL
  
  return(dfResult)
  
  
}




