# TCC
Análise dos fatores que fazem um aplicativo da google play store ter sucesso 

### Related projects

* [google-play-scraper](https://github.com/luizfernando1996/TCC/tree/master/bibliotecas/google-play-scraper): um scraper para o Google Play Store.
* [natural](https://github.com/luizfernando1996/TCC/tree/master/bibliotecas/natural): uma ferramenta para processamento de linguagem natural.

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
#### Atalhos
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
### Ferramenta de geração de relatório  - Excel escolhida
  * File system do nodejs - Documentação  
    ``` 
    https://imasters.com.br/desenvolvimento/node-js-6-dicas-do-modulo-file-system
    ```
    ```
    https://stackoverflow.com/questions/17450412/how-to-create-an-excel-file-with-nodejs

    ```
### Etapa 1 - Seleção dos Aplicativos

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

#### Ambiente pesquisa

#### Ambiente experimental

##### Fase 1 - Etapa de Treinamento do algoritmo 
   - Entrada: Comentários da metade dos aplicativos selecionados para treinar o 
  algoritmo de Naive Bayes, isto é, comentários de 125 aplicativos.
```
(http://minerandodados.com.br/index.php/2017/03/15/analise-de-sentimentos-twitter-como-fazer/)
```
    - Detalhes sobre o procedimento nessa etapa (O que foi feito?): Foi analisado manualmente os comentários e a partir deles 
   foram definidas categorias a qual o comentário melhor se encaixa.

    - Problemas observados: Se observou que um comentário pode se encaixar em uma ou mais categorias de comentários. Logo, 
    basicamente dividimos os comentários em 3 categorias - irrelevante, não apresenta nenhum critério (bom ou ruim), 
    apresenta algum critério - boa usabilidade, má usabilidade, inovador, exige bastante permissoes.
    - Foi definido que cada comentário poderia estar contido no máximo em 3 categorias. <-- Discutir com o Jonathan

    - [Hipotese de um problema futuro que teremos] Sempre que se encerrava a execução do código que treinava a máquina a reconhecer padrões 
    deveria novamente executar em outro momento esse mesmo código.. Uma dependencia é bastante gerada por isso etc.

    Saída: Um conjunto de categorias que o algoritmo deveria análisar para se saber a qual o comentário melhor se encaixa.

##### Fase 2 - Etapa de Análise de outros comentários 
       * Entrada: Comentários da metade do restante dos aplicativos selecionados para treinar o algoritmo de Naive Bayes, isto é, comentários dos outros 125 aplicativos.

      * Detalhes sobre o algoritmo (O que ele faz?): Ele analisa os comentários e a partir deles define a qual categoria o comentário melhor se encaixa, das categorias:
  
```javascript
    categoriasComentarios = [
        'irrelevante', //O comentário possui 1 a 2 estrelas e foi categorizado como bom ou
        // o comentário possui 4 a 5 estrelas e foi categorizado como ruim 
        'bom', //O comentário não apresenta a informação sobre qual requisito o software é bom
        'ruim', //O comentário não apresenta a informação sobre qual requisito o software é ruim
        'boa usabilidade',
        'má usabilidade',
        'inovador',
        'exige bastante permissoes',
    ]
```
    - Problemas observados:
      1 - Porque não se analisa também a quantidade de comentários irrelevantes 
      no grupo de aplicativos de sucesso e no grupo de aplicativos de fracasso? 
      Isto pode gerar algum valor.

    - Saída: A categorização dos comentários nos grupos definidos na subetapa1.
