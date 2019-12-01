library(sqldf)
library(FactoMineR)
library(factoextra)
library(cluster)
library(MakefileR)
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
  setwd("C:\\Users\\Jonathan\\Desktop\\Sistemas de informa��o\\8�Periodo\\TCCII\\C�digo Coleta Node\\TCC\\etp1\\results\\ArquivosColetados")
  getwd()
  
  #Atrbui os dados do arquivo para um dataframe
  df <-read.csv("metrics.txt", sep=";", encoding = "UTF-8")
  
  dfResult <- df
  
  #Coloca o bundle ID como o rótulo da coluna
  row.names(dfResult) <- dfResult$Bundle_Id
 
  
  #Parece que precisa de remover as colunas que não vão ser analisadas
  dfResult$Tamanho_do_aplicativo <- NULL
  dfResult$Versao_do_android_exigida <- NULL
  dfResult$Versao_do_android_exigida <- NULL
  
  return(dfResult)
  
  
}


incluiPerfilDosCentroides = function(pcentros){
  
  centros = as.data.frame(pcentros)
  
  instalacoesOrdedando = sqldf('select Numero_de_instalacoes
                               from centros 
                                order by Numero_de_instalacoes')
  
  
  perfis <- character(0)
  
  i <<- 1
  
  while(i <= 4) {
    
    valorLinha <- centros[i,1]
    print(valorLinha) 
    
    if (valorLinha == instalacoesOrdedando[1,]){
      
    
      perfis[i] <- "Impopular"
    }
    
    if (valorLinha == instalacoesOrdedando[2,]){
      
     
      perfis[i] <- "Popularidade Baixa"
    }
    
    if (valorLinha == instalacoesOrdedando[3,]){
      
     
      perfis[i] <- "Popularidade M�dia"
    }
    
    if (valorLinha == instalacoesOrdedando[4,]){
      
      perfis[i] <- "Popular"
      
    }
    
    
    i = i + 1
  }
  
  
  centros <- cbind(centros, perfis)
  
  return(centros) 
}



incluirPefisDoArquivoPricipal = function(centros, df){
  
  perfil_1 <-centros$perfis[1]
  
  perfil_2 <-centros$perfis[2]
  
  perfil_3 <-centros$perfis[3]
  
  perfil_4 <-centros$perfis[4]
  
  
  for(i in 1:nrow(df)) 
  {
    if (df[i,10] == "1") {
      df[i,11] = as.character(perfil_1)
    }
    
    else if (df[i,10] == "2") {
      df[i,11] = as.character(perfil_2)
    }
    
    else if (df[i,10] == "3") {
      df[i,11] = as.character(perfil_3)
    }
    
    else if (df[i,10] == "4") {
      df[i,11] = as.character(perfil_4)
    }
    
    
  }
  
  return(df)
  
}






