#Caminho dos diretorios
diretorioJonathan = "C:\\Users\\Jonathan\\Desktop\\Sistemas de informação\\8°Periodo\\TCCII\\Código Coleta Node\\TCC\\etp4\\entrada\\Processado"
#diretorioLuiz = "C:\\Users\\Lenovo\\node_modules\\TCC\\etp4\\entrada\\Processado"

#Seta o diretorio
setwd(diretorioJonathan)
getwd()

#Atrbui os dados do arquivo para um dataframe
df <-read.csv("ResultadoTCC.txt", sep=";", encoding = "UTF-8")

#Cria vetores com as colunas do dataframe
vetor_grupos <- as.character(df[,5])
vetor_estrelas <- as.numeric(df[,3])
vetor_estatisticaComentarioAplicativo <- as.numeric(df[,2])

#Plota o boxplot com as variaveis
#boxplot(vetor_estrelas~vetor_grupos, ylab = "Número de estrelas", xlab="")
boxplot(vetor_estatisticaComentarioAplicativo~vetor_grupos, ylab = "Estatística de comentários", xlab="")


