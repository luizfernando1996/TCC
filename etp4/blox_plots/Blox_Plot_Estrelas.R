#Seta o diretório
setwd("C:\\Users\\Jonathan\\Desktop\\Sistemas de informação\\8°Periodo\\TCCII\\Código Coleta Node\\TCC\\etp4\\entrada")
getwd()

#Atrbui os dados do arquivo para um dataframe
df <-read.csv("arquivoComGrupos_replace.csv", sep=";", encoding = "UTF-8")
View(df)



library("sqldf")
g1 <- sqldf("select Numero_de_estrelas from df where grupos = 1")
g2 <- sqldf("select Numero_de_estrelas from df where grupos = 2")
g3 <- sqldf("select Numero_de_estrelas from df where grupos = 3")
g4 <- sqldf("select Numero_de_estrelas from df where grupos = 4")


estrelas <- sqldf("select Numero_de_estrelas from df")
grupos <- sqldf("select grupos from df")

grupos.cate <- rep(c("G1","G2","G3","G4"), each=1)


vetor_estrelas <- as.vector(estrelas[,1])

vetor_estrelas <- as.numeric(estrelas[,1])

vetor_grupos <- as.numeric(grupos[,1])

class(vetor_estrelas)

boxplot(vetor_estrelas~vetor_grupos)



