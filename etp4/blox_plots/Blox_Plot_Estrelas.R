#Seta o diret�rio

#diretorioJonathan = "C:\\Users\\Jonathan\\Desktop\\Sistemas de informa��o\\8�Periodo\\TCCII\\C�digo Coleta Node\\TCC\\etp4\\entrada\\Processado"
diretorioLuiz = "C:\\Users\\Lenovo\\node_modules\\TCC\\etp4\\entrada\\Processado"
setwd(diretorioLuiz)
getwd()

#Atrbui os dados do arquivo para um dataframe
df <-read.csv("ResultadoTCC.txt", sep=";", encoding = "UTF-8")

#Cria vetores com as colunas do dataframe
vetor_grupos <- as.numeric(df[,2])
vetor_estrelas <- as.numeric(df[,3])
vetor_estatisticaComentarioAplicativo <- as.numeric(df[,4])


boxplot(vetor_estrelas~vetor_grupos)

boxplot(vetor_estatisticaComentarioAplicativo~vetor_grupos)


