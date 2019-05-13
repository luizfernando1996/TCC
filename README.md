# TCC
Análise dos fatores que fazem um aplicativo da google play store ter sucesso 

## Sumário

  1. [Etapa 0 - Definição das tecnologias](#etapa-0---definição-das-tecnologias)
  1. [Etapa 1 - Seleção dos aplicativos](#etapa-1---seleção-dos-aplicativos)
  1. [Etapa 2 - ]()
  1. [Etapa 3 - ]()
  1. [Etapa 4 - ]()
  1. [Etapa 5 - ]()

## Etapa 0 - Definição das tecnologias
 Ferramentas utilizadas para o projeto:

### IDE escolhida:   
  * Visual Studio Code:
  ```
  https://code.visualstudio.com/ - 
  ```  
  * Atalhos
  - Shift+Alt+F ->Identação no visual code  
  - Ctrl+F12 ->Altera as referências como o nome da variavel  
  
  * Debugando visual studio code
  ```
  https://code.visualstudio.com/docs/editor/debugging
  ```
### Linguagem Escolhida
  * JavaScript interpretada pelo servidor - NodeJS  
  
### Bibliotecas Utilizadas  
  * Coleta de dados dos apps na google play store 
    ```
    https://github.com/facundoolano/google-play-scraper
    ```
  * Processamento de linguagem natural  
    - opção escolhida 
    ```
    https://github.com/NaturalNode/natural
    ```
    - opção alternativa
    ```
    https://www.npmjs.com/package/node-nlp
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
### Ferramenta de geração de relatório escolhido  
  * File system do nodejs - Documentação  
    ``` 
    https://imasters.com.br/desenvolvimento/node-js-6-dicas-do-modulo-file-system
    ```
    ```
    https://stackoverflow.com/questions/17450412/how-to-create-an-excel-file-with-nodejs

    ```
### Etapa 1 - Seleção dos Aplicativos
Foram feitas consultas por meio das  
palavras chaves: 'programming', 'programação', 'learn programming', 'ensino de programação',
'learn code' e de cada uma dessas respostas por determinada palavra foi selecionados 250 apps, restrição da ferramenta.

Ambiente experimental
Coletamos 50 aplicativos de cada uma das palavras chaves e analisamos 
cada resultado para melhorar  o algoritmo.

### Etapa 2 -

### Etapa 3 -

### Etapa 4 - Algoritmos de Inteligência Artificial

Foram coletados alguns comentários do aplicativo SoloLearn: Learn to Code for Free para treinar o algoritmo de Naive Bayes.
```
(http://minerandodados.com.br/index.php/2017/03/15/analise-de-sentimentos-twitter-como-fazer/)
```
A partir dos comentários se observou que um comentário pode se encaixar em uma ou mais categorias de comentários sendo elas:
Definimos como 3 o número máximo de categorias que um comentário pode se encaixar.
```javascript
categoriasComentarios = [
    'irrelevante', //O comentário possui 1 a 2 estrelas e foi categorizado como bom ou o comentário possui 4 a 5 estrelas e foi categorizado como ruim 
    'bom', //O comentário não apresenta a informação sobre qual requisito o software é bom
    'ruim', //O comentário não apresenta a informação sobre qual requisito o software é ruim
    'boa usabilidade',
    'má usabilidade',
    'inovador',
    'exige bastante permissoes',
]
```