#Seta o diretório
setwd("C:\\Users\\Jonathan\\Desktop\\Sistemas de informação\\8°Periodo\\TCCII\\Código Coleta Node\\TCC\\etp4\\entrada\\Processado")
getwd()

#Atrbui os dados do arquivo para um dataframe
df <-read.csv("ResultadoTCC.txt", sep=";", encoding = "UTF-8")

#Cria vetores com as colunas do dataframe
vetor_grupos <- as.numeric(df[,2])
vetor_estrelas <- as.numeric(df[,3])
vetor_grupos <- as.numeric(df[,4])


boxplot(vetor_estrelas~vetor_grupos)



