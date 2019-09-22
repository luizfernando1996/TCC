# Análise dos fatores e relações que levam um aplicativo de ensino de programação ao sucesso na Google Play Store!
Orientados: Jonathan Dias Rodrigues,  Luiz Fernando de Oliveira Macedo
Orientador: Lesandro Ponciano 

### Related projects

* [google-play-scraper](https://github.com/luizfernando1996/TCC/tree/master/bibliotecas/google-play-scraper): um scraper para o Google Play Store.
* [sentiment-develop]():Análise de sentimento baseada em AFINN para Node.js

## Sumário

  1. [Etapa 0 - Definição das ferramentas](#etapa-0---definição-das-tecnologias)
  1. [Etapa 1 - Coleta dos dados de aplicativos](#etapa-1---seleção-dos-aplicativos)
  1. [Etapa 2 - Definição e cálculo de sucesso a partir de atributos quantitativos dos aplicativos]()
  1. [Etapa 3 - Definição e cálculo de sucesso a partir de comentários dos aplicativos]()
  1. [Etapa 4 - Inter-relacionar as medidas de sucesso obtidas nas etapas II e III]()
  1. [Etapa 5 - Análise dos resultados]()
  1. [Etapa 6 -  Escrita do documento final]()

## Etapa 0 - Definição das tecnologias, bibliotecas utilizadas
 Ferramentas utilizadas para o projeto:

### IDEs escolhidas:   
  * Visual Studio Code:
  ```
  https://code.visualstudio.com/ - 
  ```  
  * R studio
  ```
  https://www.rstudio.com/
  ```
  
#### Atalhos
  - Shift+Alt+F ->Identação no visual code  
  - Ctrl+F12 ->Altera as referências como o nome da variavel  
  
  * Debugando visual studio code
  ```
  https://code.visualstudio.com/docs/editor/debugging
  ```
### Linguagem Escolhida
  * JavaScript interpretada pelo servidor - NodeJS  
  * R

### Bibliotecas Utilizadas  
  * Coleta de dados dos apps na google play store 
    ```
    https://github.com/facundoolano/google-play-scraper
    ```
  * Análise de sentimentos
    ```
    https://github.com/thisandagain/sentiment
    ```
### Repositório escolhido  
  * Github - Documentação
    ```
    https://git-scm.com/book/pt-br/v1/Primeiros-passos        
    ```
  * Repositório - Link
    ```
    https://github.com/luizfernando1996/TCC
    ```
### Ferramenta de geração de relatório  - Excel escolhida
  * File system do nodejs - Documentação  
    ``` 
    https://imasters.com.br/desenvolvimento/node-js-6-dicas-do-modulo-file-system
    ```
    ```
    https://stackoverflow.com/questions/17450412/how-to-create-an-excel-file-with-nodejs

    ```
## Etapa 1 - Etapa de Coleta dos dados de Aplicativos - Dados: Comments e Metrics 

#### Dependencias do código
  *CLI-Progress
  ```
  npm install colors
  https://www.npmjs.com/package/colors
  ```
  npm install string-width
  https://www.npmjs.com/package/string-width
  ```
  npm install -g yarn
  https://tableless.com.br/yarn-evolucao-do-npm/
  ```
  yarn add cli-progress
  npm install cli-progress --save
  https://npmjs.com/package/cli-progress

#### Ambiente pesquisa
Foram feitas consultas por meio das  palavras chaves:
```javascript
var palavraChave = [
    'programming',
    'programação',
    'learn programming',
    'ensino de programação',
    'learn code'
] 
```
e de cada uma dessas respostas foi selecionado 250 apps, restrição da ferramenta, totalizando 1250 apps.

#### Ambiente experimental
   - Entrada: Foi coletado informações de 50 aplicativos para cada palavra chave, ou seja, 
o algoritmo retornou 250 aplicativos para serem analisados.

   - Detalhes sobre o algoritmo (O que ele faz?):
     - Problemas observados:

   - Saída: Essa pequena amostra  gerada pelo algoritmo foi exporada para arquivos em excel 
para uma melhor análise. Isso porque uma análise mais refinada irá auxiliar no 
refinamento do algoritmo de seleção.

### Etapa 2 - Definição das informações de caracterização da interação de usuário com os aplicativos

#### Ambiente pesquisa

#### Ambiente experimental
   - Entrada: A partir da fonte de dados foram extraidos os bundle ids 
ou como a ferramenta informa os app ids para que se assim fosse coletada as informações necessárias:

   - Detalhes sobre o algoritmo (O que ele faz?):
     - Problemas observados:

   - Saída: Exportação no excel que apresenta cada Aplicativo com suas informações relevantes para esse estudo.

### Etapa 3 - Coleta de dados dos aplicativos selecionados

A etapa 2 durou 2 semanas.

### Etapa 4 - Algoritmos de Inteligência Artificial